// let processFile = () => {
//   let processFileWithAI = async (fileURL) => {
//     try {
//       // Fetch the file content as an array buffer for processing
//       const response = await fetch(fileURL, {
//         responseType: "arraybuffer",
//       });
//       const pdfText = await this.extractTextFromPDF(response.data); // Extract text from PDF

//       // Generate flashcards and quizzes using AI APIs
//       const flashcards = await this.generateFlashcards(pdfText);
//       const quizzes = await this.generateQuizzes(pdfText);

//       // Update state with generated data
//       this.flashcards = flashcards;
//       this.quizzes = quizzes;
//     } catch (error) {
//       console.error("Error processing file:", error); // Error handling
//     } finally {
//       this.loading = false; // Reset loading state
//     }
//   };

//   return { processFileWithAI };
// };
// export default processFile;
