import React, { useState } from "react";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (input.trim()) {
      onSendMessage(input);
      setInput("");
    }
  };

  return (
    <div className="flex mt-4">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-grow p-2 border rounded-l-lg"
        placeholder="Napisz wiadomość..."
      />
      <button
        onClick={handleSendMessage}
        className="p-2 bg-blue-500 text-white rounded-r-lg"
      >
        Wyślij
      </button>
    </div>
  );
};

export default MessageInput;
