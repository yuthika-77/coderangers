import React, { useState, useEffect, useRef } from 'react';
import '../styles/ChatbotModal.css';

const ChatbotModal = ({ isOpen, onClose }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        // Add user message to chat
        const userMessage = { text: input, isUser: true };
        setMessages(prev => [...prev, userMessage]);
        setInput('');

        try {
            const response = await fetch('http://localhost:5000/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: input })
            });

            const data = await response.json();
            const botMessage = { text: data.response, isUser: false };
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            const errorMessage = { text: 'Error: Could not connect to the chatbot server.', isUser: false };
            setMessages(prev => [...prev, errorMessage]);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="chatbot-modal-overlay">
            <div className="chatbot-modal">
                <div className="chatbot-header">
                    <h2>Finance Quiz Assistant</h2>
                    <button className="close-button" onClick={onClose}>&times;</button>
                </div>
                <div className="chatbot-messages">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`message ${message.isUser ? 'user-message' : 'bot-message'}`}
                        >
                            {message.text}
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
                <div className="chatbot-input">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Type your question here..."
                    />
                    <button onClick={handleSend}>Send</button>
                </div>
            </div>
        </div>
    );
};

export default ChatbotModal; 