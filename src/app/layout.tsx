
import { Inter } from 'next/font/google'
import { ThemeProvider } from "@/components/ThemeProvider"
import { Toaster } from "@/components/ui/sonner"
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'SwiftTrack Automator',
  description: 'Courier Management System',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          defaultTheme="dark"
          storageKey="vite-ui-theme"
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
