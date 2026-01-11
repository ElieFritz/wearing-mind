export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#F8F8FA] pt-24 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-[#1E2A5A] mb-8">
          Terms of Service
        </h1>
        
        <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 space-y-6 text-gray-700">
          <section>
            <h2 className="text-2xl font-bold text-[#1E2A5A] mb-4">1. Introduction</h2>
            <p>
              Welcome to WEARING MIND. These Terms of Service govern your use of our website 
              and the purchase of our products.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1E2A5A] mb-4">2. Products & Pricing</h2>
            <p>
              All products are subject to availability. Prices are displayed in Euros (€) 
              and include applicable taxes. We reserve the right to modify prices at any time.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1E2A5A] mb-4">3. Orders & Payment</h2>
            <p>
              By placing an order, you confirm that all information provided is accurate. 
              Payment is processed securely through Stripe. Orders are subject to acceptance.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1E2A5A] mb-4">4. Shipping & Delivery</h2>
            <p>
              Shipping times vary by location. We ship worldwide. Standard delivery takes 
              5-7 business days. Express shipping available at checkout.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1E2A5A] mb-4">5. Returns & Refunds</h2>
            <p>
              You have 30 days to return items in original condition. Refunds are processed 
              within 5-7 business days. Sale items are final sale.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1E2A5A] mb-4">6. Intellectual Property</h2>
            <p>
              All content, designs, and trademarks are property of WEARING MIND. 
              Unauthorized use is prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1E2A5A] mb-4">7. Contact</h2>
            <p>
              For questions, contact us at: support@wearingmind.com
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
