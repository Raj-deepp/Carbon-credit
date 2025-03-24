import React, { useState } from "react";
import backgroundImage from "../assets/image1.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { app } from "../firebaseConfig";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  let auth = getAuth(app);

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div
      className="min-h-screen bg-[#fcfcfc] brightness-90 bg-bottom bg-no-repeat"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "100vw 70vh",
      }}
    >
      <div className="flex justify-center items-start min-h-screen pt-30">
        <div className="p-8 rounded-xl w-full max-w-md bg-opacity-90">
          <h2 className="text-2xl font-extrabold text-center mb-10 text-gray-800 tracking-wider">
            CARBON CREDITS <br /> MARKETPLACE
          </h2>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <form className="space-y-4" onSubmit={handleLogin}>
            <div className="relative">
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 pl-10 border border-black rounded-4xl focus:ring focus:ring-green-300"
              />
              <span className="absolute left-3 top-3 text-gray-500">✉️</span>
            </div>

            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 pl-10 border border-black rounded-4xl focus:ring focus:ring-green-300"
              />
              <span className="absolute left-3 top-3 text-gray-500">🔒</span>
            </div>

            <div className="text-xl flex justify-between text-gray-600">
              <a href="#" className="hover:underline">
                Forgot Password?
              </a>
              <Link to="/signup" className="hover:underline font-medium">
                Sign up
              </Link>
            </div>

            <button className="w-full bg-green-600 text-white py-3 font-bold rounded-lg hover:bg-green-700 transition">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
