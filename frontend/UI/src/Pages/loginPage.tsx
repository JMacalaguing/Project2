import { useNavigate } from "react-router-dom";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import LockIcon from "@mui/icons-material/Lock";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div
      className="h-screen w-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/bg.svg')" }} 
    >
      <div className="flex h-[500px] w-[800px] bg-white/80 shadow-lg rounded-3xl backdrop-blur-md">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <img src="/login.svg" alt="Welcome Illustration" className="w-100 h-100 mx-auto" />
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="p-8 rounded-lg shadow-lg w-96 bg-white/80">
            <h2 className="text-xl font-bold text-gray-900 mb-4">NATIONAL BUDGET FORM</h2>
            <form onSubmit={handleSubmit}>
              <div className="w-full">
                <div className="text-center">
                  <div className="flex bg-white w-full p-4 mb-4 rounded-b-md shadow-2xl">
                    <AttachEmailIcon className="text-gray-900 mr-2" />
                    <input type="email" placeholder="Email" className="focus:outline-none w-full" />
                  </div>

                  <div className="flex bg-white w-full p-4 mb-4 rounded-b-md shadow-2xl">
                    <LockIcon className="text-gray-900 mr-2" />
                    <input type="password" placeholder="Password" className="focus:outline-none w-full" />
                  </div>
                  <button type="submit" className="w-full bg-gray-900 text-white py-2 rounded hover:bg-white hover:text-gray-900">
                    SIGN IN
                  </button>
                </div>
              </div>
            </form>
            <p className="mt-4 text-center text-gray-900 text-[12px]">
              Don't have an account yet?{" "}
              <a href="/sign-up" className="text-gray-900 font-semibold">Create an account</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
