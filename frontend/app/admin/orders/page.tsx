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

            <p className="mt-2 font-bold">
              Total: ₹ {order.total_price}
            </p>

            <div className="mt-4">

              <h3 className="font-bold text-lg">
                Products
              </h3>

              <div className="mt-2 flex flex-col gap-2">

                {order.items.map(
                  (
                    item: any,
                    index: number
                  ) => (

                  <div
                    key={index}
                    className="border p-3 rounded"
                  >

                    <p>
                      Product:
                      {" "}
                      {item.product_name}
                    </p>

                    <p>
                      Quantity:
                      {" "}
                      {item.quantity}
                    </p>

                    <p>
                      Price:
                      {" "}
                      ₹ {item.price}
                    </p>

                  </div>
                ))}

              </div>

            </div>

          </div>
        ))}

      </div>

    </div>
  )
}