export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#F8F8FA] pt-24 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-[#1E2A5A] mb-8">
          Privacy Policy
        </h1>
        
        <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 space-y-6 text-gray-700">
          <section>
            <h2 className="text-2xl font-bold text-[#1E2A5A] mb-4">1. Data Collection</h2>
            <p>
              We collect information you provide when creating an account, placing orders, 
              or contacting us. This includes name, email, shipping address, and payment details.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1E2A5A] mb-4">2. How We Use Your Data</h2>
            <p>
              Your data is used to process orders, communicate with you, improve our services, 
              and send marketing communications (with your consent).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1E2A5A] mb-4">3. Data Security</h2>
            <p>
              We implement industry-standard security measures to protect your data. 
              Payment information is encrypted and processed securely through Stripe.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1E2A5A] mb-4">4. Cookies</h2>
            <p>
              We use cookies to enhance your experience, analyze site usage, and deliver 
              personalized content. You can control cookie preferences in your browser.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1E2A5A] mb-4">5. Third-Party Services</h2>
            <p>
              We use third-party services (Stripe, Supabase, Vercel) that may collect data. 
              These services have their own privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1E2A5A] mb-4">6. Your Rights (GDPR)</h2>
            <p>
              You have the right to access, correct, delete your data, and withdraw consent. 
              Contact us at privacy@wearingmind.com to exercise your rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1E2A5A] mb-4">7. Data Retention</h2>
            <p>
              We retain your data as long as your account is active or as needed to provide services. 
              You can request deletion at any time.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1E2A5A] mb-4">8. Contact</h2>
            <p>
              Questions about privacy? Contact us at: privacy@wearingmind.com
            </p>
          </section>

          <p className="text-sm text-gray-500 pt-6 border-t border-gray-200">
            Last updated: January 2026
          </p>
        </div>
      </div>
    </div>
  );
}
