"use client"

import { useEffect, useState } from "react"

import API from "../../../services/api"

export default function AdminOrdersPage() {

  const [orders, setOrders] =
    useState([])

  useEffect(() => {

    fetchOrders()

  }, [])

  const fetchOrders = async () => {

    try {

      const response =
        await API.get("/orders/all")

      setOrders(response.data)

    } catch (error) {

      console.log(error)
    }
  }

  return (

    <div className="p-10">

      <h1 className="text-4xl font-bold mb-8">
        All Orders
      </h1>

      <div className="flex flex-col gap-6">

        {orders.map((order: any) => (

          <div
            key={order.id}
            className="border p-6 rounded"
          >

            <h2 className="text-2xl font-bold">
              Order #{order.id}
            </h2>

            <p className="mt-2">
              User ID: {order.user_id}
            </p>

            <p className="mt-2">
              Total: ₹ {order.total_price}
            </p>

          </div>
        ))}

      </div>

    </div>
  )
}