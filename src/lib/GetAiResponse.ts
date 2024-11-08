import axios from "axios";

// Fetch the Hugging Face API key from your environment
const hfApiKey = import.meta.env.VITE_HUGGING_FACE_API_KEY; 

const GetAiResponse = async (userMessage: string) => {
  try {
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/gpt2", // Hugging Face model URL
      { inputs: userMessage },
      {
        headers: {
          Authorization: `Bearer ${hfApiKey}`, // Use Hugging Face API key here
        },
      }
    );
    return response.data[0]?.generated_text || "No response generated."; // Handle response safely
  } catch (error) {
    console.error("Error fetching AI response:", error);
    return "Sorry, I couldn't process your request.";
  }
};

export default GetAiResponse;
