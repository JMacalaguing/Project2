import { Navigate, useNavigate } from "react-router-dom";

const SignupPage = () => {
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault(); 
        navigate("/dashboard"); 
    };
    return (
        <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-r from-white to-gray-900">
          <div className="flex h-[500px] w-[800px] bg-gradient-to-r from-white to-gray-900 shadow-lg rounded-3xl">
           
            <div className="flex-1 flex items-center justify-center ">
              <div className="text-center">
                <img
                  src="/login.svg" 
                  alt="Welcome Illustration"
                  className="w-100 h-100 mx-auto"
                />
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center p-6">
              <div className=" p-8 rounded-lg shadow-lg w-96 ">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">BP FORM REGISTER</h2>
                <form onSubmit={handleSubmit}>
                <div className="flex justify-center">
                    <div className="text-center">
                        <input
                        type="text"
                        placeholder="Name"
                        className="w-full p-4 mb-4 rounded-full shadow-2xl"
                        />
                        <input
                        type="text"
                        placeholder="Email"
                        className="w-full p-4 mb-4 rounded-full shadow-2xl"
                        />
                        <input
                        type="password"
                        placeholder="Enter your password"
                        className="w-full p-4 rounded-full mb-4 shadow-2xl"
                        />
                        <input
                        type="password"
                        placeholder="Confirm password"
                        className="w-full p-4 rounded-full mb-4 shadow-2xl"
                        />
                        <button type="submit" className="w-full bg-gray-900 text-white py-2 rounded hover:bg-white hover:text-gray-900">
                        Register
                        </button>
                    </div>
                    </div>
                </form>
                <p className="mt-4 text-center text-gray-900 underline text-[12px]">
                  <a href="/">Back to Login</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    };

export default SignupPage;
