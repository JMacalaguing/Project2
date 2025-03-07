import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AttachEmail as AttachEmailIcon, Lock as LockIcon } from "@mui/icons-material";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    try {
      const { data } = await axios.post("http://127.0.0.1:8000/api/login/", {
        email,
        password,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/dashboard");
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
        err.message ||
        "Something went wrong. Please try again."
      );
    }
  };

  return (
<div
  className="w-full min-h-screen flex items-center justify-center bg-gray-900 px-4 relative"
  style={{
    backgroundImage: "url('/bg.svg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  {/* Glass Effect - Centered Behind the Form */}


  {/* Login Form */}
  <div
    className="relative w-full max-w-md p-15 pt-10 rounded-3xl shadow-2xl flex flex-col items-center bg-gray-50/1">
    <img src="/logo.png" alt="Logo" className="h-30 mb-4 logo-flip" />
    <h2 className="text-2xl sm:text-3xl font-bold text-red-900 text-center mb-4 font-">
      NATIONAL BUDGET FORM
    </h2>

        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div className="flex items-center bg-white p-3 rounded-md shadow-md">
            <AttachEmailIcon className="text-red-900 mr-2" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="focus:outline-none w-full"
              required
            />
          </div>

          <div className="flex items-center bg-white p-3 rounded-md shadow-md">
            <LockIcon className="text-red-900 mr-2" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="focus:outline-none w-full"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-red-900 text-white py-2 rounded-md hover:bg-gray-700 transition-all"
          >
            SIGN IN
          </button>
        </form>

        <p className="mt-4 text-center text-gray-900 text-sm">
          Don't have an account?{" "}
          <a href="/sign-up" className="text-red-900 font-semibold hover:underline">
            Create an account
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
