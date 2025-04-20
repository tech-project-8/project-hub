"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createProject } from "@/app/actions/project-actions"

interface NewProjectFormProps {
  buttonText?: string
}

export default function NewProjectForm({ buttonText = "New Project" }: NewProjectFormProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [errors, setErrors] = useState<any>({})
  const [isLoading, setIsLoading] = useState(false)
  const [projectType, setProjectType] = useState<"DYNAMIC" | "STATIC">("DYNAMIC")

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setErrors({})

    const formData = new FormData(event.currentTarget)
    formData.set("type", projectType)

    const result = await createProject(formData)

    if (result.error) {
      setErrors(result.error)
      setIsLoading(false)
      return
    }

    setOpen(false)
    setIsLoading(false)
    router.refresh()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
            <DialogDescription>Fill in the details to create a new project</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Project Title</Label>
              <Input id="title" name="title" placeholder="My Awesome Website" required />
              {errors.title && <p className="text-sm text-destructive">{errors.title[0]}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe your project requirements..."
                rows={4}
              />
              {errors.description && <p className="text-sm text-destructive">{errors.description[0]}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Project Type</Label>
              <Select value={projectType} onValueChange={(value) => setProjectType(value as "DYNAMIC" | "STATIC")}>
                <SelectTrigger>
                  <SelectValue placeholder="Select project type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DYNAMIC">Dynamic Website</SelectItem>
                  <SelectItem value="STATIC">Static Website</SelectItem>
                </SelectContent>
              </Select>
              {errors.type && <p className="text-sm text-destructive">{errors.type[0]}</p>}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Project"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

