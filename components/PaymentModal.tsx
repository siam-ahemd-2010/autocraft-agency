'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  serviceName: string
}

export default function PaymentModal({ isOpen, onClose, serviceName }: PaymentModalProps) {
  const [mounted, setMounted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    trxId: '',
  })

  // Next.js (SSR) এ Hydration Error ঠেকানোর জন্য
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!isOpen || !mounted) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newLead = {
      id: Date.now().toString(),
      ...formData,
      plan: serviceName || 'General Service',
      status: 'Pending',
      date: new Date().toLocaleString(),
    }

    // ব্রাউজারে ডেটা সেভ করা
    const existingLeads = JSON.parse(localStorage.getItem('autocraft_leads') || '[]')
    const updatedLeads = [newLead, ...existingLeads]
    localStorage.setItem('autocraft_leads', JSON.stringify(updatedLeads))

    alert('পেমেন্ট ইনফরমেশন সফলভাবে জমা হয়েছে!')
    setFormData({ name: '', email: '', phone: '', trxId: '' })
    onClose()
  }

  // createPortal এর মাধ্যমে পপআপটি সরাসরি document.body তে রেন্ডার হবে
  return createPortal(
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative z-[100000] my-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-900">Complete Purchase</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 font-bold text-lg">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Full Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-orange-500 text-sm text-gray-900"
              placeholder="Your Name"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Email Address</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-orange-500 text-sm text-gray-900"
              placeholder="example@gmail.com"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Phone Number</label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-orange-500 text-sm text-gray-900"
              placeholder="01700000000"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">TrxID</label>
            <input
              type="text"
              required
              value={formData.trxId}
              onChange={(e) => setFormData({ ...formData, trxId: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-orange-500 text-sm text-gray-900"
              placeholder="TRX12345678"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 mt-2 rounded-xl text-white font-bold text-base shadow-lg cursor-pointer transition-all active:scale-95"
            style={{ background: 'linear-gradient(to right, #ff6b35, #ff4500)' }}
          >
            I've Paid
          </button>
        </form>
      </div>
    </div>,
    document.body
  )
}