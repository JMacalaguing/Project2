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
import { red } from '@mui/material/colors';
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import GroupIcon from '@mui/icons-material/Group';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const ManageForm: React.FC = () => {
  const { id } = useParams(); 
  const location = useLocation();
  const form = location.state?.form; 
  const navigate = useNavigate();

  const [users, setUsers] = useState<{ id: number; name: string; email: string }[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [allowedUsers, setAllowedUsers] = useState<{ id: number; name: string; email: string; date_added: string }[]>([]);
  const [notification, setNotification] = useState({ open: false, message: "", severity: "success" });

  // Initial data fetching when component mounts
  useEffect(() => {
    if (form) {
      fetchAllowedUsers();
      fetchUsers();
    }
  }, [form]);

  // Fetch the list of users who can be added to the form
  const fetchUsers = async () => {
    try {
      setLoading(true);
      
      if (!form) {
        console.error("Form data is missing.");
        return;
      }
  
      const response = await axios.get("http://localhost:8000/api/get_users/", {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
        params: {
          form_id: form.id,
        },
      });
  
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      showNotification("Failed to fetch users", "error");
    } finally {
      setLoading(false);
    }
  };

  // Fetch allowed users for the current form
  const fetchAllowedUsers = async () => {
    try {
      setLoading(true);
      
      const response = await axios.get(`http://localhost:8000/api/get-allowed-users/${form.id}/`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      });
      
      setAllowedUsers(response.data);
    } catch (error) {
      console.error("Error fetching allowed users:", error);
      showNotification("Failed to fetch allowed users", "error");
    } finally {
      setLoading(false);
    }
  };

  // Handle adding a user to the form's allowed_users list
  const handleAddUser = async (userId: number) => {
    try {
      setLoading(true);
      
      const response = await axios.post(
        `http://localhost:8000/api/add_allowed_user/${form.id}/`,
        { user_id: userId },
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      );
      
      setOpen(false);
      await fetchAllowedUsers();
      await fetchUsers(); // Refresh the users list
      showNotification("User added successfully", "success");
    } catch (error) {
      console.error("Error adding user:", error);
      showNotification("Failed to add user", "error");
    } finally {
      setLoading(false);
    }
  };

  // Remove a user from the allowed users list - FIXED
  const removeAllowedUser = async (userId: number) => {
    try {
      setLoading(true);
      
      // Updated API call to match the updated URL pattern
      await axios.delete(`http://localhost:8000/api/remove-allowed-user/${form.id}/${userId}/`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        }
      });
      
      // Update the state directly
      setAllowedUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
      await fetchUsers(); // Refresh the users list
      showNotification("User removed successfully", "success");
    } catch (error) {
      console.error("Error removing user:", error);
      showNotification("Failed to remove user", "error");
    } finally {
      setLoading(false);
    }
  };

  // Handle dialog open/close
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Helper function for displaying notifications
  const showNotification = (message: string, severity: "success" | "error") => {
    setNotification({
      open: true,
      message,
      severity,
    });
  };

  // Handle notification close
  const handleNotificationClose = () => {
    setNotification(prev => ({ ...prev, open: false }));
  };

  // Filter allowed users based on search term
  const filteredAllowedUsers = allowedUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!form) {
    return <div className="flex justify-center items-center h-screen">No form data available.</div>;
  }

  return (
    <div className="main-container3">
      <Header />
      <div className="flex flex-col md:flex-row justify-between w-full items-center p-2">
        <div className="flex flex-col md:flex-row items-center">
        <button onClick={() => navigate(-1)}>
                <ArrowBackIosIcon className="text-red-800" />
            </button>
          <div className="font-bold text-red-800 ml-2 text-[24px] p-0">
            Manage Admin {<KeyboardDoubleArrowRightIcon />} <span>{form.form_name}</span>
          </div>
          <button
            onClick={handleOpen}
            className="py-2 px-4 bg-red-800 text-white mt-2 ml-4 rounded-full drop-shadow-lg mb-2 text-sm flex items-center hover:bg-red-950"
            disabled={loading}
          >
            {loading ? <CircularProgress size={16} color="inherit" className="mr-1" /> : <AddIcon fontSize="small" className="mr-1" />}
            Add Admin
          </button>
          <div className="relative ml-2 w-full md:w-80 mt-2 md:mt-0">
            <input
              className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-full pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-red-900 hover:border-slate-300 shadow-sm focus:shadow"
              placeholder="Search users..."
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
                <button
                onClick={() => navigate(`/AssignedUser/${form.id}`, { state: { form } })}
                className="py-3 px-6 bg-red-800 text-white ml-12 mr-4 rounded-full drop-shadow-lg mb-2 text-sm flex items-center hover:bg-red-950 mt-2 "
              >
                <GroupIcon fontSize="small" className="mr-1" />
                Assigned Modules
              </button>
              </div>
              <button
                onClick={() => navigate("/dashboard", { state: { formId: form.id } })}
                className="py-4 px-4 bg-red-800 text-white ml-2 mr-4 rounded-full drop-shadow-lg mb-2 text-sm flex items-center hover:bg-red-950 mt-2 "
              >
                <KeyboardDoubleArrowRightIcon fontSize="small" className="mr-1" />
                Go to Dashboard
              </button>
      </div>
      
      {/* Users Dialog */}
      <Dialog 
        onClose={handleClose} 
        open={open}
        PaperProps={{
          style: { width: "500px", maxWidth: "560px" },
        }}
      >
        <DialogTitle sx={{ textAlign: "center" , backgroundColor:"rgba(155, 3, 3, 0.8)", color:"white"}}>Add User to Form</DialogTitle>
        {loading ? (
          <div className="flex justify-center p-6">
            <CircularProgress />
          </div>
        ) : (
          <List sx={{ pt: 0, overflow: "auto", maxHeight: "400px" }}>
            {users.length === 0 ? (
              <div className="text-center p-4">No users available to add</div>
            ) : (
              users.map((user) => (
                <ListItem disablePadding key={user.id}>
                  <ListItemButton
                    onClick={() => handleAddUser(user.id)}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 2,
                      width: "100%",
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: red[100], color: red[900] }}>
                        <PersonIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                      primaryTypographyProps={{ textAlign: "center", width: "100%" }}
                      secondaryTypographyProps={{ textAlign: "center", width: "100%" }}
                      primary={user.name}
                      secondary={user.email}
                    />
                  </ListItemButton>
                </ListItem>
              ))
            )}
          </List>
        )}
      </Dialog>

      {/* User Table */}
      <div className="form-container2 flex-1 container px-2 py-2 bg-white">
        {loading && allowedUsers.length === 0 ? (
          <div className="flex justify-center p-6">
            <CircularProgress />
          </div>
        ) : (
          <>
            {filteredAllowedUsers.length === 0 ? (
              <div className="text-center p-4 border border-gray-300 rounded">
                {searchTerm ? "No users match your search" : "No admin have been added to this form yet"}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                  <thead>
                    <tr className="bg-red-800 text-white shadow-2xl">
                      <th className="py-2 px-4 border-b w-[200px]">Name</th>
                      <th className="py-2 px-4 border-b w-[130px]">Email</th>
                      <th className="py-2 px-4 border-b w-[130px]">Date Added</th>
                      <th className="py-2 px-4 border-b w-[130px]">Remove User</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAllowedUsers.map((user) => (
                      <tr key={user.id} className="shadow-2xl bg-gray-200 text-center hover:bg-gray-300">
                        <td className="py-2 px-4">{user.name}</td>
                        <td className="py-2 px-4">{user.email}</td>
                        <td className="py-2 px-4">{new Date(user.date_added).toLocaleDateString()}</td>
                        <td className="py-2 px-4">
                          <button 
                            onClick={() => removeAllowedUser(user.id)}
                            disabled={loading}
                            className="hover:bg-red-100 p-1 rounded-full transition-colors"
                          >
                            {loading ? <CircularProgress size={24} /> : <DeleteIcon className="text-red-800"/>}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>

      {/* Notification */}
      <Snackbar 
        open={notification.open} 
        autoHideDuration={6000} 
        onClose={handleNotificationClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleNotificationClose} severity={notification.severity as "success" | "error"} sx={{ width: '100%' }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ManageForm;