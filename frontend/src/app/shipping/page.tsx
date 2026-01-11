export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-[#F8F8FA] pt-24 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-[#1E2A5A] mb-8">
          Shipping & Returns
        </h1>
        
        <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 space-y-8 text-gray-700">
          {/* Shipping Section */}
          <section>
            <h2 className="text-3xl font-bold text-[#1E2A5A] mb-6">Shipping Information</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Shipping Methods</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Standard Shipping (€5.00)</strong> - 5-7 business days</li>
                  <li><strong>Express Shipping (€15.00)</strong> - 2-3 business days</li>
                  <li><strong>Free Shipping</strong> - Orders over €150</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Worldwide Delivery</h3>
                <p>
                  We ship to over 100 countries worldwide. International shipping times 
                  vary by destination (typically 7-14 business days).
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Order Processing</h3>
                <p>
                  Orders are processed within 1-2 business days. You will receive a 
                  tracking number via email once your order ships.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Customs & Duties</h3>
                <p>
                  International orders may be subject to customs fees and import duties. 
                  These charges are the responsibility of the recipient.
                </p>
              </div>
            </div>
          </section>

          {/* Returns Section */}
          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-3xl font-bold text-[#1E2A5A] mb-6">Returns & Exchanges</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">30-Day Return Policy</h3>
                <p>
                  We accept returns within 30 days of delivery. Items must be unworn, 
                  unwashed, and in original condition with tags attached.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">How to Return</h3>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li>Contact us at returns@wearingmind.com with your order number</li>
                  <li>We will provide a return shipping label</li>
                  <li>Pack items securely and attach the label</li>
                  <li>Drop off at your nearest post office</li>
                  <li>Refund processed within 5-7 business days after receipt</li>
                </ol>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Exchanges</h3>
                <p>
                  We offer free exchanges for size or color within 30 days. 
                  Contact us to initiate an exchange.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Non-Returnable Items</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Sale or discounted items</li>
                  <li>Gift cards</li>
                  <li>Worn or damaged items</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Refund Method</h3>
                <p>
                  Refunds are issued to the original payment method. Shipping costs 
                  are non-refundable (except for defective items).
                </p>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-3xl font-bold text-[#1E2A5A] mb-4">Need Help?</h2>
            <p>
              Contact our customer service team:
            </p>
            <ul className="mt-4 space-y-2">
              <li><strong>Email:</strong> support@wearingmind.com</li>
              <li><strong>Hours:</strong> Monday-Friday, 9AM-6PM CET</li>
              <li><strong>Response Time:</strong> Within 24 hours</li>
            </ul>
          </section>

          <p className="text-sm text-gray-500 pt-6 border-t border-gray-200">
            Last updated: January 2026
          </p>
        </div>
      </div>
    </div>
  );
}
