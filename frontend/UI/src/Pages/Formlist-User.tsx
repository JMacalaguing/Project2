import React, { useEffect, useState } from "react";
import Header from "../Components/header";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const FormsUser: React.FC = () => {
  const [forms, setForms] = useState<Array<any>>([]);
  const navigate = useNavigate();
   const [open, setOpen] = useState(false);

    useEffect(() => {
      fetchForms();
    }, []);

  const fetchForms = async () => {
    try {
      console.log("Fetching forms...");
      const response = await axios.get("http://localhost:8000/api/get-forms/", {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      });
  
      console.log("Response Data:", response.data);
  
      // Check if response.data is an array
      if (Array.isArray(response.data)) {
        setForms(response.data);
      } else {
        console.error("API response is not an array:", response.data);
        setForms([]); 
      }
    } catch (error) {
      console.error("Error fetching forms:", error);
    }
  };

  const handleRowClick = (form: any) => {
    navigate(`/dashboard/`, { state: { formId: form.id } });
  };


  return (
    <div className="main-container2">
      <Header />
      {/* Table */}
      <div className="form-container2 flex-1 container px-2 py-2 bg-white">
      <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-red-800 text-white shadow-2xl">
              <th className="py-2 px-4 border-b">Form Name</th>
              <th className="py-2 px-4 border-b">Department</th>
              <th className="py-2 px-4 border-b">Created</th>
              <th className="py-2 px-4 border-b">Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(forms) && forms.length > 0 ? (
              forms.map((form) => (
                <tr
                  key={form.id}
                  onClick={() => handleRowClick(form)}
                  className="hover:bg-gray-200 cursor-pointer text-center shadow-2xl text-red-900"
                >
                  <td className="py-2 px-4 ">{form.form_name}</td>
                  <td className="py-2 px-4 ">{form.department}</td>
                  <td className="py-2 px-4 ">{new Date(form.created_at).toLocaleDateString()}</td>
                  <td className="py-2 px-4 ">{new Date(form.updated_at).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-500">
                  No forms available
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default FormsUser;
