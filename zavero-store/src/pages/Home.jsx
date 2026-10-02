import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-white text-black">

      {/* NAVBAR */}
      <nav className="w-full bg-white">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold tracking-[0.25em]"
          >
            ZAVERO
          </Link>

          {/* Menu */}
          <div className="hidden md:flex items-center gap-8 text-xs tracking-wide">
            <Link to="/" className="hover:underline">
              HOME
            </Link>

            <Link to="/shop" className="hover:underline">
              SHOP
            </Link>

            <Link to="/about" className="hover:underline">
              ABOUT
            </Link>

            <Link to="/contact" className="hover:underline">
              CONTACT
            </Link>
          </div>

          {/* Login */}
          <div className="flex items-center gap-5 text-xs">
            <Link
              to="/login"
              className="hover:underline"
            >
              LOG IN
            </Link>

            <Link
              to="/register"
              className="border border-black px-5 py-2 hover:bg-black hover:text-white transition"
            >
              SIGN UP
            </Link>
          </div>

        </div>
      </nav>


      {/* HERO */}
<section className="relative w-full overflow-hidden">

        <img
          src="/Homes.png"
          alt="ZAVERO Men's Fashion"
          className="w-full h-full object-cover"
        />

        {/* Hero Text */}
        <div className="absolute inset-0 flex items-end">

          <div className="w-full max-w-7xl mx-auto px-6 pb-14">

            <div className="text-white">

              <p className="text-xs tracking-[0.35em] mb-4">
                ZAVERO
              </p>

              <h1 className="text-4xl md:text-6xl font-light tracking-tight">
                NEW SEASON
              </h1>

              <p className="mt-3 text-sm">
                Modern essentials for everyday style.
              </p>

              <Link
                to="/shop"
                className="inline-block mt-6 bg-white text-black px-8 py-3 text-xs tracking-wide hover:bg-black hover:text-white transition"
              >
                SHOP NOW
              </Link>

            </div>

          </div>

        </div>

      </section>


      {/* COLLECTION */}
      <section className="py-20 px-6">

        <div className="max-w-7xl mx-auto">

          <div className="flex items-end justify-between mb-10">

            <div>
              <p className="text-xs tracking-[0.3em] text-gray-500">
                SHOP
              </p>

              <h2 className="text-3xl font-light mt-2">
                COLLECTION
              </h2>
            </div>

            <Link
              to="/shop"
              className="text-xs underline underline-offset-4"
            >
              VIEW ALL
            </Link>

          </div>


          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            {/* Essentials */}
            <Link
              to="/shop"
              className="group"
            >
              <div className="h-[500px] overflow-hidden bg-gray-100">

                <img
                  src="https://images.unsplash.com/photo-1610652492500-ded49ceeb378?auto=format&fit=crop&w=900&q=85"
                  alt="Essentials"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />

              </div>

              <div className="pt-4 flex justify-between">
                <h3 className="text-sm">
                  ESSENTIALS
                </h3>

                <span className="text-xs text-gray-500">
                  SHOP
                </span>
              </div>
            </Link>


            {/* Activewear */}
            <Link
              to="/shop"
              className="group"
            >
              <div className="h-[500px] overflow-hidden bg-gray-100">

                <img
                  src="https://images.unsplash.com/photo-1516826957135-700dedea698c?auto=format&fit=crop&w=900&q=85"
                  alt="Activewear"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />

              </div>

              <div className="pt-4 flex justify-between">
                <h3 className="text-sm">
                  ACTIVEWEAR
                </h3>

                <span className="text-xs text-gray-500">
                  SHOP
                </span>
              </div>
            </Link>


            {/* Formal */}
            <Link
              to="/shop"
              className="group"
            >
              <div className="h-[500px] overflow-hidden bg-gray-100">

                <img
                  src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=85"
                  alt="Formal Wear"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />

              </div>

              <div className="pt-4 flex justify-between">
                <h3 className="text-sm">
                  FORMAL
                </h3>

                <span className="text-xs text-gray-500">
                  SHOP
                </span>
              </div>
            </Link>

          </div>

        </div>

      </section>


      {/* BRAND MESSAGE */}
      <section className="border-t border-gray-200 py-24 px-6">

        <div className="max-w-3xl mx-auto text-center">

          <p className="text-xs tracking-[0.3em] text-gray-500">
            ZAVERO
          </p>

          <h2 className="text-3xl md:text-4xl font-light mt-5">
            SIMPLE. MODERN. CONFIDENT.
          </h2>

          <p className="text-sm text-gray-500 mt-5 leading-7">
            Timeless men's clothing designed for everyday life.
          </p>

        </div>

      </section>


      {/* FOOTER */}
      <footer className="border-t border-gray-200 py-12">

        <div className="max-w-7xl mx-auto px-6">

          <div className="flex flex-col md:flex-row justify-between gap-8">

            <div>
              <h2 className="text-xl font-bold tracking-[0.25em]">
                ZAVERO
              </h2>

              <p className="text-xs text-gray-500 mt-3">
                MEN'S FASHION & ACTIVEWEAR
              </p>
            </div>

            <div className="flex gap-8 text-xs">

              <Link to="/shop" className="hover:underline">
                SHOP
              </Link>

              <Link to="/about" className="hover:underline">
                ABOUT
              </Link>

              <Link to="/contact" className="hover:underline">
                CONTACT
              </Link>

            </div>

          </div>

          <p className="text-xs text-gray-400 mt-12">
            © 2026 ZAVERO. All rights reserved.
          </p>

        </div>

      </footer>

    </div>
  );
}

export default Home;