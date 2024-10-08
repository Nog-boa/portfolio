"use client";
import React, { useState } from "react";
import axios from "axios";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState("");

  const SendMessage = async () => {
    setMessages([...messages, { text: question, sender: "user" }]);

    try {
      const response = await axios.post("https://api.nogresume.com/chat", {
        question,
      });

      setMessages([
        ...messages,
        { text: question, sender: "user" },
        { text: response.data.response, sender: "server" },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages([
        ...messages,
        { text: question, sender: "user" },
        { text: "에러 발생", sender: "server" },
      ]);
    }

    setQuestion("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-dark text-white pt-0 mt-0">
      <h3 className="text-4xl font-bold mt-0 pt-0 mb-4">
        이력서를 기반으로 한 AI-Chatbot 입니다.
      </h3>
      <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0 mb-8">
        궁금한 것을 채팅으로 물어보세요.
        <br />
        이력서를 기준으로 AI-Chatbot이 알려줄 것입니다.
      </p>

      <div className="w-full max-w border-2 border-accent rounded-lg p-4 mt-8">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-center">Chat</h1>
        </div>

        <div className="flex flex-col space-y-4 h-64 overflow-y-auto mb-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-2 rounded-md max-w-xs ${
                message.sender === "user"
                  ? "ml-auto bg-accent text-black"
                  : "mr-auto bg-gray-700"
              }`}
            >
              {message.text}
            </div>
          ))}
        </div>

        <div className="flex">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="flex-grow p-2 rounded-l-lg bg-gray-800 border-none focus:outline-none text-white"
            placeholder="메세지를 입력해주세요"
          />
          <button
            onClick={SendMessage}
            className="bg-gray text-gray px-4 rounded-r-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
