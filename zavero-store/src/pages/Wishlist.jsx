import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  deleteWishlistItem,
  clearWishlist,
} from "../redux/slices/wishlistSlice";

import { addProductToCart } from "../redux/slices/cartSlice";

function Wishlist() {
  const dispatch = useDispatch();

  const wishlistItems = useSelector(
    (state) => state.wishlist.items
  );

  const cartItems = useSelector(
    (state) => state.cart.items
  );

  const user = useSelector(
    (state) => state.auth.user
  );

  const handleMoveToCart = (product) => {
    const existingItem = cartItems.find(
      (item) =>
        String(item.id) ===
        String(product.id)
    );

    if (product.stock <= 0) {
      return;
    }

    if (
      existingItem &&
      existingItem.quantity >= product.stock
    ) {
      alert(
        "Maximum available stock already in cart."
      );
      return;
    }

    dispatch(
      addProductToCart({
        userId: user.id,
        product,
        quantity: 1,
      })
    );

    dispatch(
      deleteWishlistItem(product.wishlistId)
    );
  };

  return (
    <div className="min-h-screen bg-[#f7f6f2] text-[#111111]">

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
              className="font-semibold"
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
              className="hover:opacity-50"
            >
              CART ({cartItems.length})
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

      <section className="py-20 md:py-28 px-6">

        <div className="max-w-7xl mx-auto">

          <p className="text-[10px] tracking-[0.45em] text-gray-500">
            ZAVERO / SAVED COLLECTION
          </p>

          <h1 className="text-5xl md:text-7xl font-light mt-5">
            WISHLIST
          </h1>

          <p className="text-sm text-gray-500 mt-5">
            {wishlistItems.length}{" "}
            {wishlistItems.length === 1
              ? "item"
              : "items"}{" "}
            saved
          </p>

        </div>

      </section>

      {wishlistItems.length === 0 ? (

        <section className="max-w-7xl mx-auto px-6 pb-32">

          <div className="border-t border-gray-300 pt-20 text-center">

            <p className="text-[10px] tracking-[0.3em] text-gray-500">
              YOUR WISHLIST IS EMPTY
            </p>

            <h2 className="text-3xl md:text-4xl font-light mt-5">
              Save something you love.
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

          <div className="flex justify-end mb-8">

            <button
              onClick={() =>
                dispatch(
                  clearWishlist(wishlistItems)
                )
              }
              className="text-[10px] tracking-[0.2em] underline hover:opacity-50"
            >
              CLEAR WISHLIST
            </button>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">

            {wishlistItems.map((product) => (

              <div key={product.id}>

                <Link
                  to={`/product/${product.id}`}
                >

                  <div className="h-[420px] bg-gray-100 overflow-hidden group">

                    <img
                      src={
                        product.image?.startsWith("http")
                          ? product.image
                          : `/${product.image}`
                      }
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                    />

                  </div>

                </Link>

                <div className="pt-5">

                  <p className="text-[10px] tracking-[0.25em] text-gray-400 uppercase">
                    {product.category}
                  </p>

                  <h2 className="text-sm mt-2">
                    {product.title}
                  </h2>

                  <p className="text-sm mt-3">
                    ₹{product.price}
                  </p>

                  <button
                    onClick={() =>
                      handleMoveToCart(product)
                    }
                    disabled={
                      product.stock <= 0
                    }
                    className="w-full mt-5 bg-black text-white py-3 text-[10px] tracking-[0.2em] hover:bg-gray-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    {product.stock > 0
                      ? "MOVE TO CART"
                      : "OUT OF STOCK"}
                  </button>

                  <button
                    onClick={() =>
                      dispatch(
                        deleteWishlistItem(
                          product.wishlistId
                        )
                      )
                    }
                    className="w-full mt-3 border border-black py-3 text-[10px] tracking-[0.2em] hover:bg-black hover:text-white transition"
                  >
                    REMOVE
                  </button>

                </div>

              </div>

            ))}

          </div>

        </section>

      )}

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

export default Wishlist;