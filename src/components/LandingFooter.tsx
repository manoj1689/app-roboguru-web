import React from 'react'
import Link from 'next/link'

function LandingFooter() {
  return (
    <div>
      {/* <!-- ========== FOOTER ========== --> */}
      <footer className="mt-4 bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1 */}
          <div>
            <h4 className="font-bold mb-3 text-lg">Product</h4>
            <ul className="text-sm space-y-1 text-gray-600 list-disc list-inside">
              <li className="font-semibold"><Link href="/Careers" className="hover:underline">Careers</Link></li>
              <li className="font-semibold"><Link href="/Contactus" className="hover:underline">Contact Us</Link></li>
              <li className="font-semibold"><Link href="#community" className="hover:underline">Community</Link></li>
            </ul>
          </div>
          {/* Column 2 */}
          <div>
            <h4 className="font-bold mb-3 text-lg">Resources</h4>
            <ul className="text-sm space-y-1 text-gray-600 list-disc list-inside">
              <li className="font-semibold"><Link href="#faq" className="hover:underline">FAQ</Link></li>
              <li className="font-semibold"><Link href="/Disclaimer" className="hover:underline">Disclaimer</Link></li>
              <li className="font-semibold"><Link href="#resources" className="hover:underline">Blog</Link></li>
            </ul>
          </div>
          {/* Column 3 */}
          <div>
            <h4 className="font-bold mb-3 text-lg">Company</h4>
            <ul className="text-sm space-y-1 text-gray-600  list-disc list-inside">
              <li className="font-semibold"><Link href="/Aboutus" className="hover:underline">About Us</Link></li>
              <li className="font-semibold"><Link href="/Term&condtn" className="hover:underline">Terms of Use</Link></li>
              <li className="font-semibold"><Link href="/Privacypolicy" className="hover:underline">Privacy Policy</Link></li>
            </ul>
          </div>
          {/* Column 4 */}
          <div>
            <h4 className="font-bold mb-3 text-lg">Contact</h4>
            <p className="text-sm text-gray-700 mb-2">
              <span className='text-md font-semibold'>Email: </span><Link href="mailto:admin@eramlabs.com" className="text-cyan-500 italic text-lg font-semibold hover:underline">admin@eramlabs.com</Link>
            </p>
            <p className="text-sm text-gray-700 mb-2 font-semibold">Phone: +91-8750860676</p>
            <p className="text-sm text-gray-700 font-semibold">Address: 163 - GF pocket 2 Jasola, New Delhi 1100025</p>
          </div>
        </div>
        <div className="bg-[#418BBB] text-sm text-center py-3">
          <p className='text-white'>© 2024 RoboGuru. All rights reserved.</p>
          <p className='text-white'>“Empowering innovation with AI.”</p>
        </div>
      </footer>
    </div>
  )
}

export default LandingFooter
