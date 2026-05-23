import React, { Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { CartProvider } from './context/CartContext'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import Loader from './components/common/Loader'

// Lazy loaded pages
const Home = React.lazy(() => import('./pages/Home'))
const Products = React.lazy(() => import('./pages/Products'))
const ProductDetails = React.lazy(() => import('./pages/ProductDetails'))
const Cart = React.lazy(() => import('./pages/Cart'))
const Checkout = React.lazy(() => import('./pages/Checkout'))
const Payment = React.lazy(() => import('./pages/Payment'))
const Admin = React.lazy(() => import('./pages/Admin'))
const NotFound = React.lazy(() => import('./pages/NotFound'))

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-white text-[#1E3A1A] selection:bg-[#FACC15] selection:text-[#1E3A1A]">
          <Toaster position="top-center" />
          <Navbar />
        <main className="pt-24 min-h-[80vh]">
          <Suspense fallback={<div className="flex min-h-[50vh] items-center justify-center"><Loader /></div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
    </CartProvider>
  )
}

export default App
