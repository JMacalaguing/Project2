import React, { useState } from "react";
import Header from "../Components/header";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { red } from "@mui/material/colors";

import AddIcon from '@mui/icons-material/Add';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";

const FormsAdmin: React.FC = () => {
  // State for modal
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: red[900],
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  interface Row {
    name: string;
    calories: number;
    fat: number;
    carbs: number;
    protein: number;
  }

  const rows: Row[] = [];

  return (
    <div className="main-container2">
      <Header />

      {/* Add Entry Button */}
      <button 
        onClick={handleOpen}
        className="py-2 px-4 bg-red-800 text-white ml-2 rounded-full drop-shadow-lg mb-2 text-sm flex items-center hover:bg-red-950"
      >
        <AddIcon fontSize="small" className="mr-1" />
        Add Entry
      </button>

      {/* Modal (Dialog) */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="text-red-800 font-bold">Add New Entry</DialogTitle>
        <DialogContent>
          <TextField label="Form Name" fullWidth margin="dense"/>
          <div className="flex gap-2">
          <TextField label="Department" fullWidth margin="dense" />
          <TextField label="Agency" fullWidth margin="dense" />
          </div>

          <TextField label="Operating Unit" fullWidth margin="dense" />
          <div className="flex gap-2">
          <TextField label="Propriation Source" fullWidth margin="dense" />
          <TextField label="Year" fullWidth margin="dense" />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">Cancel</Button>
          <Button onClick={handleClose} color="primary">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Table */}
      <div className="form-container2 flex-1 container px-2 py-2 bg-white">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
              <StyledTableCell sx={{ width: "16.5%" }}>Form Name</StyledTableCell>
              <StyledTableCell sx={{ width: "12.5%" }} align="right">Department</StyledTableCell>
              <StyledTableCell sx={{ width: "12.5%" }} align="right">Created</StyledTableCell>
              <StyledTableCell sx={{ width: "12.5%" }} align="right">Last Updated</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.calories}</StyledTableCell>
                  <StyledTableCell align="right">{row.fat}</StyledTableCell>
                  <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                  <StyledTableCell align="right">{row.protein}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default FormsAdmin;
