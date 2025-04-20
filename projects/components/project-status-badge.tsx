import { Badge } from "@/components/ui/badge"

interface ProjectStatusBadgeProps {
  status: string
}

export default function ProjectStatusBadge({ status }: ProjectStatusBadgeProps) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "PENDING":
        return { label: "Pending", variant: "outline" as const }
      case "IN_PROGRESS":
        return { label: "In Progress", variant: "secondary" as const }
      case "COMPLETED":
        return { label: "Completed", variant: "default" as const }
      case "CANCELLED":
        return { label: "Cancelled", variant: "destructive" as const }
      default:
        return { label: status, variant: "outline" as const }
    }
  }

  const { label, variant } = getStatusConfig(status)

  return <Badge variant={variant}>{label}</Badge>
}

