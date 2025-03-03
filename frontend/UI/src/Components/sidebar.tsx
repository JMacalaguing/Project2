import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Import useLocation
import { ChevronLeft, ChevronRight, LayoutDashboard, Loader2, Check } from "lucide-react";
import { useTable } from "../Context/TableContext";
import { exportToPDF } from "./exportToPDF";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { tableRef } = useTable();
  const [isExporting, setIsExporting] = useState(false);
  const [showCheck, setShowCheck] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  
  const location = useLocation(); 

  useEffect(() => {
    // Retrieve user data from localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUserName(parsedUser.name); // Set user name from stored user data
    }
  }, []);

  const HandleLogout = () => {
    console.log("Logging out...");
    
    localStorage.removeItem("user"); 
    localStorage.removeItem("token");
  
    navigate("/", { replace: true }); 
    window.location.reload();
  };
  

  const handleExport = async () => {
    setIsExporting(true);
    setShowCheck(false);

    await exportToPDF(tableRef);

    setIsExporting(false);
    setShowCheck(true);

    setTimeout(() => {
      setShowCheck(false);
    }, 3000);
  };

  return (
    <div
      className={`sidebar h-screen bg-gray-800 text-white transition-all duration-300 ${
        isOpen ? "w-32" : "w-15"
      } flex flex-col overflow-hidden`}
    >
      <div className="flex items-center justify-between p-4">
        <span className="text-lg font-bold">{isOpen ? "National Budget" : "N"}</span>
        <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
          {isOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
        </button>
      </div>
      <ul className="flex-grow">
      <li className="p-4 flex flex-col items-center">
            <AccountCircleIcon style={{ fontSize: 30, color:"#FFF5E49"}} /> 
            {isOpen && <span className="mt-2 text-sm text-center">{userName ? userName : "Guest"}</span>}  
          {isOpen && <hr className="mt-2 w-full border-t border-gray-500" />} 
        </li>
        <li className={`p-4 ${location.pathname === "/dashboard" ? "bg-blue" : "hover:bg-blue-900"}`}>
          <Link to="/dashboard" className="flex items-center space-x-2">
            <LayoutDashboard size={24} />
            {isOpen && <span>Dashboard</span>}
          </Link>
        </li>
        <li className="hover:bg-blue-900 p-4">
          <button className="hover:text-gray-400 flex items-center space-x-2">
            <SaveAltIcon />{isOpen && <span>Save</span>}
          </button>
        </li>
        <li className="hover:bg-blue-900 p-4">
          <button
            onClick={handleExport}
            className={`hover:text-gray-400 flex items-center space-x-2 ${
              isExporting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isExporting}
          >
            {isExporting ? (
              <Loader2 className="animate-spin" size={24} />
            ) : showCheck ? (
              <Check className="text-green-500" size={24} />
            ) : (
              <PictureAsPdfIcon />
            )}
            {isOpen && <span>{isExporting ? "Exporting..." : showCheck ? "Exported!" : "PDF"}</span>}
          </button>
        </li>
        <li className="hover:bg-blue-900 p-4">
          <button onClick={HandleLogout} className="hover:text-gray-400 flex items-center space-x-2">
            <LogoutIcon />
            {isOpen && <span>Logout</span>}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
