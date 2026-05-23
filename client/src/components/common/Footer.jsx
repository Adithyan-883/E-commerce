import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="border-t border-[#22c622]/10 bg-white py-12 text-[#1E3A1A]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-[#1E3A1A]">The Royal Bakery</h3>
            <p className="max-w-lg text-sm leading-7 text-[#475569]">
              Premium Kerala-inspired goods, spices, and handcrafted home essentials delivered with a modern luxury experience.
            </p>
            <p className="text-sm text-[#475569]">support@payyanurgold.com</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">
            <div>
              <h4 className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#22c622]">Explore</h4>
              <ul className="space-y-2 text-sm text-[#475569]">
                <li><Link to="/products" className="transition hover:text-[#FACC15]">Shop all</Link></li>
                <li><Link to="/login" className="transition hover:text-[#FACC15]">Login</Link></li>
                <li><Link to="/signup" className="transition hover:text-[#FACC15]">Signup</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#22c622]">Support</h4>
              <ul className="space-y-2 text-sm text-[#475569]">
                <li>Shipping</li>
                <li>Returns</li>
                <li>Privacy</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#22c622]">Contact</h4>
              <ul className="space-y-2 text-sm text-[#475569]">
                <li>Kerala, India</li>
                <li>+91 12345 67890</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#22c622]">Follow</h4>
              <ul className="space-y-2 text-sm text-[#475569]">
                <li>Instagram</li>
                <li>Facebook</li>
                <li>Pinterest</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-[#22c622]/10 pt-6 text-center text-sm text-[#475569]">
          © 2026 The Royal Bakery. Crafted for premium spice commerce.
        </div>
      </div>
    </footer>
  )
}

export default Footer
