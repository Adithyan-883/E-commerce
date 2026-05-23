import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import api from '../api/axios'
import { useCart } from '../context/CartContext'

const Payment = () => {
  const { clearCart } = useCart()
  const navigate = useNavigate()
  const location = useLocation()
  const [isProcessing, setIsProcessing] = useState(false)
  const orderItems = location.state?.orderItems
  const shippingData = location.state?.shippingData
  const isBuyNow = location.state?.isBuyNow
  const total = location.state?.total

  const handlePlaceOrder = async (event) => {
    event.preventDefault()
    setIsProcessing(true)

    try {
      const response = await api.post('/orders', {
        orderItems,
        shippingAddress: {
          fullName: shippingData.fullName,
          phone: shippingData.phone,
          address: shippingData.address,
          city: shippingData.city,
          postalCode: shippingData.postalCode,
          country: shippingData.country,
        },
        guestName: shippingData.fullName,
        guestEmail: shippingData.email,
        paymentMethod: 'Cash on Delivery',
      })

      if (!isBuyNow) clearCart()
      toast.success(`Order placed. Order number: ${response.data._id}`)
      navigate('/')
    } catch (error) {
      // The API interceptor presents the server's validation or stock message.
    } finally {
      setIsProcessing(false)
    }
  }

  if (!orderItems?.length || !shippingData || typeof total !== 'number' || total <= 0) {
    return (
      <section className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-24 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold text-[#1E3A1A]">No pending order</h1>
        <p className="mt-4 text-[#475569]">Please choose products before checkout.</p>
        <button onClick={() => navigate('/products')} className="mt-8 rounded-full bg-[#22c622] px-8 py-4 text-sm font-semibold text-white transition hover:bg-[#FACC15] hover:text-[#1E3A1A]">
          Browse Products
        </button>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <p className="text-sm uppercase tracking-[0.25em] text-[#22c622]">Order Confirmation</p>
        <h1 className="mt-3 text-4xl font-semibold text-[#1E3A1A]">Pay on delivery</h1>
      </div>
      <div className="rounded-[2rem] border border-[#22c622]/10 bg-white p-8 shadow-xl sm:p-10">
        <div className="mb-8 flex items-center justify-between rounded-3xl bg-[#FACC15]/10 p-6">
          <span className="text-lg font-medium text-[#1E3A1A]">Estimated total:</span>
          <span className="text-2xl font-bold text-[#22c622]">Rs. {total.toFixed(2)}</span>
        </div>
        <p className="text-sm leading-7 text-[#475569]">
          Cash on Delivery is currently available. Stock and price are checked again securely when you confirm the order.
        </p>
        <form onSubmit={handlePlaceOrder}>
          <button
            type="submit"
            disabled={isProcessing}
            className="mt-8 flex w-full items-center justify-center rounded-full bg-[#22c622] px-6 py-4 text-lg font-semibold text-white transition duration-300 hover:bg-[#FACC15] hover:text-[#1E3A1A] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isProcessing ? 'Placing order...' : 'Confirm Cash on Delivery Order'}
          </button>
        </form>
      </div>
    </section>
  )
}

export default Payment
