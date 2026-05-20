"use client"

import { useEffect, useState } from "react"

import API from "../../../services/api"

import toast from "react-hot-toast"
import Link from "next/link"

export default function AdminProductsPage() {

  const [products, setProducts] = useState([])

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

  const deleteProduct = async (
    productId: number
  ) => {

    try {

      await API.delete(
        `/products/${productId}`
      )

      toast.success("Product deleted")

      fetchProducts()

    } catch (error) {

      console.log(error)

      toast.error("Delete failed")
    }
  }

  return (

    <div className="p-10">

      <h1 className="text-4xl font-bold mb-8">
        Manage Products
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {products.map((product: any) => (

          <div
            key={product.id}
            className="border rounded shadow overflow-hidden"
          >

            <img
              src={product.image_url}
              className="w-full h-64 object-cover"
            />

            <div className="p-4">

              <h2 className="text-2xl font-bold">
                {product.name}
              </h2>

              <p className="mt-2">
                ₹ {product.price}
              </p>
            <Link href={`/admin/edit/${product.id}`}>

              <button
                className="mt-4 mr-3 bg-blue-500 text-white px-4 py-2 rounded"
              >
                Edit
             </button>

            </Link>

              <button
                onClick={() =>
                  deleteProduct(product.id)
                }
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  )
}