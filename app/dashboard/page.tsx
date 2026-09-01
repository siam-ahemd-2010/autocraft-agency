'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Lead {
  id: string
  name: string
  email: string
  phone: string
  trxId: string
  plan: string
  status: string
  date: string
}

export default function DashboardPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [passcode, setPasscode] = useState('')

  const DASHBOARD_PIN = "2010" // 👈 আপনার পছন্দমতো পাসওয়ার্ড সেট করুন

  useEffect(() => {
    const data = localStorage.getItem('autocraft_leads')
    if (data) {
      setLeads(JSON.parse(data))
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (passcode === DASHBOARD_PIN) {
      setIsAuthenticated(true)
    } else {
      alert('ভুল পাসওয়ার্ড!')
    }
  }

  const deleteLead = (id: string) => {
    const updated = leads.filter((item) => item.id !== id)
    setLeads(updated)
    localStorage.setItem('autocraft_leads', JSON.stringify(updated))
  }

  // পাসওয়ার্ড না দেওয়া পর্যন্ত লগইন স্ক্রিন দেখাবে
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl max-w-sm w-full shadow-xl">
          <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">Admin Login</h2>
          <input
            type="password"
            placeholder="Enter Admin PIN"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl mb-4 focus:outline-none focus:border-orange-500 text-gray-900"
          />
          <button
            type="submit"
            className="w-full bg-orange-500 text-white font-bold py-3 rounded-xl hover:bg-orange-600 transition-all"
          >
            Access Dashboard
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-black text-gray-900">
          AutoCraft <span className="text-orange-500">Dashboard</span>
        </h1>
        <Link href="/" className="text-sm font-semibold text-gray-600 hover:text-orange-500">
          ← Back to Site
        </Link>
      </header>

      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Submitted Orders ({leads.length})</h2>

        {leads.length === 0 ? (
          <div className="bg-white p-10 rounded-2xl border text-center text-gray-500">
            কোনো অর্ডার জমা হয়নি।
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 border-b text-xs font-bold text-gray-600 uppercase">
                  <th className="p-4">Name</th>
                  <th className="p-4">Phone</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">TrxID</th>
                  <th className="p-4">Plan</th>
                  <th className="p-4">Time</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm text-gray-800">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50">
                    <td className="p-4 font-semibold">{lead.name}</td>
                    <td className="p-4">{lead.phone}</td>
                    <td className="p-4">{lead.email}</td>
                    <td className="p-4 font-mono text-xs bg-gray-50 rounded px-2 py-1 border">{lead.trxId}</td>
                    <td className="p-4"><span className="bg-orange-100 text-orange-600 text-xs font-bold px-2 py-1 rounded">{lead.plan}</span></td>
                    <td className="p-4 text-xs text-gray-500">{lead.date}</td>
                    <td className="p-4 text-right">
                      <button onClick={() => deleteLead(lead.id)} className="text-xs font-bold text-red-500 hover:underline">
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  )
}