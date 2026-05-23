import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useCart } from '../context/CartContext'

const Payment = () => {
  const { cartTotal, clearCart } = useCart()
  const navigate = useNavigate()
  const location = useLocation()
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('card')

  const isBuyNow = location.state?.isBuyNow
  const passedTotal = location.state?.total
  
  const shipping = cartTotal >= 299 ? 0 : 49
  const discount = cartTotal >= 999 ? cartTotal * 0.1 : 0
  const defaultTotal = cartTotal > 0 ? cartTotal - discount + shipping : 0
  const total = passedTotal !== undefined ? passedTotal : defaultTotal

  const handlePayment = (e) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      if (!isBuyNow) {
        clearCart()
      }
      toast.success('Payment successful! Your order has been placed.')
      navigate('/')
    }, 2000)
  }

  if (total === 0) {
    return (
      <section className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-24 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold text-[#1E3A1A]">No pending payment</h1>
        <p className="mt-4 text-[#475569]">Your cart is empty.</p>
        <button onClick={() => navigate('/products')} className="mt-8 rounded-full bg-[#22c622] px-8 py-4 text-sm font-semibold text-white transition hover:bg-[#FACC15] hover:text-[#1E3A1A]">
          Browse Products
        </button>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <p className="text-sm uppercase tracking-[0.25em] text-[#22c622]">Secure Payment</p>
        <h1 className="mt-3 text-4xl font-semibold text-[#1E3A1A]">Choose Payment Method</h1>
      </div>

      <div className="rounded-[2rem] border border-[#22c622]/10 bg-white p-8 shadow-xl sm:p-10">
        <div className="mb-8 flex items-center justify-between rounded-3xl bg-[#FACC15]/10 p-6">
          <span className="text-lg font-medium text-[#1E3A1A]">Total Amount to Pay:</span>
          <span className="text-2xl font-bold text-[#22c622]">₹{total.toFixed(2)}</span>
        </div>

        <form onSubmit={handlePayment} className="space-y-6">
          <div className="space-y-4">
            <label className={`flex cursor-pointer items-center rounded-3xl border p-4 transition ${paymentMethod === 'card' ? 'border-[#22c622] bg-[#22c622]/5' : 'border-[#22c622]/20 hover:bg-slate-50'}`}>
              <input type="radio" name="paymentMethod" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="h-5 w-5 accent-[#22c622]" />
              <span className="ml-4 font-medium text-[#1E3A1A]">Credit / Debit Card</span>
            </label>
            
            {paymentMethod === 'card' && (
              <div className="ml-9 mt-4 space-y-4 rounded-2xl bg-slate-50 p-6">
                <input type="text" placeholder="Card Number" required className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#22c622]" />
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="MM/YY" required className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#22c622]" />
                  <input type="text" placeholder="CVC" required className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#22c622]" />
                </div>
                <input type="text" placeholder="Name on Card" required className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#22c622]" />
              </div>
            )}

            <label className={`flex cursor-pointer items-center rounded-3xl border p-4 transition ${paymentMethod === 'upi' ? 'border-[#22c622] bg-[#22c622]/5' : 'border-[#22c622]/20 hover:bg-slate-50'}`}>
              <input type="radio" name="paymentMethod" value="upi" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} className="h-5 w-5 accent-[#22c622]" />
              <span className="ml-4 font-medium text-[#1E3A1A]">UPI (Google Pay, PhonePe, etc.)</span>
            </label>

            {paymentMethod === 'upi' && (
              <div className="ml-9 mt-4 rounded-2xl bg-slate-50 p-6">
                <input type="text" placeholder="Enter UPI ID (e.g., name@okbank)" required className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#22c622]" />
              </div>
            )}
            
            <label className={`flex cursor-pointer items-center rounded-3xl border p-4 transition ${paymentMethod === 'cod' ? 'border-[#22c622] bg-[#22c622]/5' : 'border-[#22c622]/20 hover:bg-slate-50'}`}>
              <input type="radio" name="paymentMethod" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="h-5 w-5 accent-[#22c622]" />
              <span className="ml-4 font-medium text-[#1E3A1A]">Cash on Delivery</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className="mt-8 flex w-full items-center justify-center rounded-full bg-[#22c622] px-6 py-4 text-lg font-semibold text-white transition duration-300 hover:bg-[#FACC15] hover:text-[#1E3A1A] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isProcessing ? (
              <span className="flex items-center gap-2">
                <svg className="h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing Payment...
              </span>
            ) : (
              `Pay ₹${total.toFixed(2)}`
            )}
          </button>
        </form>
      </div>
    </section>
  )
}

export default Payment
