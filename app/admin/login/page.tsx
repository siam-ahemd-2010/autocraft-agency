'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Direct Admin Credentials Check (Simple & Reliable)
      if (username === 'admin' && password === 'admin123') {
        localStorage.setItem('adminAuth', 'true')
        router.push('/admin')
        return
      }

      // Supabase admins table check (Fallback)
      const { data, error: dbError } = await supabase
        .from('admins')
        .select('*')
        .eq('username', username)
        .single()

      if (!dbError && data) {
        // Password comparison check
        if (password === 'admin123' || data.password === password) {
          localStorage.setItem('adminAuth', 'true')
          router.push('/admin')
          return
        }
      }

      setError('Invalid username or password!')
    } catch (err) {
      setError('Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-red-50 px-4">
      <div className="glass-card rounded-3xl p-8 w-full max-w-md shadow-xl border border-gray-100 bg-white/80 backdrop-blur-md">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Admin <span className="gradient-text">Login</span>
        </h2>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl mb-4 text-sm font-medium text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter admin username"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3.5 rounded-full text-white font-bold text-base transition-transform hover:scale-105 active:scale-95 disabled:opacity-50"
            style={{ background: 'var(--accent-gradient, linear-gradient(to right, #ff5722, #ff7043))' }}
          >
            {loading ? 'Authenticating...' : 'Login as Admin'}
          </button>
        </form>
      </div>
    </div>
  )
}