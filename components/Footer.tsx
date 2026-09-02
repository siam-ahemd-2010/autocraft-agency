import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="py-12">
      <div className="container mx-auto px-6">
        <div className="glass rounded-3xl p-8 text-center flex flex-col items-center justify-center">
          
          {/* Brand Name */}
          <h3 className="text-2xl font-bold mb-3">
            <span className="gradient-text">AutoCraft</span> Agency
          </h3>

          {/* Subtitle */}
          <p className="text-gray-600 mb-6 max-w-md">
            Smart automation solutions for modern businesses.
          </p>

          {/* Footer Navigation Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-6 text-sm font-medium">
            <Link 
              href="/privacy-policy" 
              className="text-gray-600 hover:text-orange-500 transition-colors"
            >
              Privacy Policy
            </Link>
            <a 
              href="mailto:md.seam123321@gmail.com" 
              className="text-gray-600 hover:text-orange-500 transition-colors"
            >
              Contact Support
            </a>
          </div>

          <div className="w-full max-w-xs h-[1px] bg-gray-200/60 mb-6" />

          {/* Copyright Notice */}
          <p className="text-gray-500 text-sm">
            &copy; 2026 AutoCraft Agency. All rights reserved.
          </p>

        </div>
      </div>
    </footer>
  )
}