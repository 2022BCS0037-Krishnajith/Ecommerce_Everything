"use client"

import { useState } from "react"
import API from "../../services/api"

export default function AdminPage() {

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [stock, setStock] = useState("")
  const [category, setCategory] = useState("")
  const [imageUrl, setImageUrl] = useState("")

  const createProduct = async () => {

    try {

      await API.post("/products/", {

        name,
        description,
        price: Number(price),
        stock: Number(stock),
        category,
        image_url: imageUrl

      })

      alert("Product created!")

    } catch (error) {

      console.log(error)

      alert("Failed")
    }
  }

  return (

    <div className="p-10 max-w-xl">

      <h1 className="text-4xl font-bold mb-8">
        Admin Dashboard
      </h1>

      <div className="flex flex-col gap-4">

        <input
          placeholder="Product Name"
          className="border p-2"
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          placeholder="Description"
          className="border p-2"
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          placeholder="Price"
          className="border p-2"
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          placeholder="Stock"
          className="border p-2"
          onChange={(e) => setStock(e.target.value)}
        />

        <input
          placeholder="Category"
          className="border p-2"
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          placeholder="Image URL"
          className="border p-2"
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <button
          onClick={createProduct}
          className="bg-black text-white p-3 rounded"
        >
          Create Product
        </button>

      </div>

    </div>
  )
}