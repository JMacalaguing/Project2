import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 
import PersonIcon from "@mui/icons-material/Person";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import LockIcon from "@mui/icons-material/Lock";
import PasswordIcon from "@mui/icons-material/Password";

const SignupPage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(""); 


    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const { data } = await axios.post("http://127.0.0.1:8000/api/signup/", {
        name,
        email,
        password,
      });


      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.error || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/bg.svg')" }}>
      <div className="flex h-[500px] w-[800px] bg-white shadow-lg rounded-3xl">
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">NB FORM SIGN UP</h2>
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>} 
            <form onSubmit={handleSubmit}>
              <div className="text-center">
                <div className="flex w-full p-4 mb-4 rounded-b-md shadow-2xl bg-white">
                  <PersonIcon className="text-gray-900 mr-2"/>
                  <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="focus:outline-none w-full"
                  />
                </div>
                <div className="flex w-full p-4 mb-4 rounded-b-md shadow-2xl bg-white">
                  <AttachEmailIcon className="text-gray-900 mr-2"/>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="focus:outline-none w-full"
                  />
                </div>
                <div className="flex w-full p-4 mb-4 rounded-b-md shadow-2xl bg-white">
                  <LockIcon className="text-gray-900 mr-2"/>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="focus:outline-none w-full"
                  />
                </div>
                <div className="flex w-full p-4 mb-4 rounded-b-md shadow-2xl bg-white">
                  <PasswordIcon className="text-gray-900 mr-2"/>
                  <input
                    type="password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="focus:outline-none w-full"
                  />
                </div>
                <button type="submit" className="w-full bg-gray-900 text-white py-2 rounded hover:bg-white hover:text-gray-900">
                  Register
                </button>
              </div>
            </form>
            <p className="mt-4 text-center text-gray-900 underline text-[12px]">
              <a href="/">Back to Login</a>
            </p>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <img src="/login.svg" alt="Welcome Illustration" className="w-100 h-100 mx-auto" />
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
