import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  removeFromCart,
  updateQuantity,
} from "../redux/slices/cartSlice";

function Cart() {
  const dispatch = useDispatch();

  const cartItems = useSelector(
    (state) => state.cart.items
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

  const increaseQuantity = (item) => {
    if (item.quantity < item.stock) {
      dispatch(
        updateQuantity({
          id: item.id,
          quantity: item.quantity + 1,
        })
      );
    }
  };

  const decreaseQuantity = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({
          id: item.id,
          quantity: item.quantity - 1,
        })
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f6f2] text-[#111111]">

      {/* NAVBAR */}
      <nav className="bg-[#f7f6f2] border-b border-gray-200">

        <div className="max-w-7xl mx-auto px-6 md:px-10 py-7 flex items-center justify-between">

          <Link
            to="/"
            className="text-2xl md:text-3xl font-semibold tracking-[0.3em]"
          >
            ZAVERO
          </Link>

          <div className="hidden md:flex items-center gap-10 text-[11px] tracking-[0.2em]">

            <Link to="/" className="hover:opacity-50">
              HOME
            </Link>

            <Link to="/shop" className="hover:opacity-50">
              SHOP
            </Link>

            <Link to="/wishlist" className="hover:opacity-50">
              WISHLIST
            </Link>

            <Link to="/about" className="hover:opacity-50">
              ABOUT
            </Link>

            <Link to="/contact" className="hover:opacity-50">
              CONTACT
            </Link>

          </div>

          <div className="flex items-center gap-5 text-[11px] tracking-[0.15em]">

            <Link
              to="/cart"
              className="font-semibold"
            >
              CART ({cartItems.length})
            </Link>

            <Link to="/login">
              LOGIN
            </Link>

          </div>

        </div>

      </nav>

      {/* HEADER */}
      <section className="py-20 md:py-28 px-6">

        <div className="max-w-7xl mx-auto">

          <p className="text-[10px] tracking-[0.45em] text-gray-500">
            ZAVERO / YOUR SELECTION
          </p>

          <h1 className="text-5xl md:text-7xl font-light mt-5">
            YOUR CART
          </h1>

          <p className="text-sm text-gray-500 mt-5">
            {totalItems}{" "}
            {totalItems === 1 ? "item" : "items"}{" "}
            in your cart
          </p>

        </div>

      </section>

      {/* EMPTY CART */}
      {cartItems.length === 0 ? (

        <section className="max-w-7xl mx-auto px-6 pb-32">

          <div className="border-t border-gray-300 pt-20 text-center">

            <p className="text-[10px] tracking-[0.3em] text-gray-500">
              YOUR CART IS EMPTY
            </p>

            <h2 className="text-3xl md:text-4xl font-light mt-5">
              Nothing here yet.
            </h2>

            <p className="text-sm text-gray-500 mt-5">
              Discover something from the ZAVERO collection.
            </p>

            <Link
              to="/shop"
              className="inline-block mt-8 bg-black text-white px-9 py-4 text-[10px] tracking-[0.25em]"
            >
              CONTINUE SHOPPING
            </Link>

          </div>

        </section>

      ) : (

        <section className="max-w-7xl mx-auto px-6 pb-32">

          <div className="grid lg:grid-cols-3 gap-12">

            {/* CART ITEMS */}
            <div className="lg:col-span-2">

              <div className="border-t border-gray-300">

                {cartItems.map((item) => (

                  <div
                    key={item.id}
                    className="py-8 border-b border-gray-300 flex flex-col sm:flex-row gap-6"
                  >

                    {/* IMAGE */}
                    <div className="w-full sm:w-40 h-52 bg-gray-100 overflow-hidden">

                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />

                    </div>

                    {/* DETAILS */}
                    <div className="flex-1">

                      <p className="text-[10px] tracking-[0.25em] text-gray-400 uppercase">
                        {item.category}
                      </p>

                      <h2 className="text-lg font-light mt-2">
                        {item.title}
                      </h2>

                      <p className="text-sm mt-3">
                        ₹{item.price}
                      </p>

                      {/* QUANTITY */}
                      <div className="flex items-center mt-7">

                        <p className="text-[10px] tracking-[0.2em] mr-5">
                          QUANTITY
                        </p>

                        <div className="flex items-center border border-gray-400">

                          <button
                            onClick={() =>
                              decreaseQuantity(item)
                            }
                            className="w-9 h-9 hover:bg-black hover:text-white"
                          >
                            −
                          </button>

                          <span className="w-10 text-center text-sm">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              increaseQuantity(item)
                            }
                            disabled={
                              item.quantity >= item.stock
                            }
                            className="w-9 h-9 hover:bg-black hover:text-white disabled:opacity-30"
                          >
                            +
                          </button>

                        </div>

                      </div>

                      {/* REMOVE */}
                      <button
                        onClick={() =>
                          dispatch(
                            removeFromCart(item.id)
                          )
                        }
                        className="text-[10px] tracking-[0.2em] underline mt-6"
                      >
                        REMOVE
                      </button>

                    </div>

                    {/* ITEM TOTAL */}
                    <div className="sm:text-right">

                      <p className="text-sm">
                        ₹{item.price * item.quantity}
                      </p>

                    </div>

                  </div>

                ))}

              </div>

            </div>

            {/* ORDER SUMMARY */}
            <div>

              <div className="bg-white p-8 sticky top-8">

                <p className="text-[10px] tracking-[0.3em] text-gray-500">
                  ORDER SUMMARY
                </p>

                <div className="border-t border-gray-200 mt-6 pt-6">

                  <div className="flex justify-between text-sm">
                    <span>ITEMS</span>
                    <span>{totalItems}</span>
                  </div>

                  <div className="flex justify-between text-sm mt-5">
                    <span>SUBTOTAL</span>
                    <span>₹{totalPrice}</span>
                  </div>

                  <div className="flex justify-between text-sm mt-5">
                    <span>SHIPPING</span>
                    <span>FREE</span>
                  </div>

                  <div className="border-t border-gray-200 mt-6 pt-6 flex justify-between">

                    <span className="text-[11px] tracking-[0.2em]">
                      TOTAL
                    </span>

                    <span className="text-lg">
                      ₹{totalPrice}
                    </span>

                  </div>

                  <Link
                    to="/checkout"
                    className="block text-center bg-black text-white py-4 mt-8 text-[10px] tracking-[0.25em]"
                  >
                    PROCEED TO CHECKOUT
                  </Link>

                  <Link
                    to="/shop"
                    className="block text-center border border-black py-4 mt-4 text-[10px] tracking-[0.25em]"
                  >
                    CONTINUE SHOPPING
                  </Link>

                </div>

              </div>

            </div>

          </div>

        </section>

      )}

      {/* FOOTER */}
      <footer className="bg-[#111111] text-white py-16 px-6">

        <div className="max-w-7xl mx-auto">

          <h2 className="text-2xl font-semibold tracking-[0.3em]">
            ZAVERO
          </h2>

          <p className="text-xs text-gray-400 mt-4">
            Modern menswear for everyday confidence.
          </p>

          <div className="border-t border-gray-700 mt-12 pt-6">

            <p className="text-[10px] text-gray-500">
              © 2026 ZAVERO. ALL RIGHTS RESERVED.
            </p>

          </div>

        </div>

      </footer>

    </div>
  );
}

export default Cart;