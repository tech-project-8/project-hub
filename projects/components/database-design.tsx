"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function DatabaseDesign() {
  const [activeTab, setActiveTab] = useState("schema")

  return (
    <div className="mt-8">
      <Tabs defaultValue="schema" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="schema">Database Schema</TabsTrigger>
          <TabsTrigger value="tables">Table Structure</TabsTrigger>
          <TabsTrigger value="relationships">Relationships</TabsTrigger>
        </TabsList>

        <TabsContent value="schema" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Database Schema</CardTitle>
              <CardDescription>Overview of the ProjectHub database architecture</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <div className="min-w-[800px] p-4">
                  {/* Database Schema Diagram */}
                  <div className="border rounded-lg p-6 bg-muted/30">
                    <pre className="text-xs md:text-sm whitespace-pre overflow-x-auto">
                      {`
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│     Users       │       │    Projects     │       │   Requirements   │
├─────────────────┤       ├─────────────────┤       ├─────────────────┤
│ id              │       │ id              │       │ id              │
│ name            │       │ title           │       │ project_id      │
│ email           │◄──────┤ client_id       │       │ description     │
│ password        │       │ type            │       │ status          │
│ role            │       │ status          │◄──────┤ created_at      │
│ created_at      │       │ created_at      │       │ updated_at      │
└─────────────────┘       └─────────────────┘       └─────────────────┘
        ▲                         ▲                         
        │                         │                         
        │                         │                         
        │                         │                         
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│   Messages      │       │  Transactions    │       │     Files       │
├─────────────────┤       ├─────────────────┤       ├─────────────────┤
│ id              │       │ id              │       │ id              │
│ sender_id       │       │ project_id      │       │ project_id      │
│ receiver_id     │       │ amount          │       │ name            │
│ content         │       │ status          │       │ path            │
│ read            │       │ payment_method  │       │ size            │
│ created_at      │       │ created_at      │       │ type            │
└─────────────────┘       └─────────────────┘       └─────────────────┘
`}
                    </pre>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tables" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Table Structure</CardTitle>
              <CardDescription>Detailed information about each table in the database</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Users Table</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="py-2 px-4 text-left">Column</th>
                          <th className="py-2 px-4 text-left">Type</th>
                          <th className="py-2 px-4 text-left">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2 px-4">id</td>
                          <td className="py-2 px-4">UUID</td>
                          <td className="py-2 px-4">Primary key</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-4">name</td>
                          <td className="py-2 px-4">VARCHAR(255)</td>
                          <td className="py-2 px-4">User's full name</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-4">email</td>
                          <td className="py-2 px-4">VARCHAR(255)</td>
                          <td className="py-2 px-4">User's email address (unique)</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-4">password</td>
                          <td className="py-2 px-4">VARCHAR(255)</td>
                          <td className="py-2 px-4">Hashed password</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-4">role</td>
                          <td className="py-2 px-4">ENUM</td>
                          <td className="py-2 px-4">User role (admin, client, etc.)</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4">created_at</td>
                          <td className="py-2 px-4">TIMESTAMP</td>
                          <td className="py-2 px-4">Account creation timestamp</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Projects Table</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="py-2 px-4 text-left">Column</th>
                          <th className="py-2 px-4 text-left">Type</th>
                          <th className="py-2 px-4 text-left">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2 px-4">id</td>
                          <td className="py-2 px-4">UUID</td>
                          <td className="py-2 px-4">Primary key</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-4">title</td>
                          <td className="py-2 px-4">VARCHAR(255)</td>
                          <td className="py-2 px-4">Project title</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-4">client_id</td>
                          <td className="py-2 px-4">UUID</td>
                          <td className="py-2 px-4">Foreign key to Users table</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-4">type</td>
                          <td className="py-2 px-4">ENUM</td>
                          <td className="py-2 px-4">Project type (dynamic, static)</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-4">status</td>
                          <td className="py-2 px-4">ENUM</td>
                          <td className="py-2 px-4">Project status (pending, in-progress, completed)</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4">created_at</td>
                          <td className="py-2 px-4">TIMESTAMP</td>
                          <td className="py-2 px-4">Project creation timestamp</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Messages Table</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="py-2 px-4 text-left">Column</th>
                          <th className="py-2 px-4 text-left">Type</th>
                          <th className="py-2 px-4 text-left">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2 px-4">id</td>
                          <td className="py-2 px-4">UUID</td>
                          <td className="py-2 px-4">Primary key</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-4">sender_id</td>
                          <td className="py-2 px-4">UUID</td>
                          <td className="py-2 px-4">Foreign key to Users table</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-4">receiver_id</td>
                          <td className="py-2 px-4">UUID</td>
                          <td className="py-2 px-4">Foreign key to Users table</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-4">content</td>
                          <td className="py-2 px-4">TEXT</td>
                          <td className="py-2 px-4">Message content</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-4">read</td>
                          <td className="py-2 px-4">BOOLEAN</td>
                          <td className="py-2 px-4">Message read status</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4">created_at</td>
                          <td className="py-2 px-4">TIMESTAMP</td>
                          <td className="py-2 px-4">Message timestamp</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="relationships" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Database Relationships</CardTitle>
              <CardDescription>How tables are connected in the ProjectHub database</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">One-to-Many Relationships</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <span className="font-medium">Users → Projects:</span> One user can have multiple projects
                    </li>
                    <li>
                      <span className="font-medium">Projects → Requirements:</span> One project can have multiple
                      requirements
                    </li>
                    <li>
                      <span className="font-medium">Projects → Transactions:</span> One project can have multiple
                      transactions
                    </li>
                    <li>
                      <span className="font-medium">Projects → Files:</span> One project can have multiple files
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Many-to-Many Relationships</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <span className="font-medium">Users ↔ Messages:</span> Users can send and receive multiple
                      messages
                    </li>
                  </ul>
                </div>

                <div className="bg-muted/30 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Database Implementation Notes</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>All tables use UUID as primary keys for security and distribution</li>
                    <li>Foreign key constraints ensure referential integrity</li>
                    <li>Timestamps are automatically managed for auditing purposes</li>
                    <li>Indexes are created on frequently queried columns for performance</li>
                    <li>Soft delete pattern implemented for data recovery capabilities</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

