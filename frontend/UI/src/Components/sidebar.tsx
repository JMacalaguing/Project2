import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft, ChevronRight, Loader2, Check } from "lucide-react";
import { useTable } from "../Context/TableContext";
import { exportToPDF } from "../utils/exportToPDF";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SaveIcon from '@mui/icons-material/Save';
import { FaFileExcel } from "react-icons/fa";
import { exportToExcel } from "../utils/exportToExcel";
import { UpdateForm } from "../utils/update_form";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

// Snackbar component
interface SnackbarProps {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  isVisible: boolean;
}

const Snackbar: React.FC<SnackbarProps> = ({ message, type, isVisible }) => {
  if (!isVisible) return null;

  const bgColor = 
    type === 'success' ? 'bg-green-500' : 
    type === 'error' ? 'bg-red-500' : 
    type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500';

  return (
    <div className={`fixed bottom-4 right-4 ${bgColor} text-white px-4 py-2 rounded-md shadow-lg flex items-center z-50`}>
      {type === 'success' && <Check className="mr-2" size={16} />}
      {message}
    </div>
  );
};

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { tableRef } = useTable();
  const [isExporting, setIsExporting] = useState(false);
  const [isExporting2, setIsExporting2] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showCheck, setShowCheck] = useState(false);
  const [showCheck2, setShowCheck2] = useState(false);
  const [showSaveCheck, setShowSaveCheck] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  
  // Snackbar states
  const [snackbar, setSnackbar] = useState<SnackbarProps>({
    message: '',
    type: 'info',
    isVisible: false
  });

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUserName(parsedUser.name);
    }
  }, []);

  const showSnackbar = (message: string, type: 'success' | 'error' | 'info' | 'warning') => {
    setSnackbar({
      message,
      type,
      isVisible: true
    });
    
    // Auto hide after 3 seconds
    setTimeout(() => {
      setSnackbar(prev => ({ ...prev, isVisible: false }));
    }, 3000);
  };

  // Check if currently in the dashboard
  const isDashboardPage = () => {
    // Add all the paths that are considered part of the dashboard
    const dashboardPaths = ['/dashboard', '/table', '/home', '/admin']; 
    return dashboardPaths.some(path => location.pathname.includes(path));
  };

  const HandleLogout = () => {
    console.log("Logging out...");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    showSnackbar("Logged out successfully", "success");
    
    // Delay navigation to show the snackbar first
    setTimeout(() => {
      navigate("/", { replace: true });
      window.location.reload();
    }, 1000);
  };

  const handlePDF = async () => {
    // Check if user is in dashboard
    if (!isDashboardPage()) {
      showSnackbar("PDF export is only available on dashboard pages", "warning");
      return;
    }
    
    setIsExporting(true);
    setShowCheck(false);
    try {
      await exportToPDF(tableRef);
      setShowCheck(true);
      showSnackbar("PDF exported successfully", "success");
    } catch (error) {
      showSnackbar("Failed to export PDF", "error");
    } finally {
      setIsExporting(false);
      setTimeout(() => setShowCheck(false), 3000);
    }
  };

  const handleExcel = async () => {
    // Check if user is in dashboard
    if (!isDashboardPage()) {
      showSnackbar("Excel export is only available on dashboard pages", "warning");
      return;
    }
    
    setIsExporting2(true);
    setShowCheck2(false);
    try {
      await exportToExcel(tableRef);
      setShowCheck2(true);
      showSnackbar("Excel file exported successfully", "success");
    } catch (error) {
      showSnackbar("Failed to export Excel file", "error");
    } finally {
      setIsExporting2(false);
      setTimeout(() => setShowCheck2(false), 3000);
    }
  };

  const handleSave = async () => {
    // Check if user is in dashboard
    if (!isDashboardPage()) {
      showSnackbar("Saving is only available on dashboard pages", "warning");
      return;
    }
    
    setIsSaving(true);
    setShowSaveCheck(false);
    try {
      await UpdateForm();
      setShowSaveCheck(true);
      showSnackbar("Data saved successfully", "success");
    } catch (error) {
      showSnackbar("Failed to save data", "error");
    } finally {
      setIsSaving(false);
      setTimeout(() => setShowSaveCheck(false), 3000);
    }
  };

  return (
    <>
      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 flex justify-center items-center backdrop-blur-xs z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold text-red-900">Confirm Logout</h2>
            <p className="text-red-800">Are you sure you want to log out?</p>
            <div className="mt-4 flex justify-end space-x-2">
              <button 
                onClick={() => setShowLogoutModal(false)} 
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button 
                onClick={HandleLogout} 
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-red-700"
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
            <button onClick={() => navigate("/FormsAdmin")} className="hover:text-gray-400 flex items-center space-x-2">
              <FormatListBulletedIcon /> {isOpen && <span>Forms</span>}
            </button>
          </li>

          <li className="hover:bg-blue-900 p-4">
            <button 
              onClick={handleSave} 
              className={`hover:text-gray-400 flex items-center space-x-2 ${isSaving ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={isSaving}
            >
              {isSaving ? <Loader2 className="animate-spin" size={24} /> : showSaveCheck ? <Check className="text-green-500" size={24} /> : <SaveIcon />} 
              {isOpen && <span>{isSaving ? "Saving..." : showSaveCheck ? "Saved!" : "Save"}</span>}
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

      {/* Snackbar */}
      <Snackbar 
        message={snackbar.message}
        type={snackbar.type}
        isVisible={snackbar.isVisible}
      />
    </>
  );
};

export default Sidebar;