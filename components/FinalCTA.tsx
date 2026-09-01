'use client'

import { useState } from 'react'
import PaymentModal from './PaymentModal'

export default function FinalCTA() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="glass-card rounded-3xl p-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready To <span className="gradient-text">Automate?</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8">Let AutoCraft handle the repetitive work.</p>
          
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-block px-12 py-4 rounded-full text-white font-semibold text-xl cursor-pointer transition-transform active:scale-95"
            style={{ background: 'var(--accent-gradient)' }}
          >
            Get Started
          </button>
        </div>
      </div>

      {/* পপআপ মোডাল */}
      <PaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        serviceName="AutoCraft Complete Package"
      />
    </section>
  )
}