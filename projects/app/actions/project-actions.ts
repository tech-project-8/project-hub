"use server"

import { z } from "zod"
import { prisma } from "@/lib/db"
import { getUserFromToken } from "@/lib/auth"
import { revalidatePath } from "next/cache"

// Schema for project creation
const createProjectSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().optional(),
  type: z.enum(["DYNAMIC", "STATIC"]),
})

// Schema for requirement creation
const createRequirementSchema = z.object({
  description: z.string().min(3, "Description must be at least 3 characters"),
  projectId: z.string().uuid("Invalid project ID"),
})

// Create project action
export async function createProject(formData: FormData) {
  const user = await getUserFromToken()

  if (!user) {
    return { error: "Authentication required" }
  }

  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const type = formData.get("type") as "DYNAMIC" | "STATIC"

  // Validate input
  const result = createProjectSchema.safeParse({ title, description, type })
  if (!result.success) {
    return { error: result.error.flatten().fieldErrors }
  }

  try {
    const project = await prisma.project.create({
      data: {
        title,
        description,
        type,
        status: "PENDING",
        clientId: user.id,
      },
    })

    revalidatePath("/dashboard")
    return { success: true, project }
  } catch (error) {
    console.error("Create project error:", error)
    return { error: "Failed to create project" }
  }
}

// Get projects action
export async function getProjects() {
  const user = await getUserFromToken()

  if (!user) {
    return { error: "Authentication required" }
  }

  try {
    const projects = await prisma.project.findMany({
      where: {
        clientId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return { success: true, projects }
  } catch (error) {
    console.error("Get projects error:", error)
    return { error: "Failed to fetch projects" }
  }
}

// Get project details action
export async function getProjectDetails(projectId: string) {
  const user = await getUserFromToken()

  if (!user) {
    return { error: "Authentication required" }
  }

  try {
    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
      include: {
        requirements: true,
        transactions: true,
        files: true,
      },
    })

    if (!project) {
      return { error: "Project not found" }
    }

    // Check if user is authorized to view this project
    if (project.clientId !== user.id && user.role !== "ADMIN") {
      return { error: "Not authorized to view this project" }
    }

    return { success: true, project }
  } catch (error) {
    console.error("Get project details error:", error)
    return { error: "Failed to fetch project details" }
  }
}

// Add requirement action
export async function addRequirement(formData: FormData) {
  const user = await getUserFromToken()

  if (!user) {
    return { error: "Authentication required" }
  }

  const description = formData.get("description") as string
  const projectId = formData.get("projectId") as string

  // Validate input
  const result = createRequirementSchema.safeParse({ description, projectId })
  if (!result.success) {
    return { error: result.error.flatten().fieldErrors }
  }

  try {
    // Check if project exists and user is authorized
    const project = await prisma.project.findUnique({
      where: { id: projectId },
    })

    if (!project) {
      return { error: "Project not found" }
    }

    if (project.clientId !== user.id && user.role !== "ADMIN") {
      return { error: "Not authorized to add requirements to this project" }
    }

    const requirement = await prisma.requirement.create({
      data: {
        description,
        status: "PENDING",
        projectId,
      },
    })

    revalidatePath(`/projects/${projectId}`)
    return { success: true, requirement }
  } catch (error) {
    console.error("Add requirement error:", error)
    return { error: "Failed to add requirement" }
  }
}

