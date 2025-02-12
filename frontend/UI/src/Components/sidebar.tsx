import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Download, LayoutDashboard, View, Loader2 } from "lucide-react";
import { useTable } from "../Context/TableContext";
import { exportToPDF } from "./exportToPDF"; 

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { tableRef } = useTable();
  const [isExporting, setIsExporting] = useState(false);

  // Handle PDF export with loading state
  const handleExport = async () => {
    setIsExporting(true);
    console.log("Export started...");
    await exportToPDF(tableRef);
    console.log("Export completed.");
    setIsExporting(false);
  };

  return (
    <div
      className={`h-screen bg-gray-800 text-white transition-all duration-300 ${
        isOpen ? "w-60" : "w-15"
      } flex flex-col overflow-hidden`}
    >
      <div className="flex items-center justify-between p-4">
        <span className="text-lg font-bold">{isOpen ? "Dynahcare" : "D"}</span>
        <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
          {isOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
        </button>
      </div>

      <ul className="flex-grow p-4 space-y-4">
        <li>
          <Link to="/" className="hover:text-gray-400 flex items-center space-x-2">
            <LayoutDashboard size={24} />
            {isOpen && <span>Form</span>}
          </Link>
        </li>
        <li>
          <button
            onClick={handleExport}
            className={`hover:text-gray-400 flex items-center space-x-2 ${
              isExporting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isExporting}
          >
            {isExporting ? (
              <Loader2 className="animate-spin" size={24} />
            ) : (
              <Download size={24} />
            )}
            {isOpen && <span>{isExporting ? "Exporting..." : "Export PDF"}</span>}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
