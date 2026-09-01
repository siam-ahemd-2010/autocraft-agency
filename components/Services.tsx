'use client'

import { useState } from 'react'
import PaymentModal from '@/components/PaymentModal'

const servicesData = [
  {
    title: 'Message Auto Reply',
    price: '৳500',
    subText: '+ ৳300/month',
    icon: (
      <svg className="w-10 h-10 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    title: 'Comment Auto Reply',
    price: '৳500',
    subText: '+ ৳300/month',
    icon: (
      <svg className="w-10 h-10 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
      </svg>
    ),
  },
  {
    title: 'Regular Post Automation',
    price: '৳500',
    subText: '+ ৳300/month',
    icon: (
      <svg className="w-10 h-10 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
]

export default function Services() {
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = (title: string) => {
    setSelectedService(title)
    setIsModalOpen(true)
  }

  return (
    <section id="services" className="py-20 relative z-9999">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900">
            Our <span className="gradient-text">Services</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {servicesData.map((item, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-orange-100 shadow-xl flex flex-col items-center text-center justify-between hover:scale-105 transition-all"
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
              
              <div className="my-4">
                <div className="text-3xl font-black text-orange-600">{item.price}</div>
                <div className="text-xs text-gray-400 mt-1">{item.subText}</div>
              </div>

              <button
                onClick={() => handleOpenModal(item.title)}
                className="w-full mt-6 py-3 rounded-full text-white font-semibold transition-transform hover:scale-105 active:scale-95 shadow-md"
                style={{ background: 'var(--accent-gradient, linear-gradient(to right, #ff6b35, #ff4500))' }}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>

      <PaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        serviceName={selectedService || 'Automation Service'}
      />
    </section>
  )
}