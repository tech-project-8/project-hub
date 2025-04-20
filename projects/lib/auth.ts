import { cookies } from "next/headers"
import { jwtVerify } from "jose"
import { prisma } from "./db"

export async function getUserFromToken() {
  const token = cookies().get("auth-token")?.value

  if (!token) {
    return null
  }

  try {
    // Verify token
    const verified = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET || "default-secret-key"))

    const payload = verified.payload

    // Get user from database to ensure they still exist
    const user = await prisma.user.findUnique({
      where: { id: payload.id as string },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    })

    return user
  } catch (error) {
    console.error("Token verification error:", error)
    return null
  }
}

export async function requireAuth() {
  const user = await getUserFromToken()

  if (!user) {
    throw new Error("Authentication required")
  }

  return user
}

export async function requireAdmin() {
  const user = await getUserFromToken()

  if (!user) {
    throw new Error("Authentication required")
  }

  if (user.role !== "ADMIN") {
    throw new Error("Admin access required")
  }

  return user
}

