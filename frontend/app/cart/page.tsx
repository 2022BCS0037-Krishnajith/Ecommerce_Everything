"use client"

import { useEffect, useState } from "react"

import API from "../../services/api"

export default function CartPage() {

  const [cart, setCart] = useState([])

  useEffect(() => {

    fetchCart()

  }, [])

  const fetchCart = async () => {

    try {

      const response = await API.get("/cart")

      setCart(response.data)

    } catch (error) {

      console.log(error)
    }
  }

  const removeItem = async (cartId: number) => {

    try {

      await API.delete(
        `/cart/remove/${cartId}`
      )

      fetchCart()

    } catch (error) {

      console.log(error)
    }
  }

  const checkout = async () => {

    try {

      const response = await API.post(
        "/orders/checkout"
      )

      alert(
        `Order placed! Total ₹ ${response.data.total_price}`
      )

      fetchCart()

    } catch (error) {

      console.log(error)

      alert("Checkout failed")
    }
  }

  return (

    <div className="p-10">

      <h1 className="text-4xl font-bold mb-8">
        My Cart
      </h1>

      {cart.length === 0 && (

        <p className="text-lg">
          Cart is empty
        </p>
      )}

      {cart.map((item: any) => (

        <div
          key={item.id}
          className="border p-4 mb-4 rounded flex gap-4 items-center shadow"
        >

          <img
            src={item.product.image_url}
            className="w-32 h-32 object-cover rounded"
          />

          <div>

            <h2 className="text-2xl font-bold">
              {item.product.name}
            </h2>

            <p className="mt-2">
              Quantity: {item.quantity}
            </p>

            <p className="mt-2 font-bold text-xl">
              ₹ {item.product.price}
            </p>

            <button
              onClick={() => removeItem(item.id)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Remove
            </button>

          </div>

        </div>

      ))}

      {cart.length > 0 && (

        <button
          onClick={checkout}
          className="mt-6 bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition"
        >
          Checkout
        </button>

      )}

    </div>
  )
}