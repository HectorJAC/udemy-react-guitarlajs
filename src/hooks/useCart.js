import { useEffect, useState, useMemo } from "react"
import { db } from '../data/db'

export const useCart = () => {
  const initialCart = JSON.parse(localStorage.getItem('cart')) || []

  const [data, setData] = useState([])
  const [cart, setCart] = useState(initialCart)

  useEffect(() => {
    setData(db)
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (item) => {
    setCart((prevCart) => {
      const itemExist = prevCart.findIndex((i) => i.id === item.id)
      if (itemExist >= 0) {
        return prevCart.map((product, index) =>
          index === itemExist && product.quantity < 5
            ? { ...product, quantity: product.quantity + 1 }
            : product
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }]
      }
    })
  }

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id))
  }

  const increaseQuantity = (id) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity < 5) {
        return {
          ...item,
          quantity: item.quantity + 1
        }
      }
      return item
    })
    setCart(updatedCart)
  }

  const decrementQuantity = (id) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity > 1) {
        return {
          ...item,
          quantity: item.quantity - 1
        }
      }
      return item
    })
    setCart(updatedCart)
  }

  const clearCart = () => {
    setCart([])
  }

  const carTotal = useMemo(() => cart.reduce((acc, item) => acc + (item.quantity * item.price), 0), [cart])

  return {
    data,
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decrementQuantity,
    clearCart,
    carTotal
  }
}