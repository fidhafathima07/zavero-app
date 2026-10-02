import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* Temporary shop route */}
        <Route
          path="/shop"
          element={<h1 className="p-10 text-3xl">Shop Coming Soon</h1>}
        />

        {/* Temporary about route */}
        <Route
          path="/about"
          element={<h1 className="p-10 text-3xl">About ZAVERO</h1>}
        />

        {/* Temporary contact route */}
        <Route
          path="/contact"
          element={<h1 className="p-10 text-3xl">Contact ZAVERO</h1>}
        />

        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;