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
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    trxId: '',
    plan: serviceName || '',
  })

  useEffect(() => {
    setMounted(true)
    setFormData((prev) => ({ ...prev, plan: serviceName || '' }))
  }, [serviceName])

  if (!isOpen || !mounted) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Google Sheet-এর Column Name-এর সাথে হুবহু মিল রেখে Key সাজানো হয়েছে
    const newLead = {
      ID: Date.now().toString(),
      Name: formData.name,
      Email: formData.email,
      Phone: formData.phone,
      TRXID: formData.trxId,
      PLAN: formData.plan || serviceName || 'General Service',
    }

    try {
      const response = await fetch('https://sheetdb.io/api/v1/xvgsvquvkg2nv', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: [newLead]
        }),
      })

      if (response.ok) {
        alert('পেমেন্ট ইনফরমেশন সফলভাবে জমা হয়েছে!')
        setFormData({ name: '', email: '', phone: '', trxId: '', plan: '' })
        onClose()
      } else {
        alert('কোথাও কোনো সমস্যা হয়েছে, আবার চেষ্টা করুন।')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('নেটওয়ার্ক সমস্যা! পরে আবার চেষ্টা করুন।')
    } finally {
      setLoading(false)
    }
  }

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

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Selected Plan</label>
            <input
              type="text"
              required
              value={formData.plan}
              onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-orange-500 text-sm text-gray-900 bg-gray-50"
              placeholder="e.g. Message Auto Reply / Basic Plan"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 mt-2 rounded-xl text-white font-bold text-base shadow-lg cursor-pointer transition-all active:scale-95 disabled:opacity-50"
            style={{ background: 'linear-gradient(to right, #ff6b35, #ff4500)' }}
          >
            {loading ? 'Submitting...' : "I've Paid"}
          </button>
        </form>
      </div>
    </div>,
    document.body
  )
}