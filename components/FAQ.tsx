'use client'
import { useState } from 'react'

const faqs = [
  { q: 'Can I buy only one automation?', a: 'Yes! You can purchase any single automation service separately.' },
  { q: 'What is included in the complete package?', a: 'All three automations, responsive landing page, and subdomain.' },
  { q: 'How much is the monthly fee?', a: 'Individual services cost ৳300/month. Complete package is ৳500/month.' },
  { q: 'How do I pay?', a: 'Manual payments through bKash and Nagad.' },
  { q: 'How long does setup take?', a: 'Typically 24-48 hours after payment confirmation.' },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="py-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          Frequently Asked <span className="gradient-text">Questions</span>
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="glass-card rounded-2xl overflow-hidden">
              <button className="w-full px-6 py-4 flex justify-between items-center" onClick={() => setOpenIndex(openIndex === index ? null : index)}>
                <span className="font-semibold text-lg">{faq.q}</span>
                <span className={`text-2xl transition-transform ${openIndex === index ? 'rotate-45 text-orange-500' : ''}`}>+</span>
              </button>
              <div className={`transition-all duration-300 overflow-hidden ${openIndex === index ? 'max-h-96' : 'max-h-0'}`}>
                <div className="px-6 pb-4 text-gray-600">{faq.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}