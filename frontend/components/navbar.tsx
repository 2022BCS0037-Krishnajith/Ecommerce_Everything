"use client"

import Link from "next/link"
const logout = () => {

  localStorage.removeItem("token")

  window.location.href = "/login"
}

export default function Navbar() {

  return (

    <nav className="flex justify-between items-center p-4 border-b">

      <h1 className="text-2xl font-bold">
        Everything Store
      </h1>

      <div className="flex gap-6">

        <Link href="/">
          Home
        </Link>

        <Link href="/cart">
          Cart
        </Link>

        <Link href="/orders">
          Orders
        </Link>

        <Link href="/login">
          Login
        </Link>

        <Link href="/admin">
          Admin
        </Link>
        <button onClick={logout}>
          Logout
        </button>
        <Link href="/admin/products">
          Manage Products
        </Link>

      </div>

    </nav>
  )
}