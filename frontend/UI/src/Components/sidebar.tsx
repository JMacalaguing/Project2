import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom"; // Import useLocation
import { ChevronLeft, ChevronRight, LayoutDashboard, Loader2, Check } from "lucide-react";
import { useTable } from "../Context/TableContext";
import { exportToPDF } from "./exportToPDF";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import LogoutIcon from '@mui/icons-material/Logout';

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { tableRef } = useTable();
  const [isExporting, setIsExporting] = useState(false);
  const [showCheck, setShowCheck] = useState(false);
  
  const location = useLocation(); // Get the current path

  const HandleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  }

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
        isOpen ? "w-80" : "w-15"
      } flex flex-col overflow-hidden`}
    >
      <div className="flex items-center justify-between p-4">
        <span className="text-lg font-bold">{isOpen ? "National Budget" : "N"}</span>
        <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
          {isOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
        </button>
      </div>

      <ul className="flex-grow">
        <li className={`p-4 ${location.pathname === "/dashboard" ? "bg-" : "hover:bg-blue-900"}`}>
          <Link to="/dashboard" className="flex items-center space-x-2">
            <LayoutDashboard size={24} />
            {isOpen && <span>Form</span>}
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
