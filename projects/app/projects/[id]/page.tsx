import { redirect } from "next/navigation"
import { getUserFromToken } from "@/lib/auth"
import { getProjectDetails } from "@/app/actions/project-actions"
import DashboardHeader from "@/components/dashboard-header"
import ProjectStatusBadge from "@/components/project-status-badge"
import RequirementsList from "@/components/requirements-list"
import AddRequirementForm from "@/components/add-requirement-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import ProjectFiles from "@/components/project-files"
import ProjectTransactions from "@/components/project-transactions"

export default async function ProjectDetailPage({ params }: { params: { id: string } }) {
  const user = await getUserFromToken()

  if (!user) {
    redirect("/login")
  }

  const { success, project, error } = await getProjectDetails(params.id)

  if (!success) {
    return (
      <div className="flex min-h-screen flex-col">
        <DashboardHeader user={user} />
        <main className="flex-1 container py-10">
          <div className="bg-destructive/10 p-4 rounded-md">
            <p className="text-destructive">Error loading project: {error}</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader user={user} />

      <main className="flex-1 container py-10">
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{project.title}</h1>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-muted-foreground">
                  Type: {project.type.charAt(0) + project.type.slice(1).toLowerCase()}
                </span>
                <ProjectStatusBadge status={project.status} />
              </div>
            </div>
          </div>

          {project.description && (
            <div className="mt-4 p-4 bg-muted rounded-md">
              <p>{project.description}</p>
            </div>
          )}
        </div>

        <Tabs defaultValue="requirements" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="requirements">Requirements</TabsTrigger>
            <TabsTrigger value="files">Files</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
          </TabsList>

          <TabsContent value="requirements" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Requirements</CardTitle>
                <CardDescription>Track and manage all requirements for this project</CardDescription>
              </CardHeader>
              <CardContent>
                <RequirementsList requirements={project.requirements} />
                <div className="mt-6 pt-6 border-t">
                  <AddRequirementForm projectId={project.id} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="files" className="mt-6">
            <ProjectFiles files={project.files} projectId={project.id} />
          </TabsContent>

          <TabsContent value="transactions" className="mt-6">
            <ProjectTransactions transactions={project.transactions} projectId={project.id} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

