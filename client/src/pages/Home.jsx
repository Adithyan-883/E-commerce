import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import HeroSection from '../components/home/HeroSection'
import ProductCard from '../components/product/ProductCard'
import TestimonialCard from '../components/home/TestimonialCard'
import { SkeletonLoader } from '../components/common/SkeletonLoader'
import { productService } from '../services/productService'
import { testimonials } from '../constants/dummyData'

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getAllProducts();
        setFeaturedProducts(data.slice(0, 4));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);
  return (
    <div className="space-y-20 pb-16">
      <HeroSection />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-semibold text-[#1E3A1A] sm:text-4xl">Crispy Bites from Kerala</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#475569]">
              From banana chips to spicy mixtures, explore premium Kerala snacks made to satisfy every craving.
            </p>
          </div>
          <Link to="/products" className="inline-flex items-center justify-center rounded-full bg-[#22c622] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#22c622]/10 transition duration-300 hover:bg-[#FACC15] hover:text-[#1E3A1A]">
            View all products
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-4">
          {loading ? (
            Array(4).fill(0).map((_, i) => <SkeletonLoader key={i} />)
          ) : error ? (
            <div className="col-span-4 rounded-xl bg-red-50 p-6 text-center text-red-600">
              {error}
            </div>
          ) : (
            featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </section>


      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] bg-[#22c622]/10 p-10 sm:p-12">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.25em] text-[#22c622]/80">Our story</p>
              <h2 className="text-3xl font-semibold text-[#1E3A1A] sm:text-4xl">Crafted for timeless Kerala hospitality.</h2>
              <p className="max-w-xl text-sm leading-7 text-[#475569]">
                The Royal Bakery blends nature’s richest spices with modern design, bringing authentic coastal flavor and artisanal presentation into every order.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-white p-6 shadow-lg shadow-[#22c622]/5">
                <p className="text-sm text-[#475569]">Trusted suppliers</p>
                <p className="mt-3 text-2xl font-semibold text-[#22c622]">Premium sourcing</p>
              </div>
              <div className="rounded-3xl bg-white p-6 shadow-lg shadow-[#22c622]/5">
                <p className="text-sm text-[#475569]">Ethical packaging</p>
                <p className="mt-3 text-2xl font-semibold text-[#22c622]">Eco-friendly</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.25em] text-[#22c622]">Testimonials</p>
          <h2 className="mt-3 text-3xl font-semibold text-[#1E3A1A] sm:text-4xl">Loved by Kerala food lovers</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] bg-[#FACC15] px-8 py-12 text-[#1E3A1A] shadow-2xl shadow-[#22c622]/10 sm:px-12 sm:py-16">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-[#1E3A1A]/80">Newsletter</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">Stay updated with new arrivals and special blends.</h2>
            </div>
            <form className="grid gap-4 sm:flex sm:items-center">
              <input type="email" placeholder="Enter your email" className="min-w-0 flex-1 rounded-full border border-[#22c622]/20 bg-white px-5 py-4 text-sm text-[#1E3A1A] outline-none transition focus:border-[#22c622]" />
              <button type="submit" className="inline-flex min-w-[10rem] items-center justify-center rounded-full bg-[#22c622] px-6 py-4 text-sm font-semibold text-white transition duration-300 hover:bg-[#A78B15]">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
