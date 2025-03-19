import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Header from "./header";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const AssignedUser: React.FC = () => {
  const { id } = useParams(); 
  const location = useLocation();
  const form = location.state?.form; 
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");

  // Initial data fetching when component mounts
  useEffect(() => {
    if (form) {
      // Fetch data or perform any initial setup here
    }
  }, [form]);

  if (!form) {
    return <div className="flex justify-center items-center h-screen">No form data available.</div>;
  }

  // Function to handle form list item clicks
  const handleFormClick = (formType: string) => {
    navigate(`/form/${formType}`, { state: { formId: form.id } });
  };

  return (
    <div className="main-container3">
      <Header />
      <div className="flex flex-col md:flex-row justify-between w-full items-center p-2">
        <div className="flex flex-col md:flex-row items-center">
          <button onClick={() => navigate(-1)}>
            <ArrowBackIosIcon className="text-red-800" />
          </button>
          <div className="font-bold text-red-800 ml-2 text-[24px] p-0">
            Modules {<KeyboardDoubleArrowRightIcon />} <span>{form.form_name}</span>
          </div>
        
          <div className="relative ml-2 w-full md:w-80 mt-2 md:mt-0">
            <input
              className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-full pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-red-900 hover:border-slate-300 shadow-sm focus:shadow"
              placeholder="Search Modules...."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="absolute top-1 right-1 flex items-center rounded-full bg-red-800 py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-red-900 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              onClick={() => setSearchTerm("")}
            >
              {searchTerm ? "Clear" : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4 mr-2"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1 1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Search
                </>
              )}
            </button>
          </div>
        </div>
        <button
          onClick={() => navigate("/dashboard", { state: { formId: form.id } })}
          className="py-4 px-4 bg-red-800 text-white ml-2 mr-4 rounded-full drop-shadow-lg mb-2 text-sm flex items-center hover:bg-red-950 mt-2 md:mt-0"
        >
          <KeyboardDoubleArrowRightIcon fontSize="small" className="mr-1" />
          Go to Dashboard
        </button>
      </div>
    
      <div className="form-container2 container px-2 py-2 bg-white justify-center">
        <div className="flex flex-col">
        <div className="w-full text-center mb-4 pt-10">
          <h2 className="text-3xl font-bold text-red-800">COST STRUCTURE PROGRAM</h2>
        </div>

       
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 items-start pt-5 text-white">
          <div 
            className="bg-red-800 p-4 rounded-lg shadow text-center w-80 px-6 py-3 h-32 flex items-center justify-center mx-auto cursor-pointer hover:bg-red-900 transition-colors"
            onClick={() => handleFormClick("general-administration")}
          >
            General Administration and Support
          </div>
          <div 
            className="bg-red-800 p-4 rounded-lg shadow text-center w-80 px-6 py-3 h-32 flex items-center justify-center mx-auto cursor-pointer hover:bg-red-900 transition-colors"
            onClick={() => handleFormClick("support-and-operators")}
          >
            Support And Operators
          </div>
          <div 
            className="bg-red-800 p-4 rounded-lg shadow text-center w-80 px-6 py-3 h-32 flex items-center justify-center mx-auto cursor-pointer hover:bg-red-900 transition-colors"
            onClick={() => handleFormClick("operators")}
          >
            Operators
          </div>
        </div>
        </div>
        </div>
        
       
      </div>
  );
};

export default AssignedUser;