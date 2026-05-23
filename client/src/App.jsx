import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { CartProvider } from './context/CartContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'

import Checkout from './pages/Checkout'
import Payment from './pages/Payment'
import Admin from './pages/Admin'
import NotFound from './pages/NotFound'

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-white text-[#1E3A1A] selection:bg-[#FACC15] selection:text-[#1E3A1A]">
          <Toaster position="top-center" />
          <Navbar />
        <main className="pt-24">
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
        </main>
        <Footer />
      </div>
    </Router>
    </CartProvider>
  )
}

export default App
