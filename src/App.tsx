import { useState } from "react";
import ChatWindow from "./components/ChatWindow";
import MessageInput from "./components/MessageInput";
import GetAiResponse from "./lib/GetAiResponse";

interface Message {
  id: number;
  text: string;
  sender: "user" | "ai";
}

const App = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false); // Track loading state

  const handleSendMessage = async (text: string) => {
    const newMessage: Message = {
      id: Date.now(),
      text,
      sender: "user",
    };

    // Add user message to state
    setMessages((prev) => [...prev, newMessage]);

    // Set loading state to true while fetching AI response
    setLoading(true);

    try {
      // Fetch AI response from Hugging Face API
      const aiResponse = await GetAiResponse(text);

      const aiMessage: Message = {
        id: Date.now(),
        text: aiResponse,
        sender: "ai",
      };

      // Add AI message to state
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
    } finally {
      // Set loading state to false once the AI response is processed
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow-md rounded-lg">
      <ChatWindow messages={messages} />
      {loading && <p>Loading...</p>}{" "}
      {/* Show loading text while AI is processing */}
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default App;
