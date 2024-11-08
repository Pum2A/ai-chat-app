import React from "react";
import { useEffect, useRef } from "react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "ai";
}

interface ChatWindowProps {
  messages: Message[];
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages }) => {
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="p-4 h-96 overflow-y-scroll bg-gray-100 rounded-lg">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`my-2 p-2 rounded-lg ${
            message.sender === "user"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-black"
          }`}
        >
          {message.text}
        </div>
      ))}
      <div ref={chatEndRef} /> {/* This div will act as the scroll target */}
    </div>
  );
};

export default ChatWindow;
