import { useState, useEffect } from 'react'
import api from '../api/axios'

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [loadingProducts, setLoadingProducts] = useState(false)
  const [loadingOrders, setLoadingOrders] = useState(false)

  // Fetch real products from API
  useEffect(() => {
    if (activeTab === 'products' || activeTab === 'dashboard') {
      setLoadingProducts(true)
      api.get('/products')
        .then((res) => setProducts(res.data))
        .catch(() => {}) // axios interceptor already shows toast
        .finally(() => setLoadingProducts(false))
    }
  }, [activeTab])

  // Fetch real orders from API
  useEffect(() => {
    if (activeTab === 'orders' || activeTab === 'dashboard') {
      setLoadingOrders(true)
      api.get('/orders')
        .then((res) => setOrders(res.data))
        .catch(() => {}) // axios interceptor already shows toast
        .finally(() => setLoadingOrders(false))
    }
  }, [activeTab])

  const totalRevenue = orders.reduce((acc, o) => acc + (o.totalPrice || 0), 0)

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="grid gap-8 xl:grid-cols-[280px,_1fr]">
        <aside className="rounded-[2rem] border border-[#22c622]/10 bg-white p-6 shadow-xl">
          <h2 className="text-xl font-semibold text-[#1E3A1A]">Admin dashboard</h2>
          <p className="mt-2 text-sm text-[#475569]">Manage products and orders with a premium branded admin view.</p>
          <div className="mt-8 space-y-3">
            {['dashboard', 'products', 'orders'].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`w-full rounded-3xl px-4 py-4 text-left text-sm font-semibold transition ${
                  activeTab === tab
                    ? 'bg-[#22c622] text-white'
                    : 'bg-[#FACC15]/10 text-[#1E3A1A] hover:bg-[#22c622]/10'
                }`}
              >
                {tab === 'dashboard' ? 'Overview' : tab === 'products' ? 'Product management' : 'Order management'}
              </button>
            ))}
          </div>
        </aside>

        <div className="space-y-8">
          {/* Stats cards — live data */}
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-[2rem] border border-[#22c622]/10 bg-[#22c622]/10 p-6 shadow-lg">
              <p className="text-sm uppercase tracking-[0.25em] text-[#22c622]/80">Revenue</p>
              <p className="mt-4 text-3xl font-semibold text-[#1E3A1A]">
                {loadingOrders ? '…' : `₹${totalRevenue.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`}
              </p>
            </div>
            <div className="rounded-[2rem] border border-[#22c622]/10 bg-white p-6 shadow-lg">
              <p className="text-sm uppercase tracking-[0.25em] text-[#22c622]/80">Orders</p>
              <p className="mt-4 text-3xl font-semibold text-[#1E3A1A]">{loadingOrders ? '…' : orders.length}</p>
            </div>
            <div className="rounded-[2rem] border border-[#22c622]/10 bg-white p-6 shadow-lg">
              <p className="text-sm uppercase tracking-[0.25em] text-[#22c622]/80">Products</p>
              <p className="mt-4 text-3xl font-semibold text-[#1E3A1A]">{loadingProducts ? '…' : products.length}</p>
            </div>
          </div>

          {activeTab === 'dashboard' && (
            <div className="rounded-[2rem] border border-[#22c622]/10 bg-white p-8 shadow-xl">
              <h3 className="text-2xl font-semibold text-[#1E3A1A]">Dashboard overview</h3>
              <p className="mt-4 text-sm leading-7 text-[#475569]">
                Metrics are updated in real time. Review products, orders, and stock levels to keep the storefront running smoothly.
              </p>
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                <div className="rounded-3xl bg-[#FACC15]/10 p-6">
                  <p className="text-sm uppercase tracking-[0.25em] text-[#22c622]/80">Low stock</p>
                  <p className="mt-4 text-xl font-semibold text-[#1E3A1A]">
                    {loadingProducts ? '…' : `${products.filter(p => (p.countInStock ?? p.stock ?? 0) < 10).length} items`}
                  </p>
                </div>
                <div className="rounded-3xl bg-[#FACC15]/10 p-6">
                  <p className="text-sm uppercase tracking-[0.25em] text-[#22c622]/80">Pending orders</p>
                  <p className="mt-4 text-xl font-semibold text-[#1E3A1A]">
                    {loadingOrders ? '…' : orders.filter(o => !o.isDelivered).length}
                  </p>
                </div>
                <div className="rounded-3xl bg-[#FACC15]/10 p-6">
                  <p className="text-sm uppercase tracking-[0.25em] text-[#22c622]/80">Paid orders</p>
                  <p className="mt-4 text-xl font-semibold text-[#1E3A1A]">
                    {loadingOrders ? '…' : orders.filter(o => o.isPaid).length}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="rounded-[2rem] border border-[#22c622]/10 bg-white p-8 shadow-xl">
              <h3 className="text-2xl font-semibold text-[#1E3A1A]">Product management</h3>
              {loadingProducts ? (
                <p className="mt-6 text-sm text-[#475569]">Loading products…</p>
              ) : (
                <div className="mt-8 overflow-hidden rounded-[1.75rem] border border-[#FACC15]/20">
                  <table className="min-w-full divide-y divide-[#FACC15]/30 text-left text-sm text-[#1E3A1A]">
                    <thead className="bg-[#FACC15]/10">
                      <tr>
                        <th className="px-6 py-4 font-semibold uppercase tracking-[0.18em]">Product</th>
                        <th className="px-6 py-4 font-semibold uppercase tracking-[0.18em]">Stock</th>
                        <th className="px-6 py-4 font-semibold uppercase tracking-[0.18em]">Price</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#FACC15]/30 bg-white">
                      {products.length === 0 ? (
                        <tr><td colSpan={3} className="px-6 py-5 text-[#475569]">No products found.</td></tr>
                      ) : products.map((product) => (
                        <tr key={product._id || product.id} className="hover:bg-[#22c622]/5 transition duration-200">
                          <td className="px-6 py-5 font-semibold text-[#1E3A1A]">{product.name || product.title}</td>
                          <td className="px-6 py-5">{product.countInStock ?? product.stock ?? '—'}</td>
                          <td className="px-6 py-5">₹{Number(product.price).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="rounded-[2rem] border border-[#22c622]/10 bg-white p-8 shadow-xl">
              <h3 className="text-2xl font-semibold text-[#1E3A1A]">Order management</h3>
              {loadingOrders ? (
                <p className="mt-6 text-sm text-[#475569]">Loading orders…</p>
              ) : (
                <div className="mt-8 overflow-hidden rounded-[1.75rem] border border-[#FACC15]/20">
                  <table className="min-w-full divide-y divide-[#FACC15]/30 text-left text-sm text-[#1E3A1A]">
                    <thead className="bg-[#FACC15]/10">
                      <tr>
                        <th className="px-6 py-4 font-semibold uppercase tracking-[0.18em]">Order ID</th>
                        <th className="px-6 py-4 font-semibold uppercase tracking-[0.18em]">Customer</th>
                        <th className="px-6 py-4 font-semibold uppercase tracking-[0.18em]">Total</th>
                        <th className="px-6 py-4 font-semibold uppercase tracking-[0.18em]">Paid</th>
                        <th className="px-6 py-4 font-semibold uppercase tracking-[0.18em]">Delivered</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#FACC15]/30 bg-white">
                      {orders.length === 0 ? (
                        <tr><td colSpan={5} className="px-6 py-5 text-[#475569]">No orders found.</td></tr>
                      ) : orders.map((order) => (
                        <tr key={order._id} className="hover:bg-[#22c622]/5 transition duration-200">
                          <td className="px-6 py-5 font-mono text-xs text-[#1E3A1A]">{order._id}</td>
                          <td className="px-6 py-5">{order.user?.name || '—'}</td>
                          <td className="px-6 py-5">₹{Number(order.totalPrice).toFixed(2)}</td>
                          <td className="px-6 py-5">
                            <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${order.isPaid ? 'bg-[#22c622]/20 text-[#1E3A1A]' : 'bg-red-100 text-red-700'}`}>
                              {order.isPaid ? 'Paid' : 'Unpaid'}
                            </span>
                          </td>
                          <td className="px-6 py-5">
                            <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${order.isDelivered ? 'bg-[#22c622]/20 text-[#1E3A1A]' : 'bg-[#FACC15]/30 text-[#1E3A1A]'}`}>
                              {order.isDelivered ? 'Delivered' : 'Pending'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Admin
