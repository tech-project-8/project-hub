import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getUserFromToken } from "@/lib/auth"
import { getProjects } from "@/app/actions/project-actions"
import DashboardHeader from "@/components/dashboard-header"
import ProjectStatusBadge from "@/components/project-status-badge"
import NewProjectForm from "@/components/new-project-form"

export default async function DashboardPage() {
  const user = await getUserFromToken()

  if (!user) {
    redirect("/login")
  }

  const { success, projects, error } = await getProjects()

  if (!success) {
    return (
      <div className="flex min-h-screen flex-col">
        <DashboardHeader user={user} />
        <main className="flex-1 container py-10">
          <div className="bg-destructive/10 p-4 rounded-md">
            <p className="text-destructive">Error loading projects: {error}</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader user={user} />

      <main className="flex-1 container py-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage your projects and requirements</p>
          </div>
          <NewProjectForm />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.length === 0 ? (
            <div className="col-span-full">
              <Card>
                <CardContent className="pt-6 text-center">
                  <p className="mb-4">You don't have any projects yet.</p>
                  <NewProjectForm buttonText="Create your first project" />
                </CardContent>
              </Card>
            </div>
          ) : (
            (
              projects.map((project) => (
              <Card key={project.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription className="flex justify-between items-center">
                    <span>Type: {project.type.charAt(0) + project.type.slice(1).toLowerCase()}</span>
                    <ProjectStatusBadge status={project.status} />
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {project.description || 'No description provided'}
                  </p>
                </CardContent>
                <CardFooter className="bg-muted/50 pt-3">
                  <div className="w-full flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">
                      Created: {new Date(project.createdAt).toLocaleDateString()}
                    </span>
                    <Button asChild size="sm">
                      <Link href={`/projects/${project.id}`}>View Details</Link>
                    </Button>
                  </div>
                </CardFooter>
              </Card>\
            )
            )
          )}
        </div>
      </main>
    </div>
  )
}

