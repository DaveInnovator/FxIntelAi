import { useState } from "react";
import { getAIReply } from "../api/chatAI";

function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    const aiResponse = await getAIReply(input);
    const aiMsg = { sender: "bot", text: aiResponse };

    setMessages((prev) => [...prev, aiMsg]);
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl text-teal-400 font-bold mb-4">💬 FXIntel AI Chatbot</h2>

      <div className="bg-gray-800 p-4 rounded-lg h-96 overflow-y-auto space-y-2">
        {messages.map((msg, i) => (
          <div key={i} className={`text-sm p-2 rounded ${msg.sender === "user" ? "bg-teal-700 text-white self-end" : "bg-gray-700 text-teal-300 self-start"}`}>
            <strong>{msg.sender === "user" ? "You" : "AI"}:</strong> {msg.text}
          </div>
        ))}
      </div>

      <div className="flex mt-4 gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me something..."
          className="flex-1 p-2 rounded bg-gray-700 text-white outline-none"
        />
        <button onClick={sendMessage} className="bg-teal-500 hover:bg-teal-600 text-white px-5 py-3 rounded cursor-pointer">
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
