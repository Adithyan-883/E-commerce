import { useNavigate, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useCart } from '../context/CartContext'

const checkoutSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City is required"),
  postalCode: z.string().min(4, "Postal code is required"),
  country: z.string().min(2, "Country is required"),
})

const Checkout = () => {
  const { cartItems, cartTotal } = useCart()
  const location = useLocation()
  const navigate = useNavigate()
  const buyNowItem = location.state?.buyNowItem
  
  const itemsToCheckout = buyNowItem ? [{ ...buyNowItem, quantity: 1 }] : cartItems
  const subtotal = buyNowItem ? buyNowItem.price : cartTotal

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(checkoutSchema)
  })

  const onSubmit = (data) => {
    navigate('/payment', { state: { total, isBuyNow: !!buyNowItem, shippingData: data } })
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.25em] text-[#22c622]">Checkout</p>
        <h1 className="mt-3 text-4xl font-semibold text-[#1E3A1A]">Complete your order</h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.4fr,_0.9fr]">
        <form id="checkout-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6 rounded-[2rem] border border-[#22c622]/10 bg-white p-8 shadow-xl sm:p-10">
          <div>
            <h2 className="text-2xl font-semibold text-[#1E3A1A]">Shipping details</h2>
            <p className="mt-3 text-sm leading-7 text-[#475569]">Enter your delivery address and contact information.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <label htmlFor="fullName" className="block">
              <span className="text-sm font-medium text-[#475569]">Full name</span>
              <input id="fullName" {...register('fullName')} className={`mt-3 w-full rounded-3xl border bg-[#FACC15]/10 px-4 py-4 text-sm text-[#1E3A1A] outline-none transition duration-300 ${errors.fullName ? 'border-red-500' : 'border-[#22c622]/20 focus:border-[#22c622]'}`} />
              {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName.message}</p>}
            </label>
            <label htmlFor="email" className="block">
              <span className="text-sm font-medium text-[#475569]">Email address</span>
              <input id="email" type="email" {...register('email')} className={`mt-3 w-full rounded-3xl border bg-[#FACC15]/10 px-4 py-4 text-sm text-[#1E3A1A] outline-none transition duration-300 ${errors.email ? 'border-red-500' : 'border-[#22c622]/20 focus:border-[#22c622]'}`} />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
            </label>
          </div>
          <label htmlFor="address" className="block">
            <span className="text-sm font-medium text-[#475569]">Address</span>
            <input id="address" {...register('address')} className={`mt-3 w-full rounded-3xl border bg-[#FACC15]/10 px-4 py-4 text-sm text-[#1E3A1A] outline-none transition duration-300 ${errors.address ? 'border-red-500' : 'border-[#22c622]/20 focus:border-[#22c622]'}`} />
            {errors.address && <p className="mt-1 text-xs text-red-500">{errors.address.message}</p>}
          </label>
          <div className="grid gap-6 sm:grid-cols-2">
            <label htmlFor="city" className="block">
              <span className="text-sm font-medium text-[#475569]">City</span>
              <input id="city" {...register('city')} className={`mt-3 w-full rounded-3xl border bg-[#FACC15]/10 px-4 py-4 text-sm text-[#1E3A1A] outline-none transition duration-300 ${errors.city ? 'border-red-500' : 'border-[#22c622]/20 focus:border-[#22c622]'}`} />
              {errors.city && <p className="mt-1 text-xs text-red-500">{errors.city.message}</p>}
            </label>
            <label htmlFor="postalCode" className="block">
              <span className="text-sm font-medium text-[#475569]">Postal code</span>
              <input id="postalCode" {...register('postalCode')} className={`mt-3 w-full rounded-3xl border bg-[#FACC15]/10 px-4 py-4 text-sm text-[#1E3A1A] outline-none transition duration-300 ${errors.postalCode ? 'border-red-500' : 'border-[#22c622]/20 focus:border-[#22c622]'}`} />
              {errors.postalCode && <p className="mt-1 text-xs text-red-500">{errors.postalCode.message}</p>}
            </label>
          </div>
          <label htmlFor="country" className="block">
            <span className="text-sm font-medium text-[#475569]">Country</span>
            <input id="country" {...register('country')} className={`mt-3 w-full rounded-3xl border bg-[#FACC15]/10 px-4 py-4 text-sm text-[#1E3A1A] outline-none transition duration-300 ${errors.country ? 'border-red-500' : 'border-[#22c622]/20 focus:border-[#22c622]'}`} />
            {errors.country && <p className="mt-1 text-xs text-red-500">{errors.country.message}</p>}
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

          <button type="submit" form="checkout-form" className="inline-flex w-full items-center justify-center rounded-full bg-[#22c622] px-6 py-4 text-sm font-semibold text-white transition duration-300 hover:bg-[#FACC15] hover:text-[#1E3A1A]">
            Place order
          </button>
        </aside>
      </div>
    </section>
  )
}

export default Checkout
