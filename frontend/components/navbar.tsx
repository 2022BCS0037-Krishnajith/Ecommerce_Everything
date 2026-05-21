"use client"

import Link from "next/link"

import { useEffect, useState } from "react"

export default function Navbar() {

  const [isAdmin, setIsAdmin] =
    useState(false)

  const [loggedIn, setLoggedIn] =
    useState(false)

  useEffect(() => {

    const token =
      localStorage.getItem("token")

    const user =
      localStorage.getItem("user")

    if (token) {

      setLoggedIn(true)
    }

    if (user) {

      const parsedUser =
        JSON.parse(user)

      setIsAdmin(
        parsedUser.is_admin
      )
    }

  }, [])

  const logout = () => {

    localStorage.removeItem("token")

    localStorage.removeItem("user")

    window.location.href = "/login"
  }

  return (

    <nav className="flex justify-between items-center p-4 border-b">

      <h1 className="text-2xl font-bold">
        E-Commerce
      </h1>

      <div className="flex gap-6 items-center">

        <Link href="/">
          Home
        </Link>

        {loggedIn && (

          <>
            <Link href="/cart">
              Cart
            </Link>

            <Link href="/orders">
              Orders
            </Link>
          </>
        )}

        {isAdmin && (

          <>
            <Link href="/admin">
              Admin
            </Link>

            <Link href="/admin/products">
              Manage Products
            </Link>
          </>
        )}

        {!loggedIn ? (

          <Link href="/login">
            Login
          </Link>

        ) : (

          <button onClick={logout}>
            Logout
          </button>

        )}

      </div>

    </nav>
  )
}