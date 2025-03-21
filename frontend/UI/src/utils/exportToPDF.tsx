import html2canvas from "html2canvas-pro";
import { jsPDF } from "jspdf";

export const exportToPDF = (tableRef: React.RefObject<HTMLDivElement | null>): Promise<void> => {
  return new Promise((resolve) => {
    if (!tableRef.current) {
      console.warn("exportToPDF: Table reference is null.");
      return resolve();
    }

    const tableType = tableRef.current.getAttribute("data-title") || "A";
    const tableTitles = [
      `BP FORM 201 - SCHEDULE A\nOBLIGATIONS, BY OBJECT OF EXPENDITURES\nPERSONNEL SERVICES`,
      `BP FORM 201 - SCHEDULE B\nOBLIGATIONS, BY OBJECT OF EXPENDITURES\nMAINTENANCE AND OTHER OPERATING EXPENSES`,
    ];
    const titleText = tableType === "B" ? tableTitles[1] : tableTitles[0];

    const elementsToHide = tableRef.current.querySelectorAll(".border-t-0");
    elementsToHide.forEach((el) => ((el as HTMLElement).style.borderTop = "none"));

    html2canvas(tableRef.current, {
      scale: 3,
      useCORS: true,
      backgroundColor: "#ffffff",
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdfWidth = 330.2;
      const pdfHeight = 215.9;
      const imgWidth = pdfWidth - 20;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: [pdfWidth, pdfHeight],
      });

      const titleArray = titleText.split("\n");
      const smallText = "(In Thousand Pesos)";
      let startY = 10;
      let lineSpacing = 5;

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(12);
      titleArray.forEach((line, index) => {
        const textWidth = pdf.getTextWidth(line);
        const centerX = (pdfWidth - textWidth) / 2;
        pdf.text(line, centerX, startY + index * lineSpacing);
      });

      pdf.setFontSize(9);
      const smallTextWidth = pdf.getTextWidth(smallText);
      const smallTextX = (pdfWidth - smallTextWidth) / 2;
      const smallTextY = startY + titleArray.length * lineSpacing;
      pdf.text(smallText, smallTextX, smallTextY);

      const safeFileName = `BP_FORM_201_${titleText.replace(/\n/g, "_").replace(/\W/g, "")}.pdf`;

      const tableY = smallTextY + 10;
      if (tableY + imgHeight > pdfHeight - 10) {
        console.warn("Image is too tall; consider splitting into pages.");
      }

      pdf.addImage(imgData, "PNG", 10, tableY, imgWidth, imgHeight);
      pdf.save(safeFileName);
    }).catch((error) => {
      console.error("Error generating PDF:", error);
    }).finally(() => {
      elementsToHide.forEach((el) => ((el as HTMLElement).style.borderTop = ""));
      resolve();
    });
  });
};
