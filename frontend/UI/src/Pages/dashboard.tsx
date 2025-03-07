import React, { useState } from "react";
import { ChevronLeft, ChevronRight,} from "lucide-react";
import TableA from "../Components/TableA";
import TableB from "../Components/TableB";
import Header from "../Components/header";


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

  return (
    <div className="main-container min-h-screen w-full ">
     <Header/>

      {/* Carousel Title with Chevron Buttons */}
      <div className="form-header ">
          <div className="flex items-center justify-center mb-1" >
            {/* Left Chevron Button */}
          <button onClick={handlePrev} className="mr-4">
            <ChevronLeft size={50} color="white" />
          </button>

          {/* Title Text */}
          <h2 className=" text-white text-center font-bold">
            {lines.map((line, i) => (
              <React.Fragment key={i}>
                {line.trim()}
                {i < lines.length - 1 && <br />}
              </React.Fragment>
            ))}
          </h2>

          {/* Right Chevron Button */}
          <button onClick={handleNext} className="ml-4">
            <ChevronRight size={50} color="white" />
          </button>

          </div>

          {/* Subtitle */}
        <h6 className=" text-white text-center font-bold text-[11px]">
          (In Thousand Pesos)
        </h6>
          
        </div>
    <main className="form-container flex-1 container px-2 py-2 bg-white">   
        {/* Render the corresponding table */}
        <div className=" ">{tableComponents[currentIndex]}</div>
    </main>
    </div>
  );
};

export default Dashboard;
