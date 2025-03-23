import { useState } from "react";
import axios from "axios";

const Chatbox = () => {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!prompt.trim()) return;

    const newMessage = { text: prompt, sender: "user" };
    setMessages([...messages, newMessage]);
    setPrompt("");
    setLoading(true);

    try {
      const { data } = await axios.get(
        `http://localhost:5000/nancy?prompt=${encodeURIComponent(prompt)}`
      );
      setMessages([
        ...messages,
        newMessage,
        { text: data.answer, sender: "nancy" },
      ]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages([
        ...messages,
        { text: "Sorry, something went wrong.", sender: "nancy" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-300 to-gray-600 text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Chat with Nancy</h1>
      <div className="w-full max-w-3xl p-6 bg-white rounded-3xl shadow-lg overflow-y-auto h-96 mb-6">
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl font-bold ${
                msg.sender === "user"
                  ? "bg-blue-600 text-right text-white"
                  : "bg-pink-600 text-left text-white"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>
      </div>
      <div className="flex w-full max-w-3xl">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Say something..."
          className="flex-1 p-4 border-2 border-gray-300 rounded-lg shadow-md text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="ml-4 bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white px-6 py-3 rounded-lg text-lg shadow-md transition-all duration-300 ease-in-out"
        >
          {loading ? "Thinking..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default Chatbox;
