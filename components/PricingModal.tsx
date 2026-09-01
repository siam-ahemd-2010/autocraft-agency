'use client'

import { useState } from 'react'
import PaymentModal from '@/components/PaymentModal'

const plans = [
  {
    name: 'Starter Plan',
    price: '$199',
    features: ['Basic Workflow Automation', '1 Integration', 'Standard Support', 'Email Alerts'],
  },
  {
    name: 'Complete Package',
    price: '$499',
    popular: true,
    features: ['Full B2B Lead Scraper', 'n8n & Webhook Automation', 'Google Sheets Integration', '24/7 Priority Support'],
  },
  {
    name: 'Enterprise Plan',
    price: '$999',
    features: ['Custom AI Lead Scraper', 'Unlimited Workflows', 'Dedicated Server Setup', 'Custom API Integration'],
  },
]

export default function Pricing() {
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = (serviceName: string) => {
    setSelectedService(serviceName)
    setIsModalOpen(true)
  }

  return (
    <section id="pricing" className="py-24 relative z-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Flexible <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Choose the package that best fits your business automation needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white/80 backdrop-blur-md rounded-3xl p-8 border shadow-lg flex flex-col justify-between transition-all hover:scale-105 ${
                plan.popular ? 'border-orange-500 shadow-orange-100 relative' : 'border-gray-100'
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                  Most Popular
                </span>
              )}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                <div className="text-4xl font-black text-orange-600 mb-6">{plan.price}</div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-center text-sm text-gray-600">
                      <span className="text-orange-500 mr-2">✓</span> {feat}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handleOpenModal(plan.name)}
                className={`w-full py-3.5 rounded-full font-semibold transition-all ${
                  plan.popular
                    ? 'text-white shadow-md hover:opacity-90'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
                style={plan.popular ? { background: 'var(--accent-gradient, linear-gradient(to right, #ff6b35, #ff4500))' } : {}}
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
        serviceName={selectedService || 'Complete Package'}
      />
    </section>
  )
}