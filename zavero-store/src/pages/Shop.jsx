import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchProducts } from "../redux/slices/productSlice";
import { addToCart } from "../redux/slices/cartSlice";

function Shop() {
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector(
    (state) => state.products
  );

  const cartItems = useSelector((state) => state.cart.items);

  // Search
  const [search, setSearch] = useState("");

  // Category
  const [category, setCategory] = useState("All");

  // Sorting
  const [sort, setSort] = useState("");

  // Pagination
  const [page, setPage] = useState(1);

  const productsPerPage = 6;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Reset page when search/filter changes
  useEffect(() => {
    setPage(1);
  }, [search, category, sort]);

  // Categories
  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  // SEARCH + FILTER
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  // SORT
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sort === "low") {
      return a.price - b.price;
    }

    if (sort === "high") {
      return b.price - a.price;
    }

    if (sort === "name") {
      return a.title.localeCompare(b.title);
    }

    return 0;
  });

  // PAGINATION
  const totalPages = Math.ceil(
    sortedProducts.length / productsPerPage
  );

  const startIndex = (page - 1) * productsPerPage;

  const currentProducts = sortedProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
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
            <Link to="/" className="hover:opacity-50 transition">
              HOME
            </Link>

            <Link
              to="/shop"
              className="font-semibold"
            >
              SHOP
            </Link>

            <Link to="/about" className="hover:opacity-50 transition">
              ABOUT
            </Link>

            <Link to="/contact" className="hover:opacity-50 transition">
              CONTACT
            </Link>
          </div>

          <div className="flex items-center gap-5 text-[11px] tracking-[0.15em]">

            <Link
              to="/cart"
              className="hover:opacity-50 transition"
            >
              CART ({cartItems.length})
            </Link>

            <Link
              to="/login"
              className="hover:opacity-50 transition"
            >
              LOGIN
            </Link>

            <Link
              to="/register"
              className="border border-black px-5 py-2.5 hover:bg-black hover:text-white transition"
            >
              JOIN
            </Link>

          </div>
        </div>
      </nav>

      {/* HEADER */}
      <section className="py-20 md:py-28 px-6 text-center">

        <p className="text-[10px] tracking-[0.45em] text-gray-500">
          ZAVERO / COLLECTION 2026
        </p>

        <h1 className="text-5xl md:text-7xl font-light mt-5">
          THE COLLECTION
        </h1>

        <p className="max-w-xl mx-auto mt-6 text-sm text-gray-500 leading-7">
          Discover refined essentials and modern menswear designed
          for everyday confidence.
        </p>

      </section>

      {/* FILTERS */}
      <section className="max-w-7xl mx-auto px-6 pb-12">

        <div className="grid md:grid-cols-3 gap-4">

          {/* SEARCH */}
          <input
            type="text"
            placeholder="SEARCH PRODUCTS..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 bg-transparent px-4 py-4 text-[10px] tracking-[0.15em] outline-none focus:border-black"
          />

          {/* CATEGORY */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 bg-transparent px-4 py-4 text-[10px] tracking-[0.15em] outline-none focus:border-black"
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item.toUpperCase()}
              </option>
            ))}
          </select>

          {/* SORT */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full border border-gray-300 bg-transparent px-4 py-4 text-[10px] tracking-[0.15em] outline-none focus:border-black"
          >
            <option value="">SORT BY</option>
            <option value="low">PRICE: LOW TO HIGH</option>
            <option value="high">PRICE: HIGH TO LOW</option>
            <option value="name">NAME: A TO Z</option>
          </select>

        </div>

      </section>

      {/* PRODUCTS */}
      <section className="max-w-7xl mx-auto px-6 pb-24">

        {error ? (
          <div className="text-center py-20">
            <p className="text-red-500">
              {error}
            </p>
          </div>
        ) : loading ? (
          <div className="text-center py-20">
            <p className="text-sm tracking-[0.2em]">
              LOADING COLLECTION...
            </p>
          </div>
        ) : currentProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500">
              NO PRODUCTS FOUND.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">

              {currentProducts.map((product) => (

                <div
                  key={product.id}
                  className="group"
                >

                  <Link to={`/product/${product.id}`}>

                    <div className="relative h-[500px] bg-gray-100 overflow-hidden">

                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                      />

                      {product.stock <= 0 && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">

                          <p className="text-white text-[10px] tracking-[0.25em]">
                            OUT OF STOCK
                          </p>

                        </div>
                      )}

                    </div>

                  </Link>

                  <div className="pt-5">

                    <p className="text-[10px] tracking-[0.25em] text-gray-400 uppercase">
                      {product.category}
                    </p>

                    <h2 className="text-sm tracking-wide mt-2">
                      {product.title}
                    </h2>

                    <div className="flex items-center justify-between mt-3">

                      <p className="text-sm">
                        ₹{product.price}
                      </p>

                      {product.stock > 0 ? (
                        <p className="text-[10px] text-gray-500">
                          IN STOCK
                        </p>
                      ) : (
                        <p className="text-[10px] text-red-500">
                          OUT OF STOCK
                        </p>
                      )}

                    </div>

                    <button
                      disabled={product.stock <= 0}
                      onClick={() => handleAddToCart(product)}
                      className="w-full mt-5 border border-black py-3 text-[10px] tracking-[0.2em] hover:bg-black hover:text-white transition disabled:opacity-40"
                    >
                      {product.stock > 0
                        ? "ADD TO CART"
                        : "OUT OF STOCK"}
                    </button>

                  </div>

                </div>

              ))}

            </div>

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-16">

                <button
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className="border border-black px-5 py-3 text-[10px] tracking-[0.2em] disabled:opacity-30"
                >
                  PREVIOUS
                </button>

                <p className="text-[10px] tracking-[0.2em]">
                  PAGE {page} / {totalPages}
                </p>

                <button
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                  className="border border-black px-5 py-3 text-[10px] tracking-[0.2em] disabled:opacity-30"
                >
                  NEXT
                </button>

              </div>
            )}

          </>
        )}

      </section>

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

            <p className="text-[10px] text-gray-500 tracking-wide">
              © 2026 ZAVERO. ALL RIGHTS RESERVED.
            </p>

          </div>

        </div>

      </footer>

    </div>
  );
}

export default Shop;