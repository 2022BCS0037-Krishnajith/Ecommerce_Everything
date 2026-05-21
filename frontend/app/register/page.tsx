"use client"

import { useState } from "react"

import API from "../../services/api"

import toast from "react-hot-toast"

export default function RegisterPage() {

  const [username, setUsername] =
    useState("")

  const [email, setEmail] =
    useState("")

  const [password, setPassword] =
    useState("")

  const register = async () => {

    try {

      await API.post(
        "/auth/register",
        {

          username,
          email,
          password
        }
      )

      toast.success(
        "Registration successful!"
      )

      setTimeout(() => {

        window.location.href = "/login"

      }, 1500)
    } catch (error: any) {

      console.log(error)

      toast.error(

        error.response?.data?.detail ||

        "Registration failed"
      )
    }
  }

  return (

    <div className="p-10 max-w-md mx-auto">

      <h1 className="text-4xl font-bold mb-8">
        Register
      </h1>

      <div className="flex flex-col gap-4">

        <input
          placeholder="Username"
          className="border p-3 rounded"
          onChange={(e) =>
            setUsername(
              e.target.value
            )
          }
        />

        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded"
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded"
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
        />

        <button
          onClick={register}
          className="bg-black text-white p-3 rounded"
        >
          Register
        </button>

      </div>

    </div>
  )
}