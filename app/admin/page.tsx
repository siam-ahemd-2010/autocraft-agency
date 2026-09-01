'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (username === 'siyam' && password === 'Siam++123') {
      setIsAuthenticated(true)
      localStorage.setItem('admin_auth', 'true')
      fetchOrders()
    } else {
      alert('Invalid Username or Password!')
    }
  }

  const fetchOrders = async () => {
    setLoading(true)
    const { data } = await supabase.from('orders').select('*').order('created_at', { ascending: false })
    if (data) setOrders(data)
    setLoading(false)
  }

  useEffect(() => {
    if (localStorage.getItem('admin_auth') === 'true') {
      setIsAuthenticated(true)
      fetchOrders()
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('admin_auth')
    setIsAuthenticated(false)
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Admin Login</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200"
            />
            <button
              type="submit"
              className="w-full py-3 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-700"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 sm:p-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Orders Dashboard</h1>
          <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold">
            Logout
          </button>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold mb-4">Client Orders ({orders.length})</h2>
          {loading ? (
            <p>Loading orders...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-100 text-sm text-gray-500">
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Phone</th>
                    <th className="py-3 px-4">Service</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="py-3.5 px-4 text-xs text-gray-400">
                        {new Date(order.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-3.5 px-4 font-semibold">{order.name}</td>
                      <td className="py-3.5 px-4 text-orange-600">{order.email}</td>
                      <td className="py-3.5 px-4">{order.phone}</td>
                      <td className="py-3.5 px-4 font-medium">{order.service_name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}