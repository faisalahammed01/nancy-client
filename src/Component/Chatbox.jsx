import { useState } from "react";
import axios from "axios";
import { BiSolidSend } from "react-icons/bi";

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
    <div className="min-h-screen bg-gradient-to-r from-gray-500 to-gray-700 text-white flex flex-col items-center justify-center p-6">
      <div className="flex gap-2 items-center mb-6 flex-wrap justify-center">
        <h1 className="text-2xl font-semibold font-serif mb-6 text-center uppercase w-full">
          Chat with Nancy
        </h1>
      </div>
      <div className="w-full max-w-3xl p-6 border-4 border-cyan-500 bg-white rounded-3xl shadow-lg overflow-y-auto h-96 mb-6">
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
      <div className="flex w-full max-w-3xl gap-4">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Say something..."
          className="flex-1 p-4 border-4 border-gray-300 rounded-lg shadow-md text-white font-bold focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="p-4 bg-gray-600 text-white rounded-lg shadow-md hover:bg-gray-700 transition-all duration-300 ease-in-out flex items-center justify-center"
        >
          <p className="text-3xl">
            <BiSolidSend />
          </p>
        </button>
      </div>
    </div>
  );
};

export default Chatbox;
