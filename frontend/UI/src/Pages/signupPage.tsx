import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 
import PersonIcon from "@mui/icons-material/Person";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import LockIcon from "@mui/icons-material/Lock";
import PasswordIcon from "@mui/icons-material/Password";
import { Snackbar, Alert, AlertColor } from "@mui/material";

const SignupPage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  
  // Snackbar state
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error" as AlertColor
  });

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const showSnackbar = (message: string, severity: AlertColor) => {
    setSnackbar({
      open: true,
      message,
      severity
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(""); 

    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      showSnackbar("All fields are required.", "warning");
      return;
    }
    
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      showSnackbar("Passwords do not match.", "error");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      showSnackbar("Please enter a valid email address.", "warning");
      return;
    }

    // Password strength check (minimum 8 characters)
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      showSnackbar("Password must be at least 8 characters long.", "warning");
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
      
      showSnackbar("Registration successful! Redirecting to dashboard...", "success");
      
      // Delay navigation to allow the user to see the success message
      setTimeout(() => {
        navigate("/");
      }, 1500);
      
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || "Signup failed. Please try again.";
      setError(errorMessage);
      showSnackbar(errorMessage, "error");
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/bg.svg')" }}>
      <div className="flex h-screen w-[800px]">
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="p-8 w-96 shadow-2xl flex flex-col items-center justify-center ">
            <h2 className="text-2xl font-bold text-red-900 mb-4">NB FORM SIGN UP</h2>
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
                <button type="submit" className="w-full bg-red-900 text-white py-2 rounded hover:bg-white hover:text-gray-900 transition-all duration-300">
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
          <img src="/logo.png" alt="Welcome Illustration" className="logo-flip flipw-full mx-auto shadow-2xl rounded-full" />
        </div>
      </div>
      
      {/* Snackbar Component */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SignupPage;