import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Header from "./header";
import AddIcon from "@mui/icons-material/Add";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import { blue } from '@mui/material/colors';
import axios from "axios";

const ManageForm: React.FC = () => {
  const { id } = useParams(); 
  const location = useLocation();
  const form = location.state?.form; 
  const navigate = useNavigate();

  const [users, setUsers] = useState<{ id: number; name: string; email: string }[]>([]); // State to store the list of users
  const [open, setOpen] = useState(false); // State to control the dialog
  const [selectedUserId, setSelectedUserId] = useState(null); // State to store the selected user ID
  const [allowedUsers, setAllowedUsers] = useState<{ id: number; name: string; email: string; date_added: string }[]>([]);

  // Fetch users when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch the list of users from the backend
  const fetchUsers = async () => {
    try {
      console.log("Fetching users...");
      const response = await axios.get("http://localhost:8000/api/get_users/", {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      });
      console.log("Response Data:", response.data);
      setUsers(response.data); // Set the list of users
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Open the dialog to add a user
  const handleOpen = () => {
    setOpen(true);
  };

  // Close the dialog
  const handleClose = () => {
    setOpen(false);
  };

  // Handle adding a user to the form's allowed_users list
  const handleAddUser = async (userId: number) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/add_allowed_user/${form.id}/`,
        { user_id: userId },
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("User added:", response.data);
      setOpen(false); // Close the dialog after adding the user
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  if (!form) {
    return <div>No form data available.</div>;
  }

  // Fetch allowed users for the current form
const fetchAllowedUsers = async () => {
  try {
    const response = await axios.get(`http://localhost:8000/api/get-allowed-users/${form.id}/`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    });
    console.log("Allowed Users:", response.data);
    setAllowedUsers(response.data); // Update the state with the fetched data
  } catch (error) {
    console.error("Error fetching allowed users:", error);
  }
};


useEffect(() => {
  if (form) {
    fetchAllowedUsers();
  }
}, [form]);

  return (
    <div className="main-container3">
      <Header />
      <div className="flex justify-between w-full items-center">
        <div className="flex items-center">
          <div className="font-bold text-red-800 ml-2 text-[24px] p-0">
            Manage Users {<KeyboardDoubleArrowRightIcon />} <span>{form.form_name}</span>
          </div>
          <button
            onClick={handleOpen} // Open the dialog when the button is clicked
            className="py-2 px-4 bg-red-800 text-white mt-2 ml-4 rounded-full drop-shadow-lg mb-2 text-sm flex items-center hover:bg-red-950"
          >
            <AddIcon fontSize="small" className="mr-1" />
            Add Users
          </button>
          <div className="relative ml-2">
            <input
              className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-full pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-red-900 hover:border-slate-300 shadow-sm focus:shadow"
              placeholder="Users...."
            />
            <button
              className="absolute top-1 right-1 flex items-center rounded-full bg-red-800 py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-red-900 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
            >
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
            </button>
          </div>
        </div>
        <button
          onClick={() => navigate("/dashboard", { state: { formId: form.id } })}
          className="py-2 px-4 bg-red-800 text-white ml-2 mr-4 rounded-full drop-shadow-lg mb-2 text-sm flex items-center hover:bg-red-950"
        >
          <KeyboardDoubleArrowRightIcon fontSize="small" className="mr-1" />
          Go to Forms
        </button>
      </div>

      {/* Dialog to add users */}
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Add User to Form</DialogTitle>
        <List sx={{ pt: 0 }}>
          {users.map((user) => (
            <ListItem disablePadding key={user.id}>
              <ListItemButton onClick={() => handleAddUser(user.id)}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={user.name} secondary={user.email} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Dialog>

      <div className="form-container2 flex-1 container px-2 py-2 bg-white">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-red-800 text-white shadow-2xl">
              <th className="py-2 px-4 border-b w-[200px]">Name</th>
              <th className="py-2 px-4 border-b w-[130px]">Email</th>
              <th className="py-2 px-4 border-b w-[130px]">Date Added</th>
            </tr>
          </thead>
          <tbody>
            {allowedUsers.map((user) => (
              <tr key={user.id} className="shadow-2xl bg-gray-200 text-center">
                <td className="py-2 px-4 ">{user.name}</td>
                <td className="py-2 px-4 ">{user.email}</td>
                <td className="py-2 px-4 ">{new Date(user.date_added).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageForm;