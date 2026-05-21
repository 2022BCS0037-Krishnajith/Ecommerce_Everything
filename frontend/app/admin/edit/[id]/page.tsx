"use client"

import { useEffect, useState } from "react"

import { useParams } from "next/navigation"

import axios from "axios"

import API from "../../../../services/api"

import toast from "react-hot-toast"

export default function EditProductPage() {

  const params = useParams()

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

    fetchProduct()

  }, [])

  const fetchProduct = async () => {

    try {

      const response =
        await API.get(
          `/products/${params.id}`
        )

      const product =
        response.data

      setName(product.name)

      setDescription(
        product.description
      )

      setPrice(product.price)

      setStock(product.stock)

      setCategory(product.category)

      setImageUrl(
        product.image_url
      )

    } catch (error) {

      console.log(error)

      toast.error(
        "Failed to load product"
      )
    }
  }

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
      "YOUR_UPLOAD_PRESET"
    )

    try {

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload",
        formData
      )

      setImageUrl(
        response.data.secure_url
      )

      toast.success("Image uploaded!")

    } catch (error) {

      console.log(error)

      toast.error("Upload failed")

    } finally {

      setUploading(false)
    }
  }

  const updateProduct = async () => {

    try {

      await API.put(
        `/products/${params.id}`,
        {

          name,
          description,
          price: Number(price),
          stock: Number(stock),
          category,
          image_url: imageUrl

        }
      )

      toast.success(
        "Product updated!"
      )

    } catch (error) {

      console.log(error)

      toast.error("Update failed")
    }
  }

  if (!authorized) {

    return null
  }

  return (

    <div className="p-10 max-w-xl">

      <h1 className="text-4xl font-bold mb-8">
        Edit Product
      </h1>

      <div className="flex flex-col gap-4">

        <input
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="border p-3 rounded"
          placeholder="Product Name"
        />

        <textarea
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          className="border p-3 rounded"
          placeholder="Description"
        />

        <input
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)
          }
          className="border p-3 rounded"
          placeholder="Price"
        />

        <input
          value={stock}
          onChange={(e) =>
            setStock(e.target.value)
          }
          className="border p-3 rounded"
          placeholder="Stock"
        />

        <input
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
          className="border p-3 rounded"
          placeholder="Category"
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
          onClick={updateProduct}
          className="bg-black text-white p-3 rounded"
        >
          Update Product
        </button>

      </div>

    </div>
  )
}