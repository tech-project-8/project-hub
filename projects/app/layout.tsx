import type React from "react"
import { Inter } from "next/font/google"
import { ChatWidget } from "@/components/chat-widget"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "ProjectHub - Custom Website Development",
  description: "Your go-to platform for custom-built websites and projects on demand",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
          <ChatWidget />
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'