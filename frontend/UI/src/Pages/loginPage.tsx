import { Navigate, useNavigate } from "react-router-dom";

const LoginPage = () => {
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
                <h2 className="text-2xl font-bold text-gray-900 mb-4">BP FORM</h2>
                <form onSubmit={handleSubmit}>
                <div className="flex justify-center">
                    <div className="text-center">
                        <input
                        type="text"
                        placeholder="Email"
                        className="w-full p-3 mb-4 rounded shadow-2xl"
                        />
                        <input
                        type="password"
                        placeholder="Enter your password"
                        className="w-full p-3 rounded mb-4 shadow-2xl"
                        />
                        <button type="submit" className="w-full bg-gray-900 text-white py-2 rounded hover:bg-white hover:text-gray-900">
                        SIGN IN
                        </button>
                    </div>
                    </div>
                </form>
                <p className="mt-4 text-center text-white text-[12px]">
                  Don't have an account yet?{' '}
                  <a href="/sign-up" className="text-gray-900 font-semibold">Create an account</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    };

export default LoginPage;
