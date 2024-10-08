import { HUGGING_FACE_API_KEY } from "@/config";
import axios from "axios";

let genQuizzes = () => {
  const apiKey = HUGGING_FACE_API_KEY; // Replace with your Hugging Face API key

  // Function to generate quizzes (questions) from text
  const generateQuizFromText = async (inputText) => {
    const apiUrl =
      "https://api-inference.huggingface.co/models/valhalla/t5-small-qg-hl"; // Model for question generation

    console.log("Input Text:", inputText);

    // Split the text into smaller chunks if needed
    const chunks = chunkText(inputText);

    let allGeneratedQuizzes = [];
    let contextss = [];

    for (let chunk of chunks) {
      try {
        const response = await axios.post(
          apiUrl,
          { inputs: chunk },
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Full Response:", response.data);

        // Handle response based on the model's output format
        if (response.data && Array.isArray(response.data)) {
          const generatedQuizzes = response.data
            .map((item) => item.generated_text?.trim())
            .filter(Boolean); // Remove any null or undefined entries

          console.log("Generated Quizzes:", generatedQuizzes);
          allGeneratedQuizzes.push(...generatedQuizzes);

          contextss.push(chunk);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      } catch (error) {
        console.error(
          "Error generating quiz:",
          error.response?.data || error.message
        );
      }
    }

    if (allGeneratedQuizzes.length === 0) {
      console.error("Failed to generate quizzes.");
      return null;
    }

    return { allGeneratedQuizzes, contextss };
  };

  // Function to get answers for generated questions
  const getAnswersForQuestions = async (inputText, questions) => {
    const qaApiUrl =
      "https://api-inference.huggingface.co/models/deepset/bert-base-cased-squad2"; // Use a different QA model
    let allAnswers = [];

    for (let question of questions) {
      let attempts = 0;
      const maxAttempts = 3; // Maximum number of retry attempts

      while (attempts < maxAttempts) {
        try {
          const response = await axios.post(
            qaApiUrl,
            {
              inputs: {
                question: question,
                context: inputText,
              },
            },
            {
              headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
              },
            }
          );

          console.log("QA Response:", response.data); // Log the response for debugging

          // Extract the answer
          if (response.data) {
            const answer = response.data.answer.trim();

            // Optional: Additional filtering based on answer type
            if (answer) {
              allAnswers.push({ question, answer });
            }
          } else {
            console.error("Unexpected QA response format:", response.data);
          }
          break; // Exit the retry loop if successful
        } catch (error) {
          console.error(
            "Error fetching answer:",
            error.response?.data || error.message
          );
          attempts++;
          if (attempts < maxAttempts) {
            await new Promise((resolve) => setTimeout(resolve, 8000)); // Wait before retrying
          }
        }
      }
    }

    return allAnswers;
  };

  const generateDistractors = async (context, question, correctAnswer) => {
    const apiUrl =
      "https://api-inference.huggingface.co/models/voidful/bart-distractor-generation-both";
    // Replace with your Hugging Face API key

    // Format the input as context </s> question </s> answer
    const inputText = `${context} </s> ${question} </s> ${correctAnswer}`;

    let attempts = 0;
    const maxAttempts = 3; // Maximum number of retry attempts

    while (attempts < maxAttempts) {
      try {
        const response = await axios.post(
          apiUrl,
          {
            inputs: inputText,
          },
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "Content-Type": "application/json",
            },
          }
        );

        // Extract the generated distractor(s) from the response
        const generatedDistractors = response.data.map(
          (item) => item.generated_text
        );

        console.log("Generated Distractors:", generatedDistractors);
        return generatedDistractors;
      } catch (error) {
        console.error("Error fetching distractors:", error);
        attempts++;
        if (attempts < maxAttempts) {
          await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait before retrying
        }
      }
      return [];
    }
  };

  // Utility function to split text into chunks
  const chunkText = (text, chunkSize = 300) => {
    const words = text.split(" ");
    const chunks = [];

    for (let i = 0; i < words.length; i += chunkSize) {
      chunks.push(words.slice(i, i + chunkSize).join(" "));
    }

    return chunks;
  };

  return {
    generateQuizFromText,
    getAnswersForQuestions,
    generateDistractors,
  };
};

export default genQuizzes;
