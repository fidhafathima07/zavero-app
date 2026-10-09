
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function About() {
  return (
    <div className="min-h-screen bg-white text-black">

      {/* NAVBAR */}
      <Navbar />

      {/* HERO */}
      <section className="relative h-[500px] overflow-hidden">

        <img
          src="/jacob.png"
          alt="ZAVERO Fashion"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">

          <div className="text-center text-white px-6">

            <p className="text-sm tracking-[0.4em] mb-4">
              ABOUT ZAVERO
            </p>

            <h1 className="text-5xl md:text-7xl font-light tracking-wide">
              STYLE WITH PURPOSE
            </h1>

          </div>

        </div>
      </section>

      {/* INTRO */}
      <section className="max-w-5xl mx-auto px-6 py-20 text-center">

        <p className="text-sm tracking-[0.3em] text-gray-500 mb-5">
          OUR STORY
        </p>

        <h2 className="text-3xl md:text-4xl font-light mb-8">
          Modern fashion. Timeless confidence.
        </h2>

        <p className="text-gray-600 leading-8 max-w-3xl mx-auto">
          ZAVERO is a modern fashion brand created for people who
          appreciate clean design, quality, and effortless style.
          We believe fashion should be simple, confident, and easy
          to make your own.
        </p>

      </section>

      {/* VALUES */}
      <section className="bg-gray-50 py-20">

        <div className="max-w-6xl mx-auto px-6">

          <div className="text-center mb-14">

            <p className="text-sm tracking-[0.3em] text-gray-500 mb-4">
              WHAT WE BELIEVE
            </p>

            <h2 className="text-3xl md:text-4xl font-light">
              Our Values
            </h2>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

            {/* VALUE 1 */}
            <div className="bg-white p-10 text-center">

              <div className="text-3xl mb-5">
                ✦
              </div>

              <h3 className="text-xl mb-4">
                Quality
              </h3>

              <p className="text-gray-600 leading-7">
                We focus on quality materials and thoughtful
                details to create products you can enjoy every day.
              </p>

            </div>

            {/* VALUE 2 */}
            <div className="bg-white p-10 text-center">

              <div className="text-3xl mb-5">
                ◇
              </div>

              <h3 className="text-xl mb-4">
                Simplicity
              </h3>

              <p className="text-gray-600 leading-7">
                Clean designs and timeless styles make it easy
                to create a wardrobe that feels truly yours.
              </p>

            </div>

            {/* VALUE 3 */}
            <div className="bg-white p-10 text-center">

              <div className="text-3xl mb-5">
                ○
              </div>

              <h3 className="text-xl mb-4">
                Confidence
              </h3>

              <p className="text-gray-600 leading-7">
                Our goal is to help you feel comfortable,
                confident, and ready for every moment.
              </p>

            </div>

          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center px-6">

        <p className="text-sm tracking-[0.3em] text-gray-500 mb-5">
          DISCOVER ZAVERO
        </p>

        <h2 className="text-4xl md:text-5xl font-light mb-8">
          Find your style.
        </h2>

        <Link
          to="/shop"
          className="inline-block bg-black text-white px-8 py-4 text-sm tracking-widest hover:bg-gray-800 transition"
        >
          SHOP COLLECTION
        </Link>

      </section>

      {/* FOOTER */}
      <footer className="bg-black text-white py-10 text-center">

        <h3 className="text-xl tracking-[0.3em] mb-3">
          ZAVERO
        </h3>

        <p className="text-gray-400 text-sm">
          Modern fashion for modern confidence.
        </p>

      </footer>

    </div>
  );
}

export default About;


