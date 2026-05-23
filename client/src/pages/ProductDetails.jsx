import { useMemo, useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { FaChevronLeft, FaChevronRight, FaCheckCircle, FaShoppingBag, FaPercentage, FaShippingFast } from 'react-icons/fa'
import { toast } from 'react-hot-toast'
import { products } from '../constants/dummyData'
import ProductCard from '../components/product/ProductCard'
import { useCart } from '../context/CartContext'

const ProductDetails = () => {
  const { addToCart } = useCart()
  const { id } = useParams()
  const navigate = useNavigate()
  const product = products.find((item) => item.id === id)
  
  const allImages = product?.images || (product ? [product.image] : [])
  const [currentImgIndex, setCurrentImgIndex] = useState(0)
  const [selectedPack, setSelectedPack] = useState(0)

  const packs = product?.packs || []
  const hasPacks = packs.length > 0

  const displayPrice = hasPacks ? packs[selectedPack].price : product?.price
  const displayOldPrice = hasPacks ? packs[selectedPack].oldPrice : product?.oldPrice
  const displaySave = hasPacks ? packs[selectedPack].save : (displayOldPrice ? displayOldPrice - displayPrice : 0)
  const displaySavePercent = displayOldPrice ? Math.round((displaySave / displayOldPrice) * 100) : 0

  useEffect(() => {
    if (product) setCurrentImgIndex(0)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [product, id])

  const nextImage = () => {
    setCurrentImgIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1))
  }

  const prevImage = () => {
    setCurrentImgIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1))
  }

  const handleAddToCart = () => {
    if (product) {
      const itemToAdd = hasPacks 
        ? { ...product, price: packs[selectedPack].price, title: `${product.title} - ${packs[selectedPack].label}` }
        : { ...product }
      addToCart(itemToAdd, 1)
      toast.success(`${itemToAdd.title} added to cart!`)
    }
  }

  const handleBuyNowClick = () => {
    if (product) {
      const itemToAdd = hasPacks 
        ? { ...product, price: packs[selectedPack].price, title: `${product.title} - ${packs[selectedPack].label}` }
        : { ...product }
      navigate('/checkout', { state: { buyNowItem: itemToAdd } })
    }
  }

  const relatedProducts = useMemo(() => {
    if (!product) return []
    return products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 3)
  }, [product])

  if (!product) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6 lg:px-8">
        <p className="text-sm uppercase tracking-[0.25em] text-[#22c622]">Not found</p>
        <h1 className="mt-4 text-4xl font-semibold text-[#1E3A1A]">Product not available</h1>
        <Link to="/products" className="mt-8 inline-flex rounded-full bg-[#22c622] px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-[#FACC15] hover:text-[#1E3A1A]">
          Back to products
        </Link>
      </div>
    )
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[1.25fr,0.75fr] lg:items-start">
        {/* Left Side: Image Carousel */}
        <div className="relative flex flex-col gap-4">
          <div className="relative overflow-hidden bg-slate-100 group h-[500px] lg:h-[750px] shadow-lg">
            <img src={allImages[currentImgIndex]} alt={product.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
            
            {allImages.length > 1 && (
              <>
                <button 
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 flex -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full bg-white/80 text-[#1E3A1A] opacity-0 shadow-md backdrop-blur-sm transition-all group-hover:opacity-100 hover:bg-[#FACC15]"
                >
                  <FaChevronLeft />
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 flex -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full bg-white/80 text-[#1E3A1A] opacity-0 shadow-md backdrop-blur-sm transition-all group-hover:opacity-100 hover:bg-[#FACC15]"
                >
                  <FaChevronRight />
                </button>
              </>
            )}
          </div>
          
          {allImages.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImgIndex(idx)}
                  className={`h-20 w-20 flex-shrink-0 overflow-hidden border-[3px] transition ${currentImgIndex === idx ? 'border-[#22c622]' : 'border-transparent hover:border-[#FACC15]'}`}
                >
                  <img src={img} alt={`${product.title} view ${idx + 1}`} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Product Details */}
        <div className="space-y-6 lg:pl-4">
          <div className="space-y-3">
            <h1 className="text-3xl lg:text-4xl font-bold uppercase text-[#1a4a2e]">{product.title}</h1>
            <p className="text-base font-medium leading-relaxed text-[#475569]">
              {product.description}
            </p>
          </div>

          <ul className="space-y-4 pt-2 text-base font-semibold text-[#1E3A1A]">
            <li className="flex items-start gap-3">
              <FaCheckCircle className="mt-0.5 flex-shrink-0 text-xl text-[#FACC15]" />
              <span>Traditional Kerala-style chips made using authentic methods</span>
            </li>
            <li className="flex items-start gap-3">
              <FaCheckCircle className="mt-0.5 flex-shrink-0 text-xl text-[#FACC15]" />
              <span>Made from fresh, high-quality raw ingredients</span>
            </li>
            <li className="flex items-start gap-3">
              <FaCheckCircle className="mt-0.5 flex-shrink-0 text-xl text-[#FACC15]" />
              <span>No preservatives</span>
            </li>
          </ul>

          <div className="flex items-center gap-3 pt-4">
            <span className="text-4xl font-bold text-[#1E3A1A]">RS. {displayPrice?.toFixed(2)}</span>
            {displayOldPrice && (
              <>
                <span className="text-2xl font-bold text-[#94a3b8] line-through">RS. {displayOldPrice.toFixed(2)}</span>
                <span className="ml-2 rounded bg-[#16a34a] px-2 py-1 text-xs font-bold text-white">SAVE {displaySavePercent}%</span>
              </>
            )}
          </div>



          <div className="flex gap-4">
            <div className="flex-1 rounded-xl bg-[#22c622] p-4 text-white shadow-sm border-b-4 border-[#FACC15] animate-shake">
              <div className="flex items-center gap-2">
                <FaPercentage className="text-2xl text-white opacity-90" />
                <p className="text-lg font-bold">GET FREE DELIVERY</p>
              </div>
              <p className="mt-1 text-xs text-green-50">Free Delivery on all orders above ₹299</p>
            </div>
            <div className="flex flex-1 rounded-xl bg-[#22c622] p-4 text-white shadow-sm border-b-4 border-[#FACC15] animate-shake">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <FaPercentage className="text-2xl text-white opacity-90" />
                  <p className="text-lg font-bold">FLAT 10% OFF</p>
                </div>
                <p className="mt-1 text-xs text-green-50">Get 10% OFF Your orders above ₹999</p>
              </div>
            </div>
          </div>

          {hasPacks && (
            <div className="pt-4">
              <h3 className="mb-4 text-lg font-bold uppercase text-[#1E3A1A]">CHOOSE YOUR PACK</h3>
              <div className="grid grid-cols-3 gap-4">
                {packs.map((pack, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedPack(idx)}
                    className={`relative flex flex-col items-center justify-center rounded-2xl border-2 p-4 pt-8 transition-all ${selectedPack === idx ? 'border-[#1a4a2e] border-[3px]' : 'border-[#FACC15] hover:border-[#1a4a2e]'}`}
                  >
                    <div className="absolute inset-x-0 -top-0.5 flex justify-center">
                      <span className={`rounded-b-lg px-4 py-1 text-xs font-bold text-white ${selectedPack === idx ? 'bg-[#16a34a]' : 'bg-[#FACC15]'}`}>Save ₹{pack.save.toFixed(2)}</span>
                    </div>
                    <p className="text-center text-sm font-bold text-[#1E3A1A] max-w-[120px] mx-auto">{pack.label}</p>
                    <p className="mt-3 text-xs font-medium text-[#94a3b8] line-through">Rs. {pack.oldPrice.toFixed(2)}</p>
                    <p className="text-base font-bold text-[#1E3A1A]">Rs. {pack.price.toFixed(2)}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-4 pt-4">
            <button 
              type="button" 
              onClick={handleAddToCart} 
              className="flex flex-1 items-center justify-center gap-3 rounded-full bg-[#1a4a2e] py-4 text-lg font-bold text-white transition hover:bg-[#16a34a]"
            >
              <FaShoppingBag className="text-xl" /> ADD TO CART
            </button>
            <button 
              type="button" 
              onClick={handleBuyNowClick} 
              className="flex items-center justify-center gap-3 rounded-full border-2 border-[#1a4a2e] bg-white px-8 py-4 text-lg font-bold text-[#1a4a2e] transition hover:bg-slate-50"
            >
              BUY NOW
            </button>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <section className="mt-16">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-[#1E3A1A]">Related products</h2>
            <Link to="/products" className="text-sm font-semibold text-[#22c622] transition duration-300 hover:text-[#FACC15]">
              View all
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {relatedProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}
    </section>
  )
}

export default ProductDetails
