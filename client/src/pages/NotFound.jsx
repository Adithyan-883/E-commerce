import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <section className="flex min-h-[70vh] items-center justify-center px-4 py-14 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl rounded-[2rem] border border-[#22c622]/10 bg-white p-12 text-center shadow-2xl shadow-[#22c622]/10">
        <p className="text-sm uppercase tracking-[0.25em] text-[#22c622]">404 error</p>
        <h1 className="mt-4 text-5xl font-semibold text-[#1E3A1A]">Page not found</h1>
        <p className="mt-4 text-sm leading-7 text-[#475569]">The page you are looking for is unavailable or may have moved. Explore our products and discover Kerala-inspired goods.</p>
        <Link to="/" className="mt-8 inline-flex rounded-full bg-[#22c622] px-6 py-4 text-sm font-semibold text-white transition duration-300 hover:bg-[#FACC15] hover:text-[#1E3A1A]">
          Return home
        </Link>
      </div>
    </section>
  )
}

export default NotFound
