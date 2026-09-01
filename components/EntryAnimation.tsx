'use client'

import { useState, useEffect } from 'react'

export default function EntryAnimation({ children }: { children: React.ReactNode }) {
  const [isExpanding, setIsExpanding] = useState(false)
  const [isDone, setIsDone] = useState(false)

  useEffect(() => {
    // ছোট বক্স থেকে বড় হওয়া শুরু করার টাইম
    const expandTimer = setTimeout(() => {
      setIsExpanding(true)
    }, 200)

    // অ্যানিমেশন শেষ হলে নরমাল লেআউটে ফেরত নেওয়া
    const finishTimer = setTimeout(() => {
      setIsDone(true)
    }, 1400)

    return () => {
      clearTimeout(expandTimer)
      clearTimeout(finishTimer)
    }
  }, [])

  if (isDone) {
    return <>{children}</>
  }

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center overflow-hidden z-[99999]">
      <div
        className={`w-full h-full overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-2xl ${
          isExpanding
            ? 'scale-100 rounded-none opacity-100'
            : 'scale-[0.25] rounded-3xl opacity-90 border-4 border-orange-500/50'
        }`}
      >
        <div className="w-screen h-screen overflow-y-auto bg-white pointer-events-none">
          {children}
        </div>
      </div>
    </div>
  )
}