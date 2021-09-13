import html2pdf from "html2pdf.js";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

/**
 * Print pdf with bowser
 * @param dom html dom
 * @param filename
 */
export function print(dom?: HTMLElement, filename?: string) {
  window.document.title = filename || "应聘岗位-求职者-联系方式";
  window.print();
}

/**
 * Transform html to pdf
 * @param dom html dom
 * @param filename
 */
export function exportAsPDF(dom?: HTMLElement, filename?: string) {
  const opt = {
    filename: filename,
    margin: [0, 0, 0, 0],
    html2canvas: { scale: 1 },
    image: { type: "jpeg", quality: 1 },
    jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
  };
  html2pdf().set(opt).from(dom).save();
}

/**
 * Transform html to canvas then pdf
 * @param dom
 */
export function exportAsCanvasPDF(dom?: HTMLElement, filename?: string) {
  html2canvas(dom).then((canvas) => {
    let imgWidth = 210;
    let pageHeight = 295;
    let imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    pdf.save(filename);
  });
}
