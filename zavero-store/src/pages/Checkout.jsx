
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { clearCart } from "../redux/slices/cartSlice";
import { placeOrder } from "../redux/slices/orderSlice";

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [address, setAddress] = useState("");

  const cartItems = useSelector(
    (state) => state.cart.items
  );

  const user = useSelector(
    (state) => state.auth.user
  );

  const orderLoading = useSelector(
    (state) => state.orders.loading
  );

  const totalPrice = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const totalItems = cartItems.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    // CHECK CART
    if (cartItems.length === 0) {
      alert("Your cart is empty");
      return;
    }

    if (!user) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    if (!address.trim()) {
      alert("Please enter your delivery address");
      return;
    }

    // CHECK STOCK
    for (const item of cartItems) {
      if (item.quantity > item.stock) {
        alert(
          `${item.title} has only ${item.stock} items available.`
        );
        return;
      }
    }

    const order = {
      userId: user.id,
      items: cartItems,
      total: totalPrice,
      address: address.trim(),
      paymentMethod: "Cash on Delivery",
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    try {
      // SAVE ORDER
      await dispatch(
        placeOrder(order)
      ).unwrap();

      dispatch(clearCart());

      alert("Order placed successfully!");

      navigate("/orders");

    } catch (error) {
      console.error(error);

      alert(
        typeof error === "string"
          ? error
          : "Failed to place order"
      );
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#f7f6f2] flex items-center justify-center px-6">
        <div className="text-center">

          <p className="text-[10px] tracking-[0.3em] text-gray-500">
            YOUR CART IS EMPTY
          </p>

          <h1 className="text-4xl font-light mt-5">
            Nothing to checkout
          </h1>

          <Link
            to="/shop"
            className="inline-block mt-8 bg-black text-white px-10 py-4 text-[10px] tracking-[0.2em] hover:bg-gray-700 transition"
          >
            CONTINUE SHOPPING
          </Link>

        </div>
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

          <Link
            to="/cart"
            className="text-[10px] tracking-[0.2em] hover:opacity-50 transition"
          >
            BACK TO CART
          </Link>

        </div>

      </nav>

      <section className="max-w-7xl mx-auto px-6 md:px-10 pt-16">

        <p className="text-[10px] tracking-[0.3em] text-gray-500">
          ZAVERO CHECKOUT
        </p>

        <h1 className="text-4xl md:text-5xl font-light mt-4">
          Complete Your Order
        </h1>

      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-10 py-14">

        <div className="grid lg:grid-cols-2 gap-12">

          <div>

            <h2 className="text-xl font-medium">
              Customer Details
            </h2>

            <div className="mt-8 space-y-6">

              <div>

                <label className="text-[10px] tracking-[0.2em]">
                  NAME
                </label>

                <input
                  type="text"
                  value={user?.name || ""}
                  readOnly
                  className="w-full mt-2 border border-gray-300 bg-white px-4 py-4 outline-none"
                />

              </div>

              <div>

                <label className="text-[10px] tracking-[0.2em]">
                  EMAIL
                </label>

                <input
                  type="email"
                  value={user?.email || ""}
                  readOnly
                  className="w-full mt-2 border border-gray-300 bg-white px-4 py-4 outline-none"
                />

              </div>

              <div>

                <label className="text-[10px] tracking-[0.2em]">
                  DELIVERY ADDRESS
                </label>

                <textarea
                  rows="5"
                  value={address}
                  onChange={(e) =>
                    setAddress(e.target.value)
                  }
                  placeholder="Enter your complete delivery address"
                  className="w-full mt-2 border border-gray-300 bg-white px-4 py-4 outline-none resize-none"
                />

              </div>

              <div>

                <label className="text-[10px] tracking-[0.2em]">
                  PAYMENT METHOD
                </label>

                <div className="mt-2 border border-gray-300 bg-white px-4 py-4">
                  Cash on Delivery
                </div>

              </div>

            </div>

          </div>

          {/* ORDER SUMMARY */}
          <div>

            <h2 className="text-xl font-medium">
              Order Summary
            </h2>

            <div className="mt-8 border border-gray-300 bg-white">

              {cartItems.map((item) => (

                <div
                  key={item.id}
                  className="flex gap-5 p-5 border-b border-gray-200"
                >

                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-24 object-cover"
                  />

                  <div className="flex-1">

                    <h3 className="text-sm">
                      {item.title}
                    </h3>

                    <p className="text-xs text-gray-500 mt-2">
                      Category: {item.category}
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      Quantity: {item.quantity}
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      Available Stock: {item.stock}
                    </p>

                    <p className="text-sm mt-3">
                      ₹{item.price * item.quantity}
                    </p>

                  </div>

                </div>

              ))}

              <div className="p-6">

                <div className="flex justify-between text-sm">
                  <span>Total Items</span>
                  <span>{totalItems}</span>
                </div>

                <div className="flex justify-between text-sm mt-4">
                  <span>Subtotal</span>
                  <span>₹{totalPrice}</span>
                </div>

                <div className="flex justify-between text-sm mt-4">
                  <span>Delivery</span>
                  <span>FREE</span>
                </div>

                <div className="border-t border-gray-300 mt-6 pt-5 flex justify-between text-lg">

                  <span>Total</span>

                  <span>
                    ₹{totalPrice}
                  </span>

                </div>

                <button
                  onClick={handlePlaceOrder}
                  disabled={orderLoading}
                  className="w-full bg-black text-white py-5 mt-7 text-[10px] tracking-[0.25em] hover:bg-gray-700 transition disabled:bg-gray-400"
                >
                  {orderLoading
                    ? "PLACING ORDER..."
                    : "PLACE ORDER"}
                </button>

              </div>

            </div>

          </div>

        </div>

      </section>

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

export default Checkout;
