'use client'

import dynamic from 'next/dynamic'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Pricing from '../components/Pricing'
import Services from '../components/Services'
import HowItWorks from '../components/HowItWorks'
import WhyAutoCraft from '../components/WhyAutoCraft'
import FAQ from '../components/FAQ'
import FinalCTA from '../components/FinalCTA'
import Footer from '../components/Footer'

// ThreeJS Canvas-এর SSR ক্র্যাশ সমস্যা রোধ করতে Dynamic Import
const ThreeScene = dynamic(() => import('@/components/ThreeScene'), {
  ssr: false,
})

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900 relative">
      {/* Background Three.js 3D Wave Network Animation */}
      <ThreeScene />

      {/* Main UI Sections */}
      <Navbar />
      <Hero />
      
      {/* Re-ordered Sections */}
      <section id="pricing" className="relative z-10">
        <Pricing />
      </section>

      <section id="services" className="relative z-10">
        <Services />
      </section>

      <div className="relative z-10">
        <HowItWorks />
        <WhyAutoCraft />
        <FAQ />
        <FinalCTA />
        <Footer />
      </div>
    </main>
  )
}