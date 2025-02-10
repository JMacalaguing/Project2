// src/Pages/Dashboard.tsx
import React, { useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight, LayoutDashboardIcon } from "lucide-react";
import TableA from "../Components/TableA";
import TableB from "../Components/TableB";

const Dashboard: React.FC = () => {
  // Define an array of table titles
  const tableTitles = [
    `BP FORM 201 - SCHEDULE A 
OBLIGATIONS, BY OBJECT OF EXPENDITURES 
PERSONNEL SERVICES`,
    `BP FORM 201 - SCHEDULE B 
OBLIGATIONS, BY OBJECT OF EXPENDITURES  
MAINTENANCE AND OTHER OPERATING EXPENSES`,
  ];

  // Define corresponding table components for each title
  const tableComponents = [<TableA key="tableA" />, <TableB key="tableB" />];

  // State to hold the current table index
  const [currentIndex, setCurrentIndex] = useState(0);

  // Handler to go to the previous title (with wrapping)
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex - 1 + tableTitles.length) % tableTitles.length
    );
  };

  // Handler to go to the next title (with wrapping)
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % tableTitles.length);
  };

  // Split the current title into lines using the newline character
  const lines = tableTitles[currentIndex].split("\n");

  const currentDate = new Date().toLocaleDateString();

  return (
    <div className="min-h-screen w-full overflow-auto">
      <header className="border-b border-gray-200 px-2 py-4">
      <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <LayoutDashboardIcon className="h-6 w-6 text-black" />
            <span className="text-xl font-semibold text-black">Dashboard</span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarDays color="black" fill="white" />
            <span className="font-medium text-black">{currentDate}</span>
          </div>
        </div>

      </header>
    
    <main className="flex-1 container mx-auto px-2 py-2 overflow-x-auto">
      <div className="w-full">
        {/* Carousel Title with Chevron Buttons */}
        <div className="flex items-center justify-center mb-1">
          {/* Left Chevron Button */}
          <button onClick={handlePrev} className="mr-4">
            <ChevronLeft size={30} />
          </button>

          {/* Title Text */}
          <h2 className="text-center font-bold">
            {lines.map((line, i) => (
              <React.Fragment key={i}>
                {line.trim()}
                {i < lines.length - 1 && <br />}
              </React.Fragment>
            ))}
          </h2>

          {/* Right Chevron Button */}
          <button onClick={handleNext} className="ml-4">
            <ChevronRight size={30} />
          </button>
        </div>

        {/* Subtitle */}
        <h6 className="text-center font-bold text-[11px]">
          (In Thousand Pesos)
        </h6>

        {/* Render the corresponding table */}
        <div className="overflow-x-auto ">{tableComponents[currentIndex]}</div>
      </div>
    </main>
    </div>
  );
};

export default Dashboard;
