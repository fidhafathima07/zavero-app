
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "../components/Navbar";

import { addToCart } from "../redux/slices/cartSlice";

import {
  addToWishlist,
  removeFromWishlist,
} from "../redux/slices/wishlistSlice";

function ProductDetails() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // PRODUCTS FROM REDUX
  const products = useSelector(
    (state) => state.products.products
  );

  // LOGIN STATUS
  const isLoggedIn = useSelector(
    (state) => state.auth.isLoggedIn
  );

  // WISHLIST FROM REDUX
  const wishlistItems = useSelector(
    (state) => state.wishlist.items
  );

  // FIND CURRENT PRODUCT
  const product = products.find(
    (item) => String(item.id) === String(id)
  );

  // CHECK WISHLIST
  const isWishlisted = wishlistItems.some(
    (item) => item.id === product?.id
  );

  // QUANTITY
  const [quantity, setQuantity] = useState(1);

  // RESET QUANTITY WHEN PRODUCT CHANGES
  useEffect(() => {
    setQuantity(1);
  }, [id]);

  // INCREASE QUANTITY
  const handleIncrease = () => {
    if (product && quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  // DECREASE QUANTITY
  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // ADD TO CART
  const handleAddToCart = () => {

    // LOGIN CHECK
    if (!isLoggedIn) {
      alert(
        "Please login to add products to your cart"
      );

      navigate("/login");

      return;
    }

    // PRODUCT CHECK
    if (!product) {
      return;
    }

    // STOCK CHECK
    if (product.stock <= 0) {
      alert("This product is out of stock");
      return;
    }

    // QUANTITY CHECK
    if (quantity > product.stock) {
      alert(
        `Only ${product.stock} items are available.`
      );

      return;
    }

    // ADD SELECTED QUANTITY
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart(product));
    }

    alert("Product added to cart!");
  };

  // ADD / REMOVE WISHLIST
  const handleWishlist = () => {
    if (!product) {
      return;
    }

    if (isWishlisted) {
      dispatch(
        removeFromWishlist(product.id)
      );
    } else {
      dispatch(
        addToWishlist(product)
      );
    }
  };

  // PRODUCT NOT FOUND
  if (!product) {
    return (
      <div className="min-h-screen bg-[#f7f6f2] flex items-center justify-center">
        <div className="text-center">

          <p className="text-[10px] tracking-[0.3em] text-gray-500">
            PRODUCT NOT FOUND
          </p>

          <Link
            to="/shop"
            className="inline-block mt-6 border border-black px-8 py-4 text-[10px] tracking-[0.2em] hover:bg-black hover:text-white transition"
          >
            BACK TO SHOP
          </Link>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f6f2] text-[#111111]">

      {/* NAVBAR */}

      <Navbar />


      {/* PRODUCT DETAILS */}

      <section className="max-w-7xl mx-auto px-5 sm:px-6 md:px-10 py-14 md:py-24">

        <div className="grid md:grid-cols-2 gap-10 md:gap-20">

          {/* PRODUCT IMAGE */}

          <div className="bg-gray-100 overflow-hidden">

            <img
              src={product.image}
              alt={product.title}
              className="w-full aspect-[3/4] object-cover"
            />

          </div>


          {/* PRODUCT INFORMATION */}

          <div className="flex items-center">

            <div className="w-full">

              {/* CATEGORY */}

              <p className="text-[10px] tracking-[0.35em] text-gray-400 uppercase">
                {product.category}
              </p>


              {/* TITLE */}

              <h1 className="text-4xl md:text-6xl font-light mt-5 leading-tight">
                {product.title}
              </h1>


              {/* PRICE */}

              <p className="text-xl mt-7">
                ₹{product.price}
              </p>


              {/* STOCK */}

              <div className="border-t border-gray-300 mt-10 pt-8">

                {product.stock > 0 ? (

                  <p className="text-[10px] tracking-[0.25em] text-gray-500">
                    IN STOCK — {product.stock} AVAILABLE
                  </p>

                ) : (

                  <p className="text-[10px] tracking-[0.25em] text-red-500">
                    OUT OF STOCK
                  </p>

                )}

              </div>


              {/* QUANTITY */}

              {product.stock > 0 && (

                <div className="mt-8">

                  <p className="text-[10px] tracking-[0.25em] mb-4">
                    QUANTITY
                  </p>

                  <div className="flex items-center border border-gray-400 w-fit">

                    <button
                      onClick={handleDecrease}
                      className="w-12 h-12 hover:bg-black hover:text-white transition"
                    >
                      −
                    </button>

                    <span className="w-14 text-center">
                      {quantity}
                    </span>

                    <button
                      onClick={handleIncrease}
                      disabled={
                        quantity >= product.stock
                      }
                      className="w-12 h-12 hover:bg-black hover:text-white transition disabled:opacity-30"
                    >
                      +
                    </button>

                  </div>

                </div>

              )}


              {/* ADD TO CART */}

              <button
                disabled={product.stock <= 0}
                onClick={handleAddToCart}
                className="w-full mt-10 bg-black text-white py-5 text-[10px] tracking-[0.25em] hover:bg-gray-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {product.stock > 0
                  ? "ADD TO CART"
                  : "OUT OF STOCK"}
              </button>


              {/* WISHLIST */}

              <button
                onClick={handleWishlist}
                className="w-full mt-4 border border-black py-5 text-[10px] tracking-[0.25em] hover:bg-black hover:text-white transition"
              >
                {isWishlisted
                  ? "REMOVE FROM WISHLIST"
                  : "ADD TO WISHLIST"}
              </button>


              {/* CONTINUE SHOPPING */}

              <Link
                to="/shop"
                className="block text-center border border-black py-5 mt-4 text-[10px] tracking-[0.25em] hover:bg-black hover:text-white transition"
              >
                CONTINUE SHOPPING
              </Link>

            </div>

          </div>

        </div>

      </section>


      {/* FOOTER */}

      <footer className="bg-[#111111] text-white py-14 px-5 sm:px-6 md:px-10">

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

export default ProductDetails;
