import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { login } from "../redux/slices/authSlice";
import { loginUser } from "../services/userService";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginUser(email, password);

      dispatch(login(user));

      alert("Login successful!");

      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex bg-[#f8f7f3]">

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

            <p className="text-sm text-gray-500 mb-12">
              LOG IN
            </p>

            <form onSubmit={handleLogin}>

              {/* EMAIL */}
              <div className="border-b border-gray-400 mb-8">
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
              <div className="border-b border-gray-400 mb-8">
                <input
                  type="password"
                  placeholder="PASSWORD"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-transparent py-3 text-sm outline-none placeholder-gray-400"
                />
              </div>

              {/* LOGIN BUTTON */}
              <button
                type="submit"
                className="w-full bg-[#8c9092] text-white py-3 text-sm tracking-wide hover:bg-black transition"
              >
                CONTINUE
              </button>

            </form>

            {/* REGISTER */}
            <div className="mt-12">

              <p className="text-sm text-gray-500 mb-4">
                DON'T HAVE AN ACCOUNT?
              </p>

              <Link
                to="/register"
                className="text-sm underline underline-offset-4 hover:no-underline"
              >
                CREATE ACCOUNT
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

export default Login;