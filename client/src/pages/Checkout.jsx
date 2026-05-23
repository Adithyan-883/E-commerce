import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const Checkout = () => {
  const { cartItems, cartTotal } = useCart()
  const location = useLocation()
  const buyNowItem = location.state?.buyNowItem
  
  const itemsToCheckout = buyNowItem ? [{ ...buyNowItem, quantity: 1 }] : cartItems
  const subtotal = buyNowItem ? buyNowItem.price : cartTotal

  const [formValue, setFormValue] = useState({ fullName: '', email: '', address: '', city: '', postalCode: '', country: '' })
  
  const shipping = subtotal >= 299 ? 0 : 49
  const discount = subtotal >= 999 ? subtotal * 0.1 : 0
  const total = subtotal > 0 ? subtotal - discount + shipping : 0

  const handleChange = (event) => {
    setFormValue({ ...formValue, [event.target.name]: event.target.value })
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.25em] text-[#22c622]">Checkout</p>
        <h1 className="mt-3 text-4xl font-semibold text-[#1E3A1A]">Complete your order</h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.4fr,_0.9fr]">
        <form className="space-y-6 rounded-[2rem] border border-[#22c622]/10 bg-white p-8 shadow-xl sm:p-10">
          <div>
            <h2 className="text-2xl font-semibold text-[#1E3A1A]">Shipping details</h2>
            <p className="mt-3 text-sm leading-7 text-[#475569]">Enter your delivery address and contact information.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-[#475569]">Full name</span>
              <input name="fullName" value={formValue.fullName} onChange={handleChange} className="mt-3 w-full rounded-3xl border border-[#22c622]/20 bg-[#FACC15]/10 px-4 py-4 text-sm text-[#1E3A1A] outline-none transition duration-300 focus:border-[#22c622]" />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-[#475569]">Email address</span>
              <input name="email" type="email" value={formValue.email} onChange={handleChange} className="mt-3 w-full rounded-3xl border border-[#22c622]/20 bg-[#FACC15]/10 px-4 py-4 text-sm text-[#1E3A1A] outline-none transition duration-300 focus:border-[#22c622]" />
            </label>
          </div>
          <label className="block">
            <span className="text-sm font-medium text-[#475569]">Address</span>
            <input name="address" value={formValue.address} onChange={handleChange} className="mt-3 w-full rounded-3xl border border-[#22c622]/20 bg-[#FACC15]/10 px-4 py-4 text-sm text-[#1E3A1A] outline-none transition duration-300 focus:border-[#22c622]" />
          </label>
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-[#475569]">City</span>
              <input name="city" value={formValue.city} onChange={handleChange} className="mt-3 w-full rounded-3xl border border-[#22c622]/20 bg-[#FACC15]/10 px-4 py-4 text-sm text-[#1E3A1A] outline-none transition duration-300 focus:border-[#22c622]" />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-[#475569]">Postal code</span>
              <input name="postalCode" value={formValue.postalCode} onChange={handleChange} className="mt-3 w-full rounded-3xl border border-[#22c622]/20 bg-[#FACC15]/10 px-4 py-4 text-sm text-[#1E3A1A] outline-none transition duration-300 focus:border-[#22c622]" />
            </label>
          </div>
          <label className="block">
            <span className="text-sm font-medium text-[#475569]">Country</span>
            <input name="country" value={formValue.country} onChange={handleChange} className="mt-3 w-full rounded-3xl border border-[#22c622]/20 bg-[#FACC15]/10 px-4 py-4 text-sm text-[#1E3A1A] outline-none transition duration-300 focus:border-[#22c622]" />
          </label>
        </form>

        <aside className="space-y-6">
          <div className="rounded-[2rem] border border-[#22c622]/10 bg-[#FACC15]/10 p-8 shadow-xl">
            <h2 className="text-2xl font-semibold text-[#1E3A1A]">Order summary</h2>
            <div className="mt-6 space-y-4">
              {itemsToCheckout.map((item) => (
                <div key={item.id} className="flex items-center gap-4 rounded-3xl bg-white p-4 shadow-sm">
                  <div className="h-16 w-16 overflow-hidden rounded-3xl bg-slate-100">
                    <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1E3A1A]">{item.title}</p>
                    <p className="text-sm text-[#475569]">₹{item.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 space-y-3 text-sm text-[#475569]">
              <div className="flex justify-between"><span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>{shipping === 0 ? <span className="font-bold text-[#22c622]">FREE</span> : `₹${shipping.toFixed(2)}`}</span></div>
              {discount > 0 && (
                <div className="flex justify-between text-[#22c622]"><span>Discount (10% OFF)</span><span>-₹{discount.toFixed(2)}</span></div>
              )}
              <div className="flex justify-between text-base font-semibold text-[#1E3A1A]"><span>Total</span><span>₹{total.toFixed(2)}</span></div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#22c622]/10 bg-white p-8 shadow-xl">
            <h2 className="text-2xl font-semibold text-[#1E3A1A]">Payment</h2>
            <p className="mt-4 text-sm leading-7 text-[#475569]">Payment integration goes here. For now, this area shows the order summary and shipping details before checkout.</p>
            <div className="mt-6 rounded-3xl border border-[#22c622]/20 bg-[#FACC15]/10 p-5 text-sm text-[#1E3A1A]">Credit card, UPI, and net banking support available soon.</div>
          </div>

          <Link to="/payment" state={{ total, isBuyNow: !!buyNowItem }} className="inline-flex w-full items-center justify-center rounded-full bg-[#22c622] px-6 py-4 text-sm font-semibold text-white transition duration-300 hover:bg-[#FACC15] hover:text-[#1E3A1A]">
            Place order
          </Link>
        </aside>
      </div>
    </section>
  )
}

export default Checkout
