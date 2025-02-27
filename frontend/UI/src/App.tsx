import { Routes, Route, useLocation } from "react-router-dom";
import Dashboard from "./Pages/dashboard";
import Sidebar from "./Components/sidebar";
import { TableProvider } from "./Context/TableContext";
import LoginPage from "./Pages/loginPage";
import SignupPage from "./Pages/signupPage"; 


function App() {
  const location = useLocation();

  return (
    <TableProvider>
      <div className="flex h-screen bg-white">
        {location.pathname !== "/" && location.pathname !== "/sign-up" && <Sidebar />}
        <Routes>
          <Route path="/sign-up" element={<SignupPage />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </TableProvider>
  );
}

export default App;
