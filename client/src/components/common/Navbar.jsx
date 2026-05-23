import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa'
import { useCart } from '../../context/CartContext'

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const { cartCount } = useCart()

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-[#22c622]/10 bg-white text-[#1E3A1A] shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-10 text-2xl font-semibold tracking-tight transition hover:text-[#22c622]">
          <img src="/images/Logo.webp" alt="Logo" className="h-10 w-10 object-contain mix-blend-multiply scale-[2.5] -ml-8" />
          Payyanur Gold
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link to="/" className="transition hover:text-[#22c622]">Home</Link>
          <Link to="/products" className="transition hover:text-[#22c622]">Products</Link>
          <Link to="/cart" className="relative inline-flex items-center gap-2 transition hover:text-[#22c622]">
            <FaShoppingCart className="text-lg" />
            <span className="absolute -right-3 -top-2 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-[#FACC15] px-1 text-[0.65rem] font-semibold text-[#1E3A1A]">
              {cartCount}
            </span>
          </Link>
          <Link to="/admin" className="transition hover:text-[#22c622]">Admin</Link>

        </div>

        <button
          onClick={() => setOpen(!open)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#A78B15] text-[#1E3A1A] transition hover:border-[#22c622] hover:bg-[#22c622]/10 md:hidden"
        >
          {open ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-[#22c622]/10 bg-white px-6 pb-6 text-[#1E3A1A] md:hidden">
          <div className="space-y-4 pt-4">
            <Link to="/" onClick={() => setOpen(false)} className="block rounded-xl px-3 py-3 transition hover:bg-[#22c622]/10 hover:text-[#22c622]">Home</Link>
            <Link to="/products" onClick={() => setOpen(false)} className="block rounded-xl px-3 py-3 transition hover:bg-[#22c622]/10 hover:text-[#22c622]">Products</Link>
            <Link to="/cart" onClick={() => setOpen(false)} className="block rounded-xl px-3 py-3 transition hover:bg-[#22c622]/10 hover:text-[#22c622]">Cart</Link>
            <Link to="/admin" onClick={() => setOpen(false)} className="block rounded-xl px-3 py-3 transition hover:bg-[#22c622]/10 hover:text-[#22c622]">Admin</Link>

          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
