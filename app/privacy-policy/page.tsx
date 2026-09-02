import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy - AutoCraft Agency',
  description: 'Privacy Policy for AutoCraft Agency services and automation platform.',
}

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white text-gray-800 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link 
          href="/" 
          className="inline-flex items-center text-sm font-semibold text-orange-600 hover:text-orange-700 mb-8 transition-colors"
        >
          ← Back to Home
        </Link>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
          Privacy Policy
        </h1>
        <p className="text-sm text-gray-500 mb-8">
          Effective Date: August 1, 2026
        </p>

        <div className="prose prose-orange max-w-none space-y-6 text-gray-600 leading-relaxed">
          <p>
            Welcome to <strong>AutoCraft Agency</strong> (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or use our automation services.
          </p>

          {/* Section 1 */}
          <section className="mt-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Information We Collect</h2>
            <p className="mb-2">We collect information that you voluntarily provide to us when you inquire about or purchase our services. This includes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Personal Data:</strong> Name, email address, phone number, and social media account/page details.</li>
              <li><strong>Automation Data:</strong> Facebook/Instagram Page access tokens, messaging configurations, and post scheduling details required to perform our services.</li>
              <li><strong>Usage Data:</strong> Browser type, IP address, and pages visited on our platform to improve user experience.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="mt-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. How We Use Your Information</h2>
            <p className="mb-2">We use the collected information for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>To set up and manage your automated message replies, comment bots, and post scheduling.</li>
              <li>To build and deploy your custom responsive landing page.</li>
              <li>To process payments and manage your account subscription.</li>
              <li>To provide customer support and send service updates.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="mt-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. Data Protection and Security</h2>
            <p className="mb-2">We implement strict security measures to protect your data:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>We never store sensitive password credentials directly; access is granted strictly via secure OAuth tokens or official API integrations.</li>
              <li>We do not sell, trade, or rent your personal information to third parties.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="mt-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Third-Party Services</h2>
            <p>
              Our services may interact with third-party platforms (such as Meta/Facebook, Supabase, Vercel, or custom API endpoints). We encourage you to review the privacy policies of these third-party services.
            </p>
          </section>

          {/* Section 5 */}
          <section className="mt-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Your Rights</h2>
            <p className="mb-2">You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access, correct, or request deletion of your personal data.</li>
              <li>Revoke automation access permissions at any time through your Facebook Page settings.</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section className="mt-6 border-t border-gray-200 pt-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Contact Us</h2>
            <p className="mb-2">If you have any questions or concerns regarding this Privacy Policy, please contact us at:</p>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 text-sm">
              <p><strong>Email:</strong> md.seam123321@gmail.com</p>
              <p><strong>Facebook:</strong> AutoCraft Agency</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}