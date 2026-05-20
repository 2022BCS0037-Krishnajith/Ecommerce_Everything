"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

import API from "../services/api"

export default function Home() {

  const [products, setProducts] = useState([])
  const [search, setSearch] = useState("")

  useEffect(() => {

    fetchProducts()

  }, [])

  const fetchProducts = async () => {

    try {

      const response = await API.get("/products")

      setProducts(response.data)

    } catch (error) {

      console.log(error)

    }
  }

  const addToCart = async (productId: number) => {

    try {

      await API.post("/cart/add", {
        product_id: productId,
        quantity: 1
      })

      alert("Added To Cart!")

    } catch (error) {

      console.log(error)

      alert("Please login first")
    }
  }
  const filteredProducts = products.filter(
  (product: any) =>
    product.name
      .toLowerCase()
      .includes(search.toLowerCase())
)

  return (

    <div className="p-10">

      <h1 className="text-4xl font-bold mb-10">
        Everything Store
      </h1>
      <input
        type="text"
        placeholder="Search products..."
        className="border p-3 rounded w-full mb-8"
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {filteredProducts.map((product: any) => (

          <div
            key={product.id}
            className="border rounded-xl shadow overflow-hidden hover:shadow-lg transition"
          >

            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-64 object-cover"
            />

            <div className="p-5">

              <Link href={`/products/${product.id}`}>

                <h2 className="text-2xl font-semibold hover:underline">
                  {product.name}
                </h2>

              </Link>

              <p className="mt-3 text-gray-600">
                {product.description}
              </p>

              <p className="mt-4 text-2xl font-bold">
                ₹ {product.price}
              </p>

              <p className="mt-2 text-sm text-gray-500">
                Stock: {product.stock}
              </p>

              <button
                onClick={() => addToCart(product.id)}
                className="mt-5 w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
              >
                Add To Cart
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  )
}