import React from "react";
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




const Forms: React.FC = () => {
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

  const rows: Row[] = [

  ];
  

  return (
    <div className="ml-15">
     <Header/>
     <div className="formlist-container bg-white  text-black mt-20 w-328 h-150">
     <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Form Name</StyledTableCell>
            <StyledTableCell align="right">Department</StyledTableCell>
            <StyledTableCell align="right">Created</StyledTableCell>
            <StyledTableCell align="right">Last Updated</StyledTableCell>
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

export default Forms;
