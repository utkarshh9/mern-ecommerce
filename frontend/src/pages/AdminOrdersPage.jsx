import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import { useSelector,} from "react-redux";

import { BASE_URL } from "../constants";


const AdminOrdersPage = () => {

  const [orders, setOrders] =
    useState([]);

  const {
    userInfo,
  } = useSelector(
    (state) => state.auth
  );


  const fetchOrders =
    async () => {

      try {

        const { data } =
          await axios.get(

            `${BASE_URL}/api/orders`,

            {
              headers: {

                Authorization:
                  `Bearer ${userInfo.token}`,
              },
            }
          );

        setOrders(data);

      } catch (error) {

        console.log(error);
      }
    };


  useEffect(() => {

    fetchOrders();

  }, []);


  const deliverHandler =
    async (id) => {

      try {

        await axios.put(

          `${BASE_URL}/api/orders/${id}/deliver`,

          {},

          {
            headers: {

              Authorization:
                `Bearer ${userInfo.token}`,
            },
          }
        );

        fetchOrders();

      } catch (error) {

        console.log(error);
      }
    };


  return (

    <div className="max-w-7xl mx-auto p-6">

      <h1 className="text-4xl font-bold mb-10">

        Manage Orders

      </h1>


      <div className="space-y-6">

        {orders.map((order) => (

          <div
            key={order._id}
            className="border rounded-2xl p-6 shadow"
          >

            <div className="flex justify-between items-start">

              <div>

                <h2 className="text-2xl font-bold">

                  {order.user.name}

                </h2>


                <p className="text-gray-500 mt-1">

                  {order.user.email}

                </p>


                <p className="mt-4 font-semibold">

                  ₹{order.totalPrice}

                </p>

              </div>


              <div className="text-right">

                <p
                  className={`font-bold text-lg ${
                    order.isPaid
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >

                  {order.isPaid
                    ? "Paid"
                    : "Unpaid"}

                </p>


                <p
                  className={`mt-2 font-bold ${
                    order.isDelivered
                      ? "text-green-600"
                      : "text-orange-500"
                  }`}
                >

                  {order.isDelivered
                    ? "Delivered"
                    : "Processing"}

                </p>

              </div>

            </div>


            {!order.isDelivered && (

              <button
                onClick={() =>
                  deliverHandler(
                    order._id
                  )
                }
                className="mt-6 bg-black text-white px-6 py-3 rounded-xl"
              >

                Mark Delivered

              </button>

            )}

          </div>
        ))}

      </div>

    </div>
  );
};

export default AdminOrdersPage;