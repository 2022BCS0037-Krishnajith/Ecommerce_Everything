"use client"

import { useEffect, useState } from "react"
import API from "../../services/api"

export default function OrdersPage() {

  const [orders, setOrders] = useState([])

  useEffect(() => {

    fetchOrders()

  }, [])

  const fetchOrders = async () => {

    try {

      const response = await API.get("/orders")

      setOrders(response.data)

    } catch (error) {

      console.log(error)

    }
  }

  return (

    <div className="p-10">

      <h1 className="text-4xl font-bold mb-8">
        My Orders
      </h1>

      {orders.map((order: any) => (

        <div
          key={order.id}
          className="border p-4 mb-4 rounded"
        >

          <p>
            Order ID: {order.id}
          </p>

          <p>
            Total: ₹ {order.total_price}
          </p>

        </div>

      ))}

    </div>
  )
}