import React, { useState } from 'react';
import './AIBot.css';

const AIBot = () => {
  const [messages, setMessages] = useState([]); // Array to store messages
  const [userMessage, setUserMessage] = useState(''); // Input text state
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(true); // For toggling bot visibility

  const apiEndpoint = "https://astro-backend-topaz.vercel.app/chat-ai"; // Replace with your API endpoint

  // Function to handle message submission
  const handleSendMessage = async () => {
    if (!userMessage.trim()) return; // Prevent sending empty messages

    
    // Add user message to the messages list
    setMessages((prev) => [...prev, { sender: 'user', text: userMessage }]);
    setUserMessage(''); // Clear the input

    setLoading(true);
    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: messages + userMessage +  `This is my planets data ${localStorage.getItem("planets")}`   }),
      });

      const data = await response.json();

      // Add bot's response to the messages list
      setMessages((prev) => [...prev, { sender: 'bot', text: data.data }]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setMessages((prev) => [...prev, { sender: 'bot', text: "Sorry, something went wrong. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return <button onClick={() => setIsOpen(true)} className="open-bot-button">Chat</button>;

  return (
    <div className="ai-bot-container">
      <div className="ai-bot-header">
        <span>AI Bot</span>
        <button onClick={() => setIsOpen(false)}>&times;</button>
      </div>
      <div className="ai-bot-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.sender === 'user' ? 'user-message' : 'bot-message'}`}
          >
            {msg.text}
          </div>
        ))}
        {loading && <div className="message bot-message">Typing...</div>}
      </div>
      <div className="ai-bot-input">
        <input
          type="text"
          placeholder="Type a message..."
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button onClick={handleSendMessage}>➤</button>
      </div>
      <div className="ai-bot-footer">
        Powered by Team GenX
      </div>
    </div>
  );
};

export default AIBot;
