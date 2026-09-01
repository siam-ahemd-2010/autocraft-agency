'use client'

import { useState } from 'react'
import PaymentModal from '@/components/PaymentModal'

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center pt-24 pb-12 sm:pt-32 sm:pb-16 z-9999 text-center">
      <div className="container mx-auto px-4 max-w-4xl flex flex-col items-center justify-center">
        
        {/* Responsive Heading */}
        <h1 className="text-3xl xs:text-4xl sm:text-6xl md:text-7xl font-black text-gray-900 tracking-tight leading-tight mb-4 sm:mb-6">
          Automate Your Business. <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
            Grow Without The Busywork.
          </span>
        </h1>

        {/* Responsive Subtitle */}
        <p className="text-sm sm:text-lg md:text-xl text-gray-600 font-medium max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed px-2">
          Smart automation solutions that help businesses save time, respond faster, and work smarter.
        </p>

        {/* CTA Button */}
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="px-7 py-3.5 sm:px-9 sm:py-4 rounded-full text-white font-bold text-base sm:text-lg shadow-xl shadow-orange-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          style={{ background: 'linear-gradient(to right, #ff6b35, #ff4500)' }}
        >
          Get Started
        </button>

      </div>

      <PaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        serviceName="AutoCraft Complete Package"
      />
    </section>
  )
}