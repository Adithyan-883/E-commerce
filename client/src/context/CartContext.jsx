import { createContext, useContext, useState, useMemo } from 'react'

const CartContext = createContext(undefined)

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])

  const addToCart = (product, quantity = 1) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id)
      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        )
      }
      return [...currentItems, { ...product, quantity }]
    })
  }

  const removeFromCart = (id) => {
    setCartItems((currentItems) => currentItems.filter((item) => item.id !== id))
  }

  const incrementQuantity = (id) => {
    setCartItems((currentItems) =>
      currentItems.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
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
