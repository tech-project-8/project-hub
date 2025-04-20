"use client"

import { useState } from "react"
import { FileText, Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface File {
  id: string
  name: string
  path: string
  size: number
  type: string
  createdAt: Date
}

interface ProjectFilesProps {
  files: File[]
  projectId: string
}

export default function ProjectFiles({ files, projectId }: ProjectFilesProps) {
  const [isUploading, setIsUploading] = useState(false)

  // This would be connected to a real file upload action in a complete implementation
  const handleFileUpload = () => {
    setIsUploading(true)
    // Simulate upload delay
    setTimeout(() => {
      setIsUploading(false)
    }, 2000)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " bytes"
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB"
    else return (bytes / 1048576).toFixed(1) + " MB"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Files</CardTitle>
        <CardDescription>Upload and manage files related to this project</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="border-2 border-dashed rounded-md p-6 text-center">
            <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
            <p className="mb-2 text-sm text-muted-foreground">Drag and drop files here, or click to select files</p>
            <Button onClick={handleFileUpload} disabled={isUploading} className="mt-2">
              {isUploading ? "Uploading..." : "Upload Files"}
            </Button>
          </div>
        </div>

        {files.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">No files uploaded yet.</div>
        ) : (
          <div className="space-y-3">
            {files.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(file.size)} • Uploaded on {new Date(file.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    Download
                  </Button>
                  <Button variant="ghost" size="icon">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

