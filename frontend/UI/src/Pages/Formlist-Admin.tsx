import React, { useEffect, useState } from "react";
import Header from "../Components/header";
import AddIcon from "@mui/icons-material/Add";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormsAdmin: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [forms, setForms] = useState<Array<any>>([]);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    form_name: "",
    department: "",
    agency: "",
    operating_unit: "",
    appropriation_source: "",
    year: "",
  });

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
  

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      console.log("Form Data to be sent:", formData);
      const response = await axios.post("http://localhost:8000/api/save-form/", formData, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      console.log("form Data:", formData);
      console.log("Form saved successfully:", response.data);
      setOpen(false);
      fetchForms();
    } catch (error) {
      console.error("Error saving form:", error);
    }
  };

  const appropriation_source = [
    {
      value: 'New Approriation (Regular Agency Badget)',
      label: 'New Approriation (Regular Agency Badget)'
    },
    {
      value: 'Automatic Appropriations',
      label: 'Automatic Appropriations'
    },
    {
      value: 'Continuing Appropriations',
      label: 'Continuing Appropriations'
    },
    {
      value: 'Others(New Appropriations Transfers from SPFs; Supplemental)',
      label: 'Others(New Appropriations Transfers from SPFs; Supplemental)'
    },
  ];

  const year = [
    {
      value: '2023-Actual Obligation',
      label: '2023-Actual Obligation'
    },
    {
      value: '2024-Current Progress',
      label: '2024-Current Progress'
    },
    {
      value: '2025-Total Proposal Program',
      label: '2025-Total Proposal Program'
    },
    {
      value: 'TIER1',
      label: 'TIER1'
    },
    {
      value: 'TIER2',
      label: 'TIER2'
    },
  ];

  const handleRowClick = (form: any) => {
    navigate(`/Manage-form/${form.id}`, { state: { form } });
  };

  return (
    <div className="main-container2">
      <Header />

      <div className="flex items-center justify-between w-full mb-4">
            {/* Search Bar (Centered) */}
            <div className="relative mx-auto w-120"> {/* Adjust width as needed */}
              <input
                className="w-full text-center bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-full pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-red-900 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="Form Name..."
              />
              <button
                className="absolute top-1 right-1 flex items-center rounded-full bg-red-800 py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-red-900 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-2">
                  <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
                </svg>
                Search
              </button>
            </div>

            {/* Add Entry Button */}
            <button
              onClick={handleOpen}
              className="py-2 px-4 bg-red-800 text-white rounded-full drop-shadow-lg text-sm flex items-center hover:bg-red-950 ml-4 mr-4"
            >
              <AddIcon fontSize="small" className="mr-1" />
              Add Entry
            </button>
          </div>
      {/* Modal (Dialog) */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="text-red-800 font-bold">Add New Entry</DialogTitle>
        <DialogContent>
          <TextField name="form_name" label="Form Name" fullWidth margin="dense" onChange={handleChange} />
          <div className="flex gap-2">
            <TextField name="department" label="Department" fullWidth margin="dense" onChange={handleChange} />
            <TextField name="agency" label="Agency" fullWidth margin="dense" onChange={handleChange} />
          </div>
          <TextField name="operating_unit" label="Operating Unit" fullWidth margin="dense" onChange={handleChange} />
          <div className="flex gap-2">
            <TextField select name="appropriation_source" label="Appropriation Source" fullWidth margin="dense" onChange={handleChange}
              helperText="Select your Source">
              {appropriation_source.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}</TextField>
            <TextField select name="year" label="Year" fullWidth margin="dense" onChange={handleChange}
              helperText="Select your Year">
              {year.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}</TextField>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

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

export default FormsAdmin;