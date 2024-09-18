import * as pdfjsLib from "pdfjs-dist";

let extractText = () => {
  let extractTextFromPDF = async (pdfData) => {
    try {
      const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;

      let extractedText = "";

      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();

        const pageText = textContent.items.map((items) => items.str).join(" ");
        extractedText += `Page ${pageNum}: \n${pageText}\n\n`;
      }

      return extractedText;
    } catch (error) {
      console.log("Error extracting text from PDF", error);
    }
  };

  return { extractTextFromPDF };
};
export default extractText;
