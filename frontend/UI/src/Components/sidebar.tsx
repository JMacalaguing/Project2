import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Loader2, Check } from "lucide-react";
import { useTable } from "../Context/TableContext";
import { exportToPDF } from "../utils/exportToPDF";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SaveIcon from '@mui/icons-material/Save';
import { FaFileExcel } from "react-icons/fa";
import { exportToExcel } from "../utils/exportToExcel";
import { saveData } from "../utils/saveData";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { tableRef } = useTable();
  const [isExporting, setIsExporting] = useState(false);
  const [isExporting2, setIsExporting2] = useState(false);
  const [showCheck, setShowCheck] = useState(false);
  const [showCheck2, setShowCheck2] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false); // Modal state

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUserName(parsedUser.name);
    }
  }, []);

  const HandleLogout = () => {
    console.log("Logging out...");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/", { replace: true });
    window.location.reload();
  };

  const handlePDF = async () => {
    setIsExporting(true);
    setShowCheck(false);
    await exportToPDF(tableRef);
    setIsExporting(false);
    setShowCheck(true);
    setTimeout(() => setShowCheck(false), 3000);
  };

  const handleExcel = async () => {
    setIsExporting2(true);
    setShowCheck2(false);
    await exportToExcel(tableRef);
    setIsExporting2(false);
    setShowCheck2(true);
    setTimeout(() => setShowCheck2(false), 3000);
  };

  return (
    <>
      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 flex justify-center items-center">
          <div className="bg-red-900 p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold text-white">Confirm Logout</h2>
            <p className="text-white">Are you sure you want to log out?</p>
            <div className="mt-4 flex justify-end space-x-2">
              <button 
                onClick={() => setShowLogoutModal(false)} 
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button 
                onClick={HandleLogout} 
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <div className={`sidebar h-screen text-white transition-all duration-300 ${isOpen ? "w-32" : "w-15"} flex flex-col overflow-hidden`} 
      style={{ backgroundImage: "url('/bg9.svg')", backgroundSize: "", backgroundPosition: "center top" }}>
        <div className="flex items-center justify-between p-4">
          <span className="text-lg font-bold ">{isOpen ? "National Budget" : "N"}</span>
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

          <li className="hover:bg-blue-900 p-4">
            <button onClick={saveData} className="hover:text-gray-400 flex items-center space-x-2">
              <SaveIcon /> {isOpen && <span>Save</span>}
            </button>
          </li>

          <li className="hover:bg-blue-900 p-4">
            <button 
              onClick={handlePDF}
              className={`hover:text-gray-400 flex items-center space-x-2 ${isExporting ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={isExporting}
            >
              {isExporting ? <Loader2 className="animate-spin" size={24} /> : showCheck ? <Check className="text-green-500" size={24} /> : <PictureAsPdfIcon />}
              {isOpen && <span>{isExporting ? "Exporting..." : showCheck ? "Exported!" : "PDF"}</span>}
            </button>
          </li>

          <li className="hover:bg-blue-900 p-4">
            <button 
              onClick={handleExcel}
              className={`hover:text-gray-400 flex items-center space-x-2 ${isExporting2 ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={isExporting2}
            >
              {isExporting2 ? <Loader2 className="animate-spin" size={24} /> : showCheck2 ? <Check className="text-green-500" size={24} /> : <FaFileExcel size={24} />}
              {isOpen && <span>{isExporting2 ? "Exporting..." : showCheck2 ? "Exported!" : "Excel"}</span>}
            </button>
          </li>

          {/* Logout Button */}
          <li className="hover:bg-blue-900 p-4">
            <button onClick={() => setShowLogoutModal(true)} className="hover:text-gray-400 flex items-center space-x-2">
              <LogoutIcon />
              {isOpen && <span>Logout</span>}
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
