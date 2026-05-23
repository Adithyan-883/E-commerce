import { createContext, useContext, useState, useMemo, useEffect } from 'react'

const CartContext = createContext(undefined)

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cart')
      return savedCart ? JSON.parse(savedCart) : []
    } catch (error) {
      console.error('Error loading cart from localStorage', error)
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cartItems))
    } catch (error) {
      console.error('Error saving cart to localStorage', error)
    }
  }, [cartItems])

  const addToCart = (product, quantity = 1) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id)
      const stockLimit = product.stock !== undefined ? product.stock : Infinity

      if (existingItem) {
        const newQuantity = Math.min(existingItem.quantity + quantity, stockLimit)
        return currentItems.map((item) =>
          item.id === product.id ? { ...item, quantity: newQuantity } : item
        )
      }
      return [...currentItems, { ...product, quantity: Math.min(quantity, stockLimit) }]
    })
  }

  const removeFromCart = (id) => {
    setCartItems((currentItems) => currentItems.filter((item) => item.id !== id))
  }

  const incrementQuantity = (id) => {
    setCartItems((currentItems) =>
      currentItems.map((item) => {
        if (item.id === id) {
          const stockLimit = item.stock !== undefined ? item.stock : Infinity
          return { ...item, quantity: Math.min(item.quantity + 1, stockLimit) }
        }
        return item
      })
    )
  }

  const decrementQuantity = (id) => {
    setCartItems((currentItems) =>
      currentItems.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item))
    )
  }

  const clearCart = () => {
    setCartItems([])
  }

  const cartCount = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }, [cartItems])

  const cartTotal = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }, [cartItems])

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
        cartCount,
        cartTotal,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
