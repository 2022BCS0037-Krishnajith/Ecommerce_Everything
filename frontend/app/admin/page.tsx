"use client"

import { useEffect, useState } from "react"

import axios from "axios"

import API from "../../services/api"

import toast from "react-hot-toast"

export default function AdminPage() {

  const [authorized, setAuthorized] =
    useState(false)

  const [name, setName] = useState("")

  const [description, setDescription] =
    useState("")

  const [price, setPrice] = useState("")

  const [stock, setStock] = useState("")

  const [category, setCategory] =
    useState("")

  const [imageUrl, setImageUrl] =
    useState("")

  const [uploading, setUploading] =
    useState(false)

  useEffect(() => {

    const user =
      localStorage.getItem("user")

    if (!user) {

      window.location.href = "/"

      return
    }

    const parsedUser =
      JSON.parse(user)

    if (!parsedUser.is_admin) {

      window.location.href = "/"

      return
    }

    setAuthorized(true)

  }, [])

  const uploadImage = async (
    e: any
  ) => {

    const file = e.target.files[0]

    if (!file) return

    setUploading(true)

    const formData = new FormData()

    formData.append("file", file)

    formData.append(
      "upload_preset",
      "Everything_store_upload"
    )

    try {

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dzyguukya/image/upload",
        formData
      )

      setImageUrl(
        response.data.secure_url
      )

      toast.success("Image uploaded!")

    } catch (error) {

      console.log(error)

      toast.error("Image upload failed")

    } finally {

      setUploading(false)
    }
  }

  const createProduct = async () => {

    if (!imageUrl) {

      toast.error(
        "Please upload image first"
      )

      return
    }

    try {

      await API.post("/products/", {

        name,
        description,
        price: Number(price),
        stock: Number(stock),
        category,
        image_url: imageUrl

      })

      toast.success("Product created!")

      setName("")
      setDescription("")
      setPrice("")
      setStock("")
      setCategory("")
      setImageUrl("")

    } catch (error) {

      console.log(error)

      toast.error(
        "Failed to create product"
      )
    }
  }

  if (!authorized) {

    return null
  }

  return (

    <div className="p-10 max-w-xl">

      <h1 className="text-4xl font-bold mb-8">
        Admin Dashboard
      </h1>

      <div className="flex flex-col gap-4">

        <input
          placeholder="Product Name"
          value={name}
          className="border p-3 rounded"
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <textarea
          placeholder="Description"
          value={description}
          className="border p-3 rounded"
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />

        <input
          placeholder="Price"
          value={price}
          className="border p-3 rounded"
          onChange={(e) =>
            setPrice(e.target.value)
          }
        />

        <input
          placeholder="Stock"
          value={stock}
          className="border p-3 rounded"
          onChange={(e) =>
            setStock(e.target.value)
          }
        />

        <input
          placeholder="Category"
          value={category}
          className="border p-3 rounded"
          onChange={(e) =>
            setCategory(e.target.value)
          }
        />

        <input
          type="file"
          onChange={uploadImage}
          className="border p-3 rounded"
        />

        {uploading && (

          <p>
            Uploading image...
          </p>
        )}

        {imageUrl && (

          <img
            src={imageUrl}
            className="w-40 rounded mt-4"
          />
        )}

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