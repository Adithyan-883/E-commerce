import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'
import { useCart } from '../../context/CartContext'

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product, 1)
    toast.success(`${product.title} added to cart!`)
  }
  return (
    <motion.article
      whileHover={{ y: -6 }}
      className="group overflow-hidden rounded-[1.75rem] border border-[#FACC15]/30 bg-white shadow-xl shadow-[#22c622]/5 transition duration-300 hover:border-[#22c622]"
    >
      <Link to={`/product/${product.id}`}>
        <div className="relative h-64 overflow-hidden bg-slate-100">
          <img src={product.image} alt={product.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        </div>
      </Link>
      <div className="space-y-4 p-6">
        <div className="flex items-center justify-between text-sm uppercase tracking-[0.18em] text-[#22c622]/80">
          <span>{product.category}</span>
          <span className="font-semibold text-[#A78B15]">₹{product.price.toFixed(2)}</span>
        </div>
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="text-xl font-semibold text-[#1E3A1A] transition group-hover:text-[#22c622]">{product.title}</h3>
        </Link>
        <p className="text-sm leading-6 text-[#475569]">{product.description}</p>
        <button type="button" onClick={handleAddToCart} className="inline-flex w-full items-center justify-center rounded-full bg-[#22c622] px-4 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-[#FACC15] hover:text-[#1E3A1A]">
          Add to cart
        </button>
      </div>
    </motion.article>
  )
}

export default ProductCard
