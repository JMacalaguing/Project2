import React from "react";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
const User: React.FC = () => {
  const currentDate = new Date().toLocaleDateString();

  return (
    <div className="flexflex-col min-h-screen">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-200 px-4 py-4 fixed w-335 ml-15 shadow-xl">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-semibold text-white">Account</span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarMonthIcon className="text-white" />
            <span className="font-medium text-white">{currentDate}</span>
          </div>
        </div>
      </header>

      {/* Content below the header */}
      <div className="mt-16 w-335 shadow-xl bg-white h-full p-4 ml-15">
      </div>
    </div>
  );
};

export default User;
