'use client'

import { useState } from 'react'
import PaymentModal from '@/components/PaymentModal'

export default function Pricing() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <section id="pricing" className="py-20 relative z-20">
      <div className="container mx-auto px-4">
        
        {/* Card Wrapper */}
        <div className="max-w-3xl mx-auto bg-white/90 backdrop-blur-xl rounded-3xl p-8 sm:p-12 border border-orange-100 shadow-2xl relative z-30">
          
          {/* Badge */}
          <div className="absolute -top-4 right-8 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-md">
            Most Popular
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 text-center mb-2">
            AutoCraft <span className="gradient-text">Complete Package</span>
          </h2>

          <div className="text-center my-6">
            <span className="text-4xl sm:text-5xl font-black text-orange-600">৳1,000</span>
            <span className="text-xl font-bold text-gray-700 ml-2">Setup</span>
            <p className="text-sm text-gray-500 font-medium mt-1">৳500/month</p>
          </div>

          {/* Feature List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8 max-w-2xl mx-auto">
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-orange-50/50 border border-orange-100">
              <span className="text-orange-500 font-bold">✓</span>
              <span className="text-sm font-semibold text-gray-700">Message Auto Reply</span>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-orange-50/50 border border-orange-100">
              <span className="text-orange-500 font-bold">✓</span>
              <span className="text-sm font-semibold text-gray-700">Comment Auto Reply</span>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-orange-50/50 border border-orange-100">
              <span className="text-orange-500 font-bold">✓</span>
              <span className="text-sm font-semibold text-gray-700">Regular Post Automation</span>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-orange-50/50 border border-orange-100">
              <span className="text-orange-500 font-bold">✓</span>
              <span className="text-sm font-semibold text-gray-700">Responsive Landing Page</span>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-orange-50/50 border border-orange-100 sm:col-span-2 justify-center">
              <span className="text-orange-500 font-bold">✓</span>
              <span className="text-sm font-semibold text-gray-700">Subdomain</span>
            </div>
          </div>

          {/* Action Button */}
          <div className="text-center mt-8">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="px-10 py-4 rounded-full text-white font-bold text-lg shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer relative z-30"
              style={{ background: 'linear-gradient(to right, #ff6b35, #ff4500)' }}
            >
              Get Complete Package
            </button>
          </div>
        </div>

      </div>

      {/* Payment Modal Component */}
      <PaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        serviceName="AutoCraft Complete Package"
      />
    </section>
  )
}