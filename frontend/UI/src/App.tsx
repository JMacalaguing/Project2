import { Routes, Route, useLocation } from "react-router-dom";
import Dashboard from "./Pages/dashboard";
import Sidebar from "./Components/sidebar";
import { TableProvider } from "./Context/TableContext";
import LoginPage from "./Pages/loginPage";
import SignupPage from "./Pages/signupPage";
import ProtectedRoute from "./Components/ProtectedRoute";
import FormsAdmin from "./Pages/Formlist-Admin";
import FormsUser from "./Pages/Formlist-User";;
import ManageForm from "./Components/ManageForm";
import AssignedUser from "./Components/AssignedUser";


function App() {
  const location = useLocation();
  const token = localStorage.getItem("token"); 

  return (
    <TableProvider>
      <div className="flex h-screen bg-cover" style={{ backgroundImage: "url('/bg.svg')" }}>
        {token && location.pathname !== "/" && location.pathname !== "/sign-up" && <Sidebar />}
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignupPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/FormsAdmin" element={<FormsAdmin/>} />
            <Route path="/FormsUser" element={<FormsUser/>} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/Manage-Form/:id" element={<ManageForm />} />
            <Route path="/AssignedUser/:id" element={<AssignedUser />} />
          </Route>
        </Routes>
      </div>
    </TableProvider>
  );
}

export default App;

