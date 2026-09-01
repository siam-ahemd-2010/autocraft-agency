'use client'

import { useState } from 'react'
import Link from 'next/link'
import PaymentModal from '@/components/PaymentModal'

export default function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link href="/" className="text-2xl font-black text-gray-900 tracking-tight">
            AutoCraft <span className="text-orange-500">Agency</span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-sm font-semibold text-gray-600 hover:text-orange-500 transition-colors">
              Services
            </a>
            <a href="#pricing" className="text-sm font-semibold text-gray-600 hover:text-orange-500 transition-colors">
              Pricing
            </a>
            <a href="#faq" className="text-sm font-semibold text-gray-600 hover:text-orange-500 transition-colors">
              FAQ
            </a>
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden md:flex items-center">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-2.5 rounded-full text-white font-bold text-sm shadow-md shadow-orange-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              style={{ background: 'linear-gradient(to right, #ff6b35, #ff4500)' }}
            >
              Get Started
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="p-2 text-gray-700 hover:text-orange-500 focus:outline-none"
              aria-label="Toggle Menu"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Slide-Over Overlay */}
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Slide-Over Drawer Content */}
      <aside 
        className={`fixed top-0 right-0 h-full w-72 bg-white z-50 shadow-2xl p-6 flex flex-col justify-between transform transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div>
          {/* Header Inside Mobile Drawer */}
          <div className="flex items-center justify-between pb-6 border-b border-gray-100">
            <span className="text-xl font-black text-gray-900">Menu</span>
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="p-2 text-gray-500 hover:text-gray-800"
              aria-label="Close Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation Links inside Drawer */}
          <div className="flex flex-col gap-6 mt-8">
            <a 
              href="#services" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-semibold text-gray-700 hover:text-orange-500 transition-colors"
            >
              Services
            </a>
            <a 
              href="#pricing" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-semibold text-gray-700 hover:text-orange-500 transition-colors"
            >
              Pricing
            </a>
            <a 
              href="#faq" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-semibold text-gray-700 hover:text-orange-500 transition-colors"
            >
              FAQ
            </a>
          </div>
        </div>

        {/* Action Button inside Drawer */}
        <div className="pt-6 border-t border-gray-100">
          <button
            type="button"
            onClick={() => {
              setIsMobileMenuOpen(false)
              setIsModalOpen(true)
            }}
            className="w-full py-3.5 rounded-full text-white font-bold text-base shadow-lg shadow-orange-500/20 active:scale-95 transition-all cursor-pointer"
            style={{ background: 'linear-gradient(to right, #ff6b35, #ff4500)' }}
          >
            Get Started
          </button>
        </div>
      </aside>

      {/* Payment Modal Component */}
      <PaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        serviceName="AutoCraft Complete Package"
      />
    </>
  )
}