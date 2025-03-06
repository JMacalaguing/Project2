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
        password 
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
      className="w-full min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat p-4"
      style={{ backgroundImage: "url('/bg.svg')" }}
    >
      <div className="w-full max-w-5xl shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row">
        {/* Left Side - Logo */}
        <div className="w-full md:w-2/3 flex items-center justify-center p-10">
          <img 
            src="/logo.png" 
            alt="Welcome Logo" 
            className="max-w-full h-auto mx-auto rounded-full shadow-2xl logo-flip" 
          />
        </div>
        
        {/* Right Side - Login Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center relative h-screen bg-white shadow-2xl p-12">
          {/* Decorative Shapes */}
          <div className="absolute bottom-145 right-77 w-4 h-100 bg-red-900 shadow-lg"></div>
          <div className="absolute bottom-145 right-23 w-4 h-100 bg-red-900 shadow-lg"></div>
          <div className="absolute top-0 left-15 w-70 h-20 bg-red-900 shadow-lg"></div>
          <div className="absolute bottom-0 right-[20 px] w-120 h-10
            border-l-[25px] border-l-transparent 
            border-r-[25px] border-r-transparent 
            border-b-[30px] border-b-red-900">
          </div>
          <div className="absolute bottom-120 right-0 w-4 h-100 bg-red-900 shadow-lg"></div>
          <div className="absolute bottom-120 right-98 w-4 h-100 bg-red-900 shadow-lg"></div>
          <div className="absolute bottom-150 right-90 w-4 h-100 bg-red-900 shadow-lg"></div>
          <div className="absolute bottom-150 right-10 w-4 h-100 bg-red-900 shadow-lg"></div>

          <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold text-red-900 mb-6 text-center">
              NATIONAL BUDGET FORM
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center bg-white p-3 rounded-md shadow-md">
                <AttachEmailIcon className="text-gray-900 mr-2" />
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
                <LockIcon className="text-gray-900 mr-2" />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="focus:outline-none w-full"
                  required
                />
              </div>

              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              <button 
                type="submit" 
                className="w-full bg-red-900 text-white py-2 rounded hover:bg-gray-700 transition-colors"
              >
                SIGN IN
              </button>
            </form>
            
            <p className="mt-4 text-center text-gray-900 text-sm">
              Don't have an account yet?{" "}
              <a 
                href="/sign-up" 
                className="text-gray-900 font-semibold hover:underline"
              >
                Create an account
              </a>
            </p>
          </div>
        </div>
        <div className="w-full md:w-1/9"></div>
      </div>
    </div>
  );
};

export default LoginPage;