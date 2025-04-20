"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"

interface FeatureModalProps {
  icon: React.ReactNode
  title: string
  description: string
  modalContent: React.ReactNode
}

export default function FeatureModal({ icon, title, description, modalContent }: FeatureModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div
        className="flex flex-col items-center space-y-2 border rounded-lg p-6 bg-background transition-all hover:shadow-md cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <div className="p-2 bg-primary/10 rounded-full">{icon}</div>
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-center text-muted-foreground">{description}</p>
        <Button variant="link" size="sm" className="mt-2">
          Learn More
        </Button>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className="p-1 bg-primary/10 rounded-full">{icon}</div>
              {title}
            </DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <div className="mt-4">{modalContent}</div>
          <DialogClose asChild>
            <Button variant="outline" className="mt-4">
              Close
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  )
}

