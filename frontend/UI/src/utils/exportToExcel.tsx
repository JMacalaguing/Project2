import * as XLSX from "xlsx";


export const exportToExcel = (tableRef: React.RefObject<HTMLDivElement | null>): void => {
  if (!tableRef.current) {
    console.warn("exportToExcel: Table reference is null.");
    return;
  }

  // Get the table title from the `data-title` attribute
  const tableType = tableRef.current.getAttribute("data-title") || "A";

  // Define an array of table titles
  const tableTitles = [
    `BP FORM 201 - SCHEDULE A\nOBLIGATIONS, BY OBJECT OF EXPENDITURES\nPERSONNEL SERVICES`,
    `BP FORM 201 - SCHEDULE B\nOBLIGATIONS, BY OBJECT OF EXPENDITURES\nMAINTENANCE AND OTHER OPERATING EXPENSES`,
  ];

  // Select the title based on table type
  const titleText = tableType === "B" ? tableTitles[1] : tableTitles[0];

  // Extract table element
  const tableElement = tableRef.current.querySelector("table");
  if (!tableElement) {
    console.warn("exportToExcel: No <table> found inside the tableRef.");
    return;
  }

  const rows = Array.from(tableElement.rows);
  const data: any[][] = [];

  // Extract table data while maintaining layout
  rows.forEach((row) => {
    const rowData: any[] = [];
    Array.from(row.cells).forEach((cell) => {
      rowData.push(cell.innerText);
    });
    data.push(rowData);
  });

  // Create a new worksheet
  const ws = XLSX.utils.aoa_to_sheet(data);

  // Apply styles
  const wsRange = XLSX.utils.decode_range(ws["!ref"] || "A1:A1");
  for (let col = wsRange.s.c; col <= wsRange.e.c; col++) {
    const colLetter = XLSX.utils.encode_col(col);
    const headerCell = ws[`${colLetter}1`];

    if (headerCell) {
      headerCell.s = {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "4F81BD" } },
        alignment: { horizontal: "center" },
      };
    }
  }

  
  ws["!cols"] = rows[0]
    ? Array(rows[0].cells.length).fill({ wch: 20 }) // Adjust width as needed
    : [];

  
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

 
  const safeFileName = `BP_FORM_201_${titleText.replace(/\n/g, "_").replace(/\W/g, "")}.xlsx`;

 
  XLSX.writeFile(wb, safeFileName);
};
