"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { addRequirement } from "@/app/actions/project-actions"

interface AddRequirementFormProps {
  projectId: string
}

export default function AddRequirementForm({ projectId }: AddRequirementFormProps) {
  const router = useRouter()
  const [description, setDescription] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData()
    formData.append("description", description)
    formData.append("projectId", projectId)

    const result = await addRequirement(formData)

    if (result.error) {
      setError(typeof result.error === "string" ? result.error : "Failed to add requirement")
      setIsLoading(false)
      return
    }

    setDescription("")
    setIsLoading(false)
    router.refresh()
  }

  return (
    <div>
      <h3 className="text-lg font-medium mb-2">Add New Requirement</h3>
      <form onSubmit={handleSubmit}>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the requirement..."
          className="mb-3"
          required
        />
        {error && <p className="text-sm text-destructive mb-3">{error}</p>}
        <Button type="submit" disabled={isLoading || !description.trim()}>
          {isLoading ? "Adding..." : "Add Requirement"}
        </Button>
      </form>
    </div>
  )
}

