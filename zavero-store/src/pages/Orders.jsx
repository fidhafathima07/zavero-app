import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchOrders } from "../redux/slices/orderSlice";

function Orders() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const {
    orders,
    loading,
    error,
  } = useSelector((state) => state.orders);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchOrders(user.id));
    }
  }, [dispatch, user?.id]);

  /* LOADING */
  if (loading) {
    return (
      <div className="min-h-screen bg-[#f7f6f2] flex items-center justify-center">
        <p className="text-[10px] tracking-[0.3em]">
          LOADING ORDERS...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f6f2] text-[#111111]">

      {/* NAVBAR */}
      <nav className="border-b border-gray-200 bg-[#f7f6f2]">

        <div className="max-w-7xl mx-auto px-6 md:px-10 py-7 flex items-center justify-between">

          <Link
            to="/"
            className="text-2xl md:text-3xl font-semibold tracking-[0.3em]"
          >
            ZAVERO
          </Link>

          <div className="flex items-center gap-6 text-[10px] tracking-[0.2em]">

            <Link
              to="/shop"
              className="hover:opacity-50 transition"
            >
              SHOP
            </Link>

            <Link
              to="/cart"
              className="hover:opacity-50 transition"
            >
              CART
            </Link>

          </div>

        </div>

      </nav>

      {/* HEADER */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 pt-16 pb-10">

        <p className="text-[10px] tracking-[0.3em] text-gray-500">
          YOUR ZAVERO
        </p>

        <h1 className="text-4xl md:text-5xl font-light mt-4">
          My Orders
        </h1>

        {user && (
          <p className="text-sm text-gray-500 mt-4">
            Welcome, {user.name}
          </p>
        )}

      </section>

      {/* ORDERS */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 pb-20">

        {/* ERROR */}
        {error && (
          <div className="border border-red-200 bg-red-50 p-5 mb-8">
            <p className="text-sm text-red-600">
              {error}
            </p>
          </div>
        )}

        {/* EMPTY */}
        {orders.length === 0 ? (
          <div className="border border-gray-200 bg-white p-16 text-center">

            <p className="text-[10px] tracking-[0.3em] text-gray-400">
              NO ORDERS YET
            </p>

            <h2 className="text-3xl font-light mt-5">
              Start building your wardrobe.
            </h2>

            <Link
              to="/shop"
              className="inline-block mt-8 bg-black text-white px-10 py-4 text-[10px] tracking-[0.2em] hover:bg-gray-700 transition"
            >
              SHOP NOW
            </Link>

          </div>
        ) : (

          <div className="space-y-8">

            {orders.map((order) => {

              const orderItems = order.items || [];

              const totalQuantity = orderItems.reduce(
                (total, item) =>
                  total + item.quantity,
                0
              );

              return (
                <div
                  key={order.id}
                  className="bg-white border border-gray-200"
                >

                  {/* ORDER HEADER */}
                  <div className="p-6 border-b border-gray-200">

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

                      {/* ORDER ID */}
                      <div>
                        <p className="text-[10px] tracking-[0.2em] text-gray-400">
                          ORDER ID
                        </p>

                        <p className="text-sm mt-2">
                          #{order.id}
                        </p>
                      </div>

                      {/* DATE */}
                      <div>
                        <p className="text-[10px] tracking-[0.2em] text-gray-400">
                          DATE
                        </p>

                        <p className="text-sm mt-2">
                          {order.createdAt
                            ? new Date(
                                order.createdAt
                              ).toLocaleDateString()
                            : "—"}
                        </p>
                      </div>

                      {/* STATUS */}
                      <div>
                        <p className="text-[10px] tracking-[0.2em] text-gray-400">
                          STATUS
                        </p>

                        <p className="text-sm mt-2">
                          {order.status || "Placed"}
                        </p>
                      </div>

                      {/* TOTAL */}
                      <div>
                        <p className="text-[10px] tracking-[0.2em] text-gray-400">
                          TOTAL
                        </p>

                        <p className="text-sm mt-2">
                          ₹{order.total}
                        </p>
                      </div>

                    </div>

                  </div>

                  {/* ORDER INFORMATION */}
                  <div className="grid md:grid-cols-2 gap-8 p-6 border-b border-gray-200">

                    {/* ADDRESS */}
                    <div>

                      <p className="text-[10px] tracking-[0.2em] text-gray-400">
                        DELIVERY ADDRESS
                      </p>

                      <p className="text-sm mt-3 leading-6">
                        {order.address || "Address not available"}
                      </p>

                    </div>

                    {/* PAYMENT */}
                    <div>

                      <p className="text-[10px] tracking-[0.2em] text-gray-400">
                        PAYMENT METHOD
                      </p>

                      <p className="text-sm mt-3">
                        Cash on Delivery
                      </p>

                    </div>

                  </div>

                  {/* ITEMS */}
                  <div className="p-6">

                    <div className="flex justify-between items-center mb-6">

                      <p className="text-[10px] tracking-[0.2em] text-gray-400">
                        ORDER ITEMS
                      </p>

                      <p className="text-xs text-gray-500">
                        {totalQuantity} item
                        {totalQuantity !== 1 ? "s" : ""}
                      </p>

                    </div>

                    <div className="space-y-5">

                      {orderItems.map((item) => (

                        <div
                          key={item.id}
                          className="flex gap-5 items-center"
                        >

                          {/* IMAGE */}
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-20 h-24 object-cover"
                          />

                          {/* DETAILS */}
                          <div className="flex-1">

                            <h3 className="text-sm">
                              {item.title}
                            </h3>

                            <p className="text-xs text-gray-500 mt-2">
                              {item.category}
                            </p>

                            <p className="text-xs text-gray-500 mt-1">
                              Quantity: {item.quantity}
                            </p>

                          </div>

                          {/* PRICE */}
                          <div className="text-sm">

                            ₹{item.price * item.quantity}

                          </div>

                        </div>

                      ))}

                    </div>

                  </div>

                </div>
              );
            })}

          </div>

        )}

      </section>

      {/* FOOTER */}
      <footer className="bg-[#111111] text-white py-14 px-6 md:px-10">

        <div className="max-w-7xl mx-auto">

          <h2 className="text-2xl font-semibold tracking-[0.3em]">
            ZAVERO
          </h2>

          <p className="text-xs text-gray-400 mt-4">
            Modern menswear for everyday confidence.
          </p>

          <div className="border-t border-gray-700 mt-10 pt-6">

            <p className="text-[10px] text-gray-500 tracking-wide">
              © 2026 ZAVERO. ALL RIGHTS RESERVED.
            </p>

          </div>

        </div>

      </footer>

    </div>
  );
}

export default Orders;