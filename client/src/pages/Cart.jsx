import { Link } from 'react-router-dom'
import CartItem from '../components/cart/CartItem'
import { useCart } from '../context/CartContext'

const Cart = () => {
  const { cartItems, incrementQuantity, decrementQuantity, removeFromCart, cartTotal } = useCart()

  const shipping = cartTotal >= 299 ? 0 : 49;
  const discount = cartTotal >= 999 ? cartTotal * 0.1 : 0;
  const total = cartTotal > 0 ? cartTotal - discount + shipping : 0;

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.25em] text-[#22c622]">Your bag</p>
        <h1 className="mt-3 text-4xl font-semibold text-[#1E3A1A]">Shopping cart</h1>
      </div>

      {cartItems.length === 0 ? (
        <div className="rounded-[2rem] border border-[#22c622]/10 bg-white p-12 text-center shadow-lg">
          <p className="text-xl font-semibold text-[#1E3A1A]">Your cart is empty</p>
          <Link to="/products" className="mt-6 inline-flex rounded-full bg-[#22c622] px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-[#FACC15] hover:text-[#1E3A1A]">
            Shop products
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1.6fr,_0.9fr]">
          <div className="space-y-5">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} onIncrement={() => incrementQuantity(item.id)} onDecrement={() => decrementQuantity(item.id)} onRemove={() => removeFromCart(item.id)} />
            ))}
          </div>

          <aside className="rounded-[2rem] border border-[#22c622]/10 bg-[#FACC15]/10 p-8 shadow-lg">
            <h2 className="text-2xl font-semibold text-[#1E3A1A]">Order summary</h2>
            <div className="mt-8 space-y-4 text-sm text-[#475569]">
              <div className="flex justify-between">
                <span>Items ({cartItems.length})</span>
                <span>₹{cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? <span className="font-bold text-[#22c622]">FREE</span> : `₹${shipping.toFixed(2)}`}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-[#22c622]">
                  <span>Discount (10% OFF)</span>
                  <span>-₹{discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-semibold text-[#1E3A1A]">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>
            <Link to="/checkout" className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-[#22c622] px-6 py-4 text-sm font-semibold text-white transition duration-300 hover:bg-[#FACC15] hover:text-[#1E3A1A]">
              Proceed to checkout
            </Link>
          </aside>
        </div>
      )}
    </section>
  )
}

export default Cart
