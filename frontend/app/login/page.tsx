"use client"

import { useState } from "react"
import API from "../../services/api"

export default function LoginPage() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async () => {

    try {

      const formData = new FormData()

      formData.append("username", email)
      formData.append("password", password)

      const response = await API.post(
        "/auth/login",
        formData
      )

      localStorage.setItem(
        "token",
        response.data.access_token
      )

      alert("Login successful!")

    } catch (error) {

      console.log(error)

      alert("Login failed")

    }
  }

  return (

    <div className="flex flex-col gap-4 p-10 max-w-md">

      <h1 className="text-3xl font-bold">
        Login
      </h1>

      <input
        type="email"
        placeholder="Email"
        className="border p-2"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="border p-2"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleLogin}
        className="bg-black text-white p-2 rounded"
      >
        Login
      </button>

    </div>
  )
}