import { useMemo, useState, useEffect } from 'react'
import ProductCard from '../components/product/ProductCard'
import { productService } from '../services/productService'
import { SkeletonLoader } from '../components/common/SkeletonLoader'

const Products = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getAllProducts();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      return product.title.toLowerCase().includes(search.toLowerCase()) || product.description.toLowerCase().includes(search.toLowerCase())
    })
  }, [products, search])

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mb-10 grid gap-6 lg:grid-cols-2 lg:items-end lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-[#22c622]">Shop the range</p>
          <h1 className="mt-3 text-4xl font-semibold text-[#1E3A1A] sm:text-5xl">Find your perfect Kerala flavor.</h1>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="rounded-full border border-[#22c622]/20 bg-white px-4 py-3 shadow-sm">
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products"
              className="w-full bg-transparent text-sm text-[#1E3A1A] outline-none placeholder:text-[#475569]"
            />
          </div>

        </div>
      </div>

      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {Array(6).fill(0).map((_, i) => <SkeletonLoader key={i} />)}
        </div>
      ) : error ? (
        <div className="rounded-[2rem] bg-red-50 p-12 text-center text-red-600">
          {error}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="rounded-[2rem] border border-[#22c622]/10 bg-white p-12 text-center shadow-lg">
          <p className="text-xl font-semibold text-[#1E3A1A]">No products matched your search.</p>
          <p className="mt-3 text-sm text-[#475569]">Try adjusting your search.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  )
}

export default Products
