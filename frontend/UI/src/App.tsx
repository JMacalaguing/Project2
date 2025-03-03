import { Routes, Route, useLocation } from "react-router-dom";
import Dashboard from "./Pages/dashboard";
import Sidebar from "./Components/sidebar";
import { TableProvider } from "./Context/TableContext";
import LoginPage from "./Pages/loginPage";
import SignupPage from "./Pages/signupPage";
import ProtectedRoute from "./Components/ProtectedRoute";


function App() {
  const location = useLocation();
  const token = localStorage.getItem("token"); 

  return (
    <TableProvider>
      <div className="flex h-screen bg-cover bg-white">
        {token && location.pathname !== "/" && location.pathname !== "/sign-up" && <Sidebar />}
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignupPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </div>
    </TableProvider>
  );
}

export default App;

