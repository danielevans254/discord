import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from '@/lib/utils'
import ModalProvider from '@/components/modal-provider'


const font = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Discord',
  description: 'Discord Clone',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      {/* TODO: } Clerk User Button does not have high contrast ratio with the background */}
      <html lang="en" suppressHydrationWarning>
        <body className={cn(font.className, "bg-white dark:bg-slate-700")}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            // forcedTheme='dark'
            storageKey='theme'

          >
            <ModalProvider />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider >
  )
}
