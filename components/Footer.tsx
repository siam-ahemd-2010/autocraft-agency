import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="py-12">
      <div className="container mx-auto px-6">
        <div className="glass rounded-3xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">
            <span className="gradient-text">AutoCraft</span> Agency
          </h3>
          <p className="text-gray-600 mb-4">Smart automation solutions for modern businesses.</p>
          <p className="text-gray-500">&copy; 2024 AutoCraft Agency. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}