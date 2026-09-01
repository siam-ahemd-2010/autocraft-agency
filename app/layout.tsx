'use client'

import { useState, useEffect } from 'react'
import EntryAnimation from '@/components/EntryAnimation'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <html lang="en">
      <body className="bg-white text-gray-900 antialiased min-h-screen">
        {mounted ? (
          <EntryAnimation>
            {children}
          </EntryAnimation>
        ) : (
          <div className="min-h-screen bg-white flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </body>
    </html>
  )
}