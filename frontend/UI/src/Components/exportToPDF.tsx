import html2canvas from 'html2canvas-pro';
import { jsPDF } from "jspdf";

export const exportToPDF = (tableRef: React.RefObject<HTMLDivElement | null>): Promise<void> => {
  return new Promise((resolve) => {
    if (!tableRef.current) return resolve();

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

      const titleArray = [
        "BFORM 2001-SCHEDULE A",
        "OBLIGATIONS, BY OBJECT OF EXPENDITURES",
        "PERSONNEL SERVICES",
      ];
      const smallText = "(In Thousand Pesos)";

      let startY = 10;
      let lineSpacing = 5;
      let smallTextSpacing = 0;

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
      const smallTextY = startY + titleArray.length * lineSpacing + smallTextSpacing;
      pdf.text(smallText, smallTextX, smallTextY);

      const fileName = titleArray.join(" ").replace(/\s+/g, " ") + ".pdf";

      const tableY = smallTextY + 10;
      pdf.addImage(imgData, "PNG", 10, tableY, imgWidth, imgHeight);

      pdf.save(fileName);
      elementsToHide.forEach((el) => ((el as HTMLElement).style.borderTop = ""));
      
      resolve(); // This ensures the function returns when PDF export is done
    });
  });
};
