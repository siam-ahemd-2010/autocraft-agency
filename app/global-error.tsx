'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Fatal App Error:', error)
  }, [error])

  return (
    <html>
      <body className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong!</h2>
        <p className="text-gray-600 mb-6 max-w-md text-center">{error.message || 'Client side runtime crash occurred.'}</p>
        <button
          onClick={() => reset()}
          className="px-6 py-2.5 bg-orange-600 text-white font-medium rounded-full shadow-md"
        >
          Try Again
        </button>
      </body>
    </html>
  )
}