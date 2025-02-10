import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, LayoutDashboard} from "lucide-react"; 

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true); // Sidebar state

  return (
    <div className={`h-screen bg-gray-800 text-white transition-all duration-300 ${isOpen ? "w-64" : "w-20"} flex flex-col`}>
      {/* Logo & Toggle Button */}
      <div className="flex items-center justify-between p-4">
        <span className="text-lg font-bold">{isOpen ? "Dynahcare" : "D"}</span> {/* Logo/Text */}

        {/* Toggle Button (Right Side) */}
        <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
          {isOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />} {/* ◀️ / ▶️ */}
        </button>
      </div>

      {/* Sidebar Links */}
      <ul className="flex-grow p-4">
        <li className="mb-2">
          <Link to="/" className="hover:text-gray-400 flex items-center space-x-2">
            <LayoutDashboard size={24} />
            {isOpen && <span>Dashboard</span>}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
