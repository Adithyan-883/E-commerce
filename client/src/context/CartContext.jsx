import { createContext, useContext, useState, useMemo, useEffect } from 'react'
import { toast } from 'react-hot-toast'

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
    // Validate quantity is valid and positive
    if (typeof quantity !== 'number' || isNaN(quantity) || quantity <= 0) {
      toast.error('Invalid quantity value.');
      return;
    }

    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id)
      const stock = product.stock !== undefined ? Number(product.stock) : Infinity
      const currentQty = existingItem ? existingItem.quantity : 0

      if (stock <= 0) {
        toast.error(`${product.title} is currently out of stock.`);
        return currentItems;
      }

      if (currentQty + quantity > stock) {
        toast.error(`Cannot add more. Only ${stock} items available in stock.`);
        
        // Cap the item quantity at the maximum available stock
        const cappedQty = stock;
        if (existingItem) {
          return currentItems.map((item) =>
            item.id === product.id ? { ...item, quantity: cappedQty } : item
          )
        }
        return [...currentItems, { ...product, quantity: cappedQty }]
      }

      toast.success(`${product.title} added to cart!`);
      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id ? { ...item, quantity: currentQty + quantity } : item
        )
      }
      return [...currentItems, { ...product, quantity }]
    })
  }

  const removeFromCart = (id) => {
    setCartItems((currentItems) => currentItems.filter((item) => item.id !== id))
    toast.success('Item removed from cart.');
  }

  const incrementQuantity = (id) => {
    setCartItems((currentItems) =>
      currentItems.map((item) => {
        if (item.id === id) {
          const stock = item.stock !== undefined ? Number(item.stock) : Infinity
          if (item.quantity >= stock) {
            toast.error(`Cannot increment. Only ${stock} items available in stock.`);
            return item;
          }
          return { ...item, quantity: item.quantity + 1 }
        }
        return item
      })
    )
  }

  const decrementQuantity = (id) => {
    setCartItems((currentItems) =>
      currentItems.map((item) => {
        if (item.id === id) {
          // Quantities cannot go below 1
          return { ...item, quantity: Math.max(1, item.quantity - 1) }
        }
        return item;
      })
    )
  }

  const clearCart = () => {
    setCartItems([])
  }

  const cartCount = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const qty = typeof item.quantity === 'number' && !isNaN(item.quantity) ? item.quantity : 0;
      return total + qty;
    }, 0)
  }, [cartItems])

  const cartTotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const price = typeof item.price === 'number' && !isNaN(item.price) ? item.price : 0;
      const qty = typeof item.quantity === 'number' && !isNaN(item.quantity) ? item.quantity : 0;
      return total + price * qty;
    }, 0)
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

