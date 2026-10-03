import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const isLoggedIn = useSelector(
    (state) => state.auth.isLoggedIn
  );

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#f7f6f2] text-[#111111]">

      {/* NAVBAR */}
      <nav className="w-full bg-[#f7f6f2] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-6 flex items-center justify-between">

          {/* LOGO */}
          <Link
            to="/"
            className="text-2xl md:text-3xl font-semibold tracking-[0.3em]"
          >
            ZAVERO
          </Link>

          {/* NAV LINKS */}
          <div className="hidden md:flex items-center gap-8 text-[10px] tracking-[0.2em]">

            <Link
              to="/"
              className="hover:opacity-50 transition"
            >
              HOME
            </Link>

            <Link
              to="/shop"
              className="hover:opacity-50 transition"
            >
              SHOP
            </Link>

            <Link
              to="/wishlist"
              className="hover:opacity-50 transition"
            >
              WISHLIST
            </Link>

            {isLoggedIn && (
              <Link
                to="/orders"
                className="hover:opacity-50 transition"
              >
                ORDERS
              </Link>
            )}

            <Link
              to="/about"
              className="hover:opacity-50 transition"
            >
              ABOUT
            </Link>

            

          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-5">
            <Link
              to="/wishlist"
              className=" text-[10px] tracking-[0.15em] hover:opacity-50 transition"
            >
              WISHLIST
            </Link>

            <Link
              to="/cart"
              className="text-[10px] tracking-[0.15em] hover:opacity-50 transition"
            >
              CART
              
            </Link>

            {isLoggedIn ? (
              <div className="flex items-center gap-4">

                {/* USER NAME */}
                <span className="hidden sm:block text-[10px] tracking-[0.15em]">
                  {user?.name}
                </span>

                {/* LOGOUT */}
                <button
                  onClick={handleLogout}
                  className="text-[10px] tracking-[0.15em] hover:opacity-50 transition"
                >
                  LOGOUT
                </button>

              </div>
            ) : (
              <div className="flex items-center gap-4">

                <Link
                  to="/login"
                  className="text-[10px] tracking-[0.15em] hover:opacity-50 transition"
                >
                  LOGIN
                </Link>

                <Link
                  to="/register"
                  className="hidden sm:block border border-black px-5 py-2.5 text-[10px] tracking-[0.15em] hover:bg-black hover:text-white transition"
                >
                  JOIN
                </Link>

              </div>
            )}

          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative h-[calc(100vh-80px)] min-h-[600px] overflow-hidden">

        <img
          src="/5.png"
          alt="ZAVERO Men's Fashion"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/20" />

        <div className="absolute inset-0 flex items-end">

          <div className="max-w-7xl mx-auto w-full px-6 md:px-10 pb-16 md:pb-24">

            <p className="text-white text-[10px] tracking-[0.4em] mb-5">
              MODERN MENSWEAR
            </p>

            <h1 className="text-white text-5xl md:text-7xl lg:text-8xl font-light tracking-tight max-w-4xl leading-[0.95]">
              STYLE WITHOUT
              <br />
              COMPROMISE.
            </h1>

            <p className="text-white/80 max-w-md mt-7 text-sm leading-6">
              Refined essentials designed for the modern man.
              Discover timeless pieces made for everyday confidence.
            </p>

            <div className="flex flex-wrap gap-4 mt-9">

              <Link
                to="/shop"
                className="bg-white text-black px-8 py-4 text-[10px] tracking-[0.25em] hover:bg-black hover:text-white transition"
              >
                SHOP COLLECTION
              </Link>

              <Link
                to="/about"
                className="border border-white text-white px-8 py-4 text-[10px] tracking-[0.25em] hover:bg-white hover:text-black transition"
              >
                DISCOVER ZAVERO
              </Link>

            </div>

          </div>

        </div>
      </section>

      {/* INTRO */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">

        <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-end">

          <div>

            <p className="text-[10px] tracking-[0.35em] text-gray-500">
              THE ZAVERO STANDARD
            </p>

            <h2 className="text-4xl md:text-6xl font-light leading-tight mt-6">
              Less noise.
              <br />
              More character.
            </h2>

          </div>

          <div>

            <p className="text-sm text-gray-600 leading-7 max-w-lg">
              ZAVERO is built around clean silhouettes, refined
              details and effortless confidence. Every piece is
              designed to become part of your everyday wardrobe.
            </p>

            <Link
              to="/shop"
              className="inline-block mt-8 text-[10px] tracking-[0.25em] border-b border-black pb-2 hover:opacity-50 transition"
            >
              EXPLORE COLLECTION
            </Link>

          </div>

        </div>

      </section>

      {/* ESSENTIALS */}
      <section className="px-6 md:px-10 pb-24">

        <div className="max-w-7xl mx-auto">

          <div className="flex items-end justify-between mb-10">

            <div>

              <p className="text-[10px] tracking-[0.35em] text-gray-500">
                THE ESSENTIALS
              </p>

              <h2 className="text-3xl md:text-4xl font-light mt-4">
                Designed to stay.
              </h2>

            </div>

            <Link
              to="/shop"
              className="hidden md:block text-[10px] tracking-[0.2em] border-b border-black pb-2"
            >
              VIEW ALL
            </Link>

          </div>

          <div className="grid md:grid-cols-3 gap-5">

            {/* IMAGE 1 */}
            <div className="group overflow-hidden bg-gray-200">
              <img
                src="/one.png"
                alt="ZAVERO collection"
                className="w-full h-[520px] object-cover group-hover:scale-105 transition duration-700"
              />
            </div>

            {/* IMAGE 2 */}
            <div className="group overflow-hidden bg-gray-200">
              <img
                src="/newww.png"
                alt="ZAVERO essentials"
                className="w-full h-[520px] object-cover group-hover:scale-105 transition duration-700"
              />
            </div>

            {/* IMAGE 3 */}
            <div className="group overflow-hidden bg-gray-200">
              <img
                src="/active.png"
                alt="ZAVERO menswear"
                className="w-full h-[520px] object-cover group-hover:scale-105 transition duration-700"
              />
            </div>

          </div>

        </div>

      </section>

      {/* WHY ZAVERO */}
      <section className="bg-[#111111] text-white py-24 md:py-32 px-6 md:px-10">

        <div className="max-w-7xl mx-auto">

          <p className="text-[10px] tracking-[0.35em] text-gray-500">
            WHY ZAVERO
          </p>

          <div className="grid md:grid-cols-3 gap-12 mt-14">

            <div>
              <p className="text-3xl font-light">01</p>

              <h3 className="text-lg mt-6">
                Timeless Design
              </h3>

              <p className="text-sm text-gray-400 leading-6 mt-4">
                Clean designs that remain relevant season after
                season.
              </p>
            </div>

            <div>
              <p className="text-3xl font-light">02</p>

              <h3 className="text-lg mt-6">
                Refined Quality
              </h3>

              <p className="text-sm text-gray-400 leading-6 mt-4">
                Carefully selected styles created for everyday
                comfort and confidence.
              </p>
            </div>

            <div>
              <p className="text-3xl font-light">03</p>

              <h3 className="text-lg mt-6">
                Effortless Style
              </h3>

              <p className="text-sm text-gray-400 leading-6 mt-4">
                Versatile pieces that make personal style simple.
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 px-6 text-center">

        <p className="text-[10px] tracking-[0.35em] text-gray-500">
          YOUR STYLE. YOUR SIGNATURE.
        </p>

        <h2 className="text-4xl md:text-6xl font-light mt-6">
          Find your signature style.
        </h2>

        <Link
          to="/shop"
          className="inline-block mt-9 bg-black text-white px-10 py-5 text-[10px] tracking-[0.25em] hover:bg-gray-700 transition"
        >
          SHOP ZAVERO
        </Link>

      </section>

      {/* FOOTER */}
      <footer className="bg-[#111111] text-white py-16 px-6 md:px-10">

        <div className="max-w-7xl mx-auto">

          <div className="grid md:grid-cols-4 gap-12">

            <div className="md:col-span-2">

              <h2 className="text-2xl font-semibold tracking-[0.3em]">
                ZAVERO
              </h2>

              <p className="text-sm text-gray-400 leading-6 mt-5 max-w-sm">
                Modern menswear for everyday confidence.
              </p>

            </div>

            <div>

              <p className="text-[10px] tracking-[0.25em] text-gray-500">
                EXPLORE
              </p>

              <div className="flex flex-col gap-4 mt-6 text-[10px] tracking-[0.15em]">

                <Link
                  to="/shop"
                  className="hover:text-gray-400 transition"
                >
                  SHOP
                </Link>

                <Link
                  to="/wishlist"
                  className="hover:text-gray-400 transition"
                >
                  WISHLIST
                </Link>

                <Link
                  to="/orders"
                  className="hover:text-gray-400 transition"
                >
                  ORDERS
                </Link>

              </div>

            </div>

            <div>

              <p className="text-[10px] tracking-[0.25em] text-gray-500">
                INFORMATION
              </p>

              <div className="flex flex-col gap-4 mt-6 text-[10px] tracking-[0.15em]">

                <Link
                  to="/about"
                  className="hover:text-gray-400 transition"
                >
                  ABOUT
                </Link>

                <Link
                  to="/contact"
                  className="hover:text-gray-400 transition"
                >
                  CONTACT
                </Link>

              </div>

            </div>

          </div>

          <div className="border-t border-gray-700 mt-14 pt-6">

            <p className="text-[10px] text-gray-500 tracking-wide">
              © 2026 ZAVERO. ALL RIGHTS RESERVED.
            </p>

          </div>

        </div>

      </footer>

    </div>
  );
}

export default Home;