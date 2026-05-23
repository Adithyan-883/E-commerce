import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/Background.jpeg')" }}>
      <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px]"></div>
      <div className="relative mx-auto max-w-7xl z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="grid gap-12 lg:grid-cols-2 lg:items-center"
        >
          <div className="space-y-8">
            <div className="inline-flex rounded-full bg-[#FACC15]/20 px-4 py-2 text-sm font-semibold uppercase tracking-[0.25em] text-[#22c622]">
              AUTHENTIC FLAVORS OF KERALA
            </div>
            <div>
              <h1 className="text-4xl font-semibold leading-tight tracking-tight text-[#1E3A1A] sm:text-5xl lg:text-6xl">
                Traditional Kerala snacks with a modern touch.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-[#334155]/80 sm:text-xl">
                Enjoy crispy delights, rich spices, and handcrafted treats made from timeless Kerala recipes.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                to="/products"
                className="inline-flex items-center justify-center rounded-full bg-[#22c622] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-[#22c622]/10 transition duration-300 hover:translate-y-[-1px] hover:bg-[#FACC15] hover:text-[#1E3A1A]"
              >
                Shop the collection
              </Link>
              <Link
                to="/products"
                className="inline-flex items-center justify-center rounded-full border border-[#22c622] bg-white px-8 py-4 text-base font-semibold text-[#22c622] transition duration-300 hover:border-[#FACC15] hover:text-[#1E3A1A]"
              >
                Learn more
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection
