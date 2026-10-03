
import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

        {/* LOGO */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-[0.2em]"
        >
          ZAVERO
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link to="/" className="hover:text-gray-500 transition">
            Home
          </Link>

          <Link to="/shop" className="hover:text-gray-500 transition">
            Shop
          </Link>

          <Link to="/wishlist" className="hover:text-gray-500 transition">
            Wishlist
          </Link>

          <Link to="/cart" className="hover:text-gray-500 transition">
            Cart
          </Link>

          <Link
            to="/login"
            className="border border-black px-5 py-2 hover:bg-black hover:text-white transition"
          >
            Login
          </Link>
        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-200 px-6 py-5 space-y-4 bg-white">

          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-gray-500"
          >
            Home
          </Link>

          <Link
            to="/shop"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-gray-500"
          >
            Shop
          </Link>

          <Link
            to="/wishlist"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-gray-500"
          >
            Wishlist
          </Link>

          <Link
            to="/cart"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-gray-500"
          >
            Cart
          </Link>

          <Link
            to="/login"
            onClick={() => setMenuOpen(false)}
            className="block border border-black px-5 py-2 text-center hover:bg-black hover:text-white transition"
          >
            Login
          </Link>

        </div>
      )}
    </nav>
  );
}

export default Navbar;
