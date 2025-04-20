"use client"
import { CheckCircle, Circle, XCircle } from "lucide-react"

interface Requirement {
  id: string
  description: string
  status: string
  createdAt: Date
}

interface RequirementsListProps {
  requirements: Requirement[]
}

export default function RequirementsList({ requirements }: RequirementsListProps) {
  if (requirements.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No requirements added yet. Add your first requirement below.
      </div>
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "REJECTED":
        return <XCircle className="h-5 w-5 text-destructive" />
      case "APPROVED":
        return <CheckCircle className="h-5 w-5 text-blue-500" />
      default:
        return <Circle className="h-5 w-5 text-muted-foreground" />
    }
  }

  return (
    <div className="space-y-4">
      {requirements.map((requirement) => (
        <div
          key={requirement.id}
          className="flex items-start gap-3 p-3 border rounded-md hover:bg-muted/50 transition-colors"
        >
          <div className="mt-0.5">{getStatusIcon(requirement.status)}</div>
          <div className="flex-1">
            <p>{requirement.description}</p>
            <p className="text-xs text-muted-foreground mt-1">
              Added on {new Date(requirement.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

