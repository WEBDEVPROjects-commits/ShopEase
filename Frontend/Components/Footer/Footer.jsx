function Footer(){
    return (
        <>
            <footer className="bg-zinc-900 text-white mt-12">
  
  <div className="max-w-7xl mx-auto px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">

    {/* Brand */}
    <div>
      <h2 className="text-2xl font-bold text-green-400">
        ShopEase
      </h2>

      <p className="text-zinc-400 mt-4 text-sm leading-6">
        Your one-stop destination for quality products at
        affordable prices.
      </p>
    </div>

    {/* Quick Links */}
    <div>
      <h3 className="font-semibold text-lg mb-4">
        Quick Links
      </h3>

      <ul className="space-y-2 text-zinc-400">
        <li className="hover:text-green-400 cursor-pointer transition">
          Home
        </li>

        <li className="hover:text-green-400 cursor-pointer transition">
          Products
        </li>

        <li className="hover:text-green-400 cursor-pointer transition">
          About
        </li>

        <li className="hover:text-green-400 cursor-pointer transition">
          Contact
        </li>
      </ul>
    </div>

    {/* Customer Service */}
    <div>
      <h3 className="font-semibold text-lg mb-4">
        Customer Service
      </h3>

      <ul className="space-y-2 text-zinc-400">
        <li className="hover:text-green-400 cursor-pointer transition">
          FAQ
        </li>

        <li className="hover:text-green-400 cursor-pointer transition">
          Shipping Policy
        </li>

        <li className="hover:text-green-400 cursor-pointer transition">
          Returns & Refunds
        </li>

        <li className="hover:text-green-400 cursor-pointer transition">
          Terms & Conditions
        </li>
      </ul>
    </div>

    {/* Contact */}
    <div>
      <h3 className="font-semibold text-lg mb-4">
        Contact Us
      </h3>

      <div className="space-y-2 text-zinc-400 text-sm">
        <p>📍 Chandigarh, India</p>
        <p>📞 +91 98765 43210</p>
        <p>✉ support@shopease.com</p>
      </div>
    </div>

  </div>

  {/* Bottom Bar */}
  <div className="border-t border-zinc-800 py-4 text-center text-sm text-zinc-500">
    © {new Date().getFullYear()} ShopEase. All rights reserved.
  </div>

</footer>
        
        </>
    )
}
export default Footer