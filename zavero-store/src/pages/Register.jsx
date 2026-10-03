import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { registerUser } from "../services/userService";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await registerUser({
        name,
        email,
        password,
      });

      alert("Registration successful!");

      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      navigate("/login");
    } catch (error) {
      console.log(error);
      alert("Registration failed");
    }
  };

  return (
    <div className="w-full min-h-screen flex bg-[#f8f7f3]">

      {/* LEFT SIDE */}
      <div className="w-1/2 min-h-screen flex flex-col px-10 md:px-20 lg:px-28 py-12">

        {/* LOGO */}
        <div>
          <h1 className="text-6xl md:text-7xl font-serif tracking-[-0.08em] text-gray-500">
            ZAVERO
          </h1>
        </div>

        {/* CONTENT */}
        <div className="flex-1 flex items-center">

          <div className="w-full max-w-md">

            <p className="text-sm text-gray-500 mb-10">
              CREATE ACCOUNT
            </p>

            <form onSubmit={handleRegister}>

              {/* NAME */}
              <div className="border-b border-gray-400 mb-6">
                <input
                  type="text"
                  placeholder="NAME"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full bg-transparent py-3 text-sm outline-none placeholder-gray-400"
                />
              </div>

              {/* EMAIL */}
              <div className="border-b border-gray-400 mb-6">
                <input
                  type="email"
                  placeholder="EMAIL"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-transparent py-3 text-sm outline-none placeholder-gray-400"
                />
              </div>

              {/* PASSWORD */}
              <div className="border-b border-gray-400 mb-6">
                <input
                  type="password"
                  placeholder="PASSWORD"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-transparent py-3 text-sm outline-none placeholder-gray-400"
                />
              </div>

              {/* CONFIRM PASSWORD */}
              <div className="border-b border-gray-400 mb-8">
                <input
                  type="password"
                  placeholder="CONFIRM PASSWORD"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                  required
                  className="w-full bg-transparent py-3 text-sm outline-none placeholder-gray-400"
                />
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                className="w-full bg-[#8c9092] text-white py-3 text-sm tracking-wide hover:bg-black transition"
              >
                CREATE ACCOUNT
              </button>

            </form>

            {/* LOGIN */}
            <div className="mt-10">

              <p className="text-sm text-gray-500 mb-4">
                ALREADY HAVE AN ACCOUNT?
              </p>

              <Link
                to="/login"
                className="text-sm underline underline-offset-4 hover:no-underline"
              >
                LOG IN
              </Link>

            </div>

          </div>

        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="w-1/2 min-h-screen">

        <img
          src="/eddie.png"
          alt="ZAVERO Men's Fashion"
          className="w-full h-full object-cover"
        />

      </div>

    </div>
  );
}

export default Register;