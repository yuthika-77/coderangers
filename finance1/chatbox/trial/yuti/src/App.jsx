import React, { useState } from 'react';
import axios from 'axios';

const Chatbox = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");

  // Function to handle sending messages to the backend
  const sendMessage = async () => {
    if (userInput.trim() === "") return;

    // Add user's message to chat
    setMessages([...messages, { sender: 'user', text: userInput }]);

    try {
      // Make a POST request to the backend
      const response = await axios.post('http://localhost:5000/chat', {
        message: userInput
      });

      // Add bot's response to chat
      setMessages([...messages, { sender: 'user', text: userInput }, { sender: 'bot', text: response.data.response }]);
      setUserInput(""); // Clear the input field
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div style={{ width: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <div style={{ height: '300px', overflowY: 'auto', marginBottom: '20px', border: '1px solid #ddd', padding: '10px' }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ marginBottom: '10px', textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
            <span style={{ padding: '8px', backgroundColor: msg.sender === 'user' ? '#ddf' : '#f9f9f9', borderRadius: '5px' }}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex' }}>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
          placeholder="Ask about finance..."
        />
        <button
          onClick={sendMessage}
          style={{
            padding: '10px',
            backgroundColor: '#007BFF',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            marginLeft: '10px',
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbox;
