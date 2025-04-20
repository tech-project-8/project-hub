"use server"

import { z } from "zod"
import { prisma } from "@/lib/db"
import { getUserFromToken } from "@/lib/auth"
import { revalidatePath } from "next/cache"

// Schema for message creation
const createMessageSchema = z.object({
  content: z.string().min(1, "Message cannot be empty"),
  receiverId: z.string().uuid("Invalid receiver ID"),
})

// Send message action
export async function sendMessage(formData: FormData) {
  const user = await getUserFromToken()

  if (!user) {
    return { error: "Authentication required" }
  }

  const content = formData.get("content") as string
  const receiverId = formData.get("receiverId") as string

  // Validate input
  const result = createMessageSchema.safeParse({ content, receiverId })
  if (!result.success) {
    return { error: result.error.flatten().fieldErrors }
  }

  try {
    // Check if receiver exists
    const receiver = await prisma.user.findUnique({
      where: { id: receiverId },
    })

    if (!receiver) {
      return { error: "Receiver not found" }
    }

    const message = await prisma.message.create({
      data: {
        content,
        senderId: user.id,
        receiverId,
        read: false,
      },
    })

    revalidatePath("/messages")
    return { success: true, message }
  } catch (error) {
    console.error("Send message error:", error)
    return { error: "Failed to send message" }
  }
}

// Get messages action
export async function getMessages() {
  const user = await getUserFromToken()

  if (!user) {
    return { error: "Authentication required" }
  }

  try {
    const messages = await prisma.message.findMany({
      where: {
        OR: [{ senderId: user.id }, { receiverId: user.id }],
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        receiver: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return { success: true, messages }
  } catch (error) {
    console.error("Get messages error:", error)
    return { error: "Failed to fetch messages" }
  }
}

// Mark message as read action
export async function markMessageAsRead(messageId: string) {
  const user = await getUserFromToken()

  if (!user) {
    return { error: "Authentication required" }
  }

  try {
    // Check if message exists and user is the receiver
    const message = await prisma.message.findUnique({
      where: { id: messageId },
    })

    if (!message) {
      return { error: "Message not found" }
    }

    if (message.receiverId !== user.id) {
      return { error: "Not authorized to mark this message as read" }
    }

    await prisma.message.update({
      where: { id: messageId },
      data: { read: true },
    })

    revalidatePath("/messages")
    return { success: true }
  } catch (error) {
    console.error("Mark message as read error:", error)
    return { error: "Failed to mark message as read" }
  }
}

