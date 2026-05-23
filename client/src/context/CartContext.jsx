import { createContext, useContext, useState, useMemo, useEffect } from 'react'
import { toast } from 'react-hot-toast'

const CartContext = createContext(undefined)

const toCartItem = (product) => {
  const defaultPack = !product.packLabel && product.packs?.length > 0 ? product.packs[0] : null
  const packLabel = product.packLabel || defaultPack?.label || ''
  const price = defaultPack?.price ?? product.price

  return {
    ...product,
    packLabel,
    price,
    cartKey: `${product.id}:${packLabel || 'standard'}`,
  }
}

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cart')
      return savedCart ? JSON.parse(savedCart).map(toCartItem) : []
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
    if (!Number.isInteger(quantity) || quantity <= 0) {
      toast.error('Invalid quantity value.')
      return
    }

    const itemToAdd = toCartItem(product)

    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.cartKey === itemToAdd.cartKey)
      const stock = itemToAdd.stock !== undefined ? Number(itemToAdd.stock) : Infinity
      const totalProductQty = currentItems
        .filter((item) => item.id === itemToAdd.id)
        .reduce((total, item) => total + item.quantity, 0)

      if (stock <= 0) {
        toast.error(`${itemToAdd.title} is currently out of stock.`)
        return currentItems
      }

      if (totalProductQty + quantity > stock) {
        toast.error(`Cannot add more. Only ${stock} items are available in stock.`)
        return currentItems
      }

      toast.success(`${itemToAdd.title} added to cart!`)
      if (existingItem) {
        return currentItems.map((item) =>
          item.cartKey === itemToAdd.cartKey
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }

      return [...currentItems, { ...itemToAdd, quantity }]
    })
  }

  const removeFromCart = (cartKey) => {
    setCartItems((currentItems) => currentItems.filter((item) => item.cartKey !== cartKey))
    toast.success('Item removed from cart.')
  }

  const incrementQuantity = (cartKey) => {
    setCartItems((currentItems) => {
      const selectedItem = currentItems.find((item) => item.cartKey === cartKey)
      if (!selectedItem) return currentItems

      const stock = selectedItem.stock !== undefined ? Number(selectedItem.stock) : Infinity
      const totalProductQty = currentItems
        .filter((item) => item.id === selectedItem.id)
        .reduce((total, item) => total + item.quantity, 0)

      if (totalProductQty >= stock) {
        toast.error(`Cannot increment. Only ${stock} items are available in stock.`)
        return currentItems
      }

      return currentItems.map((item) =>
        item.cartKey === cartKey ? { ...item, quantity: item.quantity + 1 } : item
      )
    })
  }

  const decrementQuantity = (cartKey) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.cartKey === cartKey
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
    )
  }

  const clearCart = () => {
    setCartItems([])
  }

  const cartCount = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }, [cartItems])

  const cartTotal = useMemo(() => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
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
