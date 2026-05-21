"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

import API from "../../../services/api"

export default function ProductDetailPage() {

  const params = useParams()

  const [product, setProduct] = useState<any>(null)

  useEffect(() => {

    fetchProduct()

  }, [])

  const fetchProduct = async () => {

    try {

      const response = await API.get(
        `/products/${params.id}`
      )

      setProduct(response.data)

    } catch (error) {

      console.log(error)

    }
  }

  const addToCart = async () => {

    try {

      await API.post("/cart/add", {
        product_id: product.id,
        quantity: 1
      })

      alert("CARTL ITTUUU!")

    } catch (error) {

      console.log(error)

      alert("Login first")
    }
  }

  if (!product) {

    return <p className="p-10">Loading...</p>
  }

  return (

    <div className="p-10">

      <div className="border p-8 rounded max-w-2xl">

        <h1 className="text-4xl font-bold">
          {product.name}
        </h1>

        <p className="mt-6 text-lg">
          {product.description}
        </p>

        <p className="mt-6 text-2xl font-bold">
          ₹ {product.price}
        </p>

        <p className="mt-4">
          Stock: {product.stock}
        </p>

        <p className="mt-4">
          Category: {product.category}
        </p>

        <button
          onClick={addToCart}
          className="mt-8 bg-black text-white px-6 py-3 rounded"
        >
          Add To Cart
        </button>

      </div>

    </div>
  )
}