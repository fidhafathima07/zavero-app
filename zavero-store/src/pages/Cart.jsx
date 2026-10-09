import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  changeCartQuantity,
  deleteCartItem,
  clearCart,
} from "../redux/slices/cartSlice";


function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector(
    (state) => state.cart.items
  );

  const loading = useSelector(
    (state) => state.cart.loading
  );

  const error = useSelector(
    (state) => state.cart.error
  );


  const totalItems = cartItems.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );


  const totalPrice = cartItems.reduce(
    (total, item) =>
      total +
      item.price * item.quantity,
    0
  );


  const handleIncrease = (item) => {
    if (item.quantity >= item.stock) {
      alert(
        `Only ${item.stock} items are available.`
      );
      return;
    }

    dispatch(
      changeCartQuantity({
        cartId: item.cartId,
        quantity: item.quantity + 1,
        stock: item.stock,
      })
    );
  };


  const handleDecrease = (item) => {
    if (item.quantity <= 1) {
      return;
    }

    dispatch(
      changeCartQuantity({
        cartId: item.cartId,
        quantity: item.quantity - 1,
        stock: item.stock,
      })
    );
  };


  const handleRemove = (item) => {
    dispatch(
      deleteCartItem(item.cartId)
    );
  };


  const handleClearCart = () => {
    dispatch(
      clearCart(cartItems)
    );
  };


  if (loading) {
    return (
      <div className="min-h-screen bg-[#f7f6f2] text-[#111111]">

        <div className="max-w-7xl mx-auto px-6 py-32 text-center">

          <p className="text-[10px] tracking-[0.3em]">
            LOADING CART...
          </p>

        </div>

      </div>
    );
  }


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

            <Link
              to="/"
              className="hover:opacity-50"
            >
              HOME
            </Link>

            <Link
              to="/shop"
              className="hover:opacity-50"
            >
              SHOP
            </Link>

            <Link
              to="/wishlist"
              className="hover:opacity-50"
            >
              WISHLIST
            </Link>

            <Link
              to="/about"
              className="hover:opacity-50"
            >
              ABOUT
            </Link>

          </div>


          <div className="flex items-center gap-5 text-[11px] tracking-[0.15em]">

            <Link
              to="/cart"
              className="font-semibold"
            >
              CART ({totalItems})
            </Link>

            <Link
              to="/login"
              className="hover:opacity-50"
            >
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

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">

            <div>

              <h1 className="text-5xl md:text-7xl font-light mt-5">
                CART
              </h1>

              <p className="text-sm text-gray-500 mt-5">
                {totalItems}{" "}
                {totalItems === 1
                  ? "item"
                  : "items"}{" "}
                selected
              </p>

            </div>


            {cartItems.length > 0 && (
              <button
                type="button"
                onClick={handleClearCart}
                className="text-[10px] tracking-[0.2em] underline hover:opacity-50"
              >
                CLEAR CART
              </button>
            )}

          </div>

        </div>

      </section>


      {/* ERROR */}

      {error && (
        <div className="max-w-7xl mx-auto px-6 pb-8">

          <p className="text-sm text-red-500">
            {error}
          </p>

        </div>
      )}


      {/* EMPTY CART */}

      {cartItems.length === 0 ? (

        <section className="max-w-7xl mx-auto px-6 pb-32">

          <div className="border-t border-gray-300 pt-20 text-center">

            <p className="text-[10px] tracking-[0.3em] text-gray-500">
              YOUR CART IS EMPTY
            </p>

            <h2 className="text-3xl md:text-4xl font-light mt-5">
              Nothing selected yet.
            </h2>

            <p className="text-sm text-gray-500 mt-5">
              Discover something from the ZAVERO collection.
            </p>

            <Link
              to="/shop"
              className="inline-block mt-8 bg-black text-white px-9 py-4 text-[10px] tracking-[0.25em] hover:bg-gray-700 transition"
            >
              EXPLORE COLLECTION
            </Link>

          </div>

        </section>

      ) : (

        <section className="max-w-7xl mx-auto px-6 pb-32">

          <div className="grid lg:grid-cols-[1fr_380px] gap-12">

            {/* CART ITEMS */}

            <div>

              <div className="border-t border-gray-300">

                {cartItems.map((item) => (

                  <div
                    key={item.cartId}
                    className="py-8 border-b border-gray-300"
                  >

                    <div className="grid grid-cols-[110px_1fr] md:grid-cols-[160px_1fr] gap-6">

                      {/* IMAGE */}

                      <Link
                        to={`/product/${item.id}`}
                      >

                        <div className="aspect-[3/4] bg-gray-100 overflow-hidden">

                          <img
                            src={
                              item.image?.startsWith(
                                "http"
                              )
                                ? item.image
                                : `/${item.image}`
                            }
                            alt={item.title}
                            className="w-full h-full object-cover hover:scale-105 transition duration-500"
                          />

                        </div>

                      </Link>


                      {/* DETAILS */}

                      <div className="flex flex-col justify-between">

                        <div>

                          <p className="text-[10px] tracking-[0.2em] text-gray-400 uppercase">
                            {item.category}
                          </p>

                          <Link
                            to={`/product/${item.id}`}
                          >

                            <h2 className="text-lg font-light mt-2 hover:opacity-60">
                              {item.title}
                            </h2>

                          </Link>

                          <p className="text-sm mt-3">
                            ₹{item.price}
                          </p>

                        </div>


                        <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

                          {/* QUANTITY */}

                          <div className="flex items-center border border-gray-300 w-fit">

                            <button
                              type="button"
                              onClick={() =>
                                handleDecrease(
                                  item
                                )
                              }
                              disabled={
                                item.quantity <= 1
                              }
                              className="px-4 py-3 text-sm disabled:opacity-30"
                            >
                              −
                            </button>

                            <span className="px-5 text-sm">
                              {item.quantity}
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                handleIncrease(
                                  item
                                )
                              }
                              disabled={
                                item.quantity >=
                                item.stock
                              }
                              className="px-4 py-3 text-sm disabled:opacity-30"
                            >
                              +
                            </button>

                          </div>


                          {/* REMOVE */}

                          <button
                            type="button"
                            onClick={() =>
                              handleRemove(item)
                            }
                            className="text-[10px] tracking-[0.2em] underline text-left"
                          >
                            REMOVE
                          </button>

                        </div>


                        <p className="text-[10px] text-gray-400 mt-4">
                          {item.stock}{" "}
                          AVAILABLE
                        </p>

                      </div>

                    </div>

                  </div>

                ))}

              </div>

            </div>


            {/* SUMMARY */}

            <div>

              <div className="border border-gray-300 p-7 sticky top-8">

                <p className="text-[10px] tracking-[0.3em] text-gray-500">
                  ORDER SUMMARY
                </p>

                <div className="border-t border-gray-300 mt-6 pt-6">

                  <div className="flex justify-between text-sm">

                    <span>
                      ITEMS
                    </span>

                    <span>
                      {totalItems}
                    </span>

                  </div>


                  <div className="flex justify-between text-sm mt-4">

                    <span>
                      SUBTOTAL
                    </span>

                    <span>
                      ₹{totalPrice}
                    </span>

                  </div>


                  <div className="flex justify-between text-sm mt-4">

                    <span>
                      SHIPPING
                    </span>

                    <span>
                      FREE
                    </span>

                  </div>

                </div>


                <div className="border-t border-gray-300 mt-6 pt-6">

                  <div className="flex justify-between">

                    <span className="text-sm">
                      TOTAL
                    </span>

                    <span className="text-lg">
                      ₹{totalPrice}
                    </span>

                  </div>

                </div>


                <button
                  type="button"
                  onClick={() =>
                    navigate("/checkout")
                  }
                  className="w-full mt-7 bg-black text-white py-4 text-[10px] tracking-[0.25em] hover:bg-gray-700 transition"
                >
                  PROCEED TO CHECKOUT
                </button>


                <Link
                  to="/shop"
                  className="block text-center mt-5 text-[10px] tracking-[0.2em] underline"
                >
                  CONTINUE SHOPPING
                </Link>

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