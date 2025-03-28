import React, { useEffect } from 'react';
import './ChatInterface.css';

const ChatInterface = () => {
    useEffect(() => {
        // Add the chat functionality to window object
        window.sendMessage = async () => {
            const userInput = document.getElementById('user-input');
            const message = userInput.value.trim();
            if (!message) return;

            // Add user message to chat
            addMessage(message, true);
            userInput.value = '';

            // Show loading indicator
            const loading = document.querySelector('.loading');
            loading.style.display = 'block';

            try {
                const response = await fetch('http://localhost:5000/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ message: message })
                });

                const data = await response.json();
                // Hide loading indicator
                loading.style.display = 'none';

                if (data.error) {
                    addMessage('Error: ' + data.error, false);
                } else {
                    addMessage(data.response, false);
                }
            } catch (error) {
                // Hide loading indicator
                loading.style.display = 'none';
                addMessage('Error: Could not connect to the server.', false);
            }
        };

        // Add message to chat
        function addMessage(message, isUser) {
            const chatMessages = document.getElementById('chat-messages');
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
            messageDiv.textContent = message;
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        // Add enter key listener
        const userInput = document.getElementById('user-input');
        userInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                window.sendMessage();
            }
        });

        // Cleanup
        return () => {
            userInput.removeEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    window.sendMessage();
                }
            });
        };
    }, []);

    return (
        <>
            <div className="header">
                <h1>Finance Advisor Chatbot</h1>
            </div>
            <div className="chat-container">
                <div className="chat-messages" id="chat-messages"></div>
                <div className="loading">Thinking</div>
                <div className="input-container">
                    <input 
                        type="text" 
                        id="user-input" 
                        placeholder="Type your financial question here..." 
                        autoComplete="off" 
                    />
                    <button onClick={() => window.sendMessage()}>Send</button>
                </div>
                <div className="disclaimer">
                    Note: This is an AI assistant. For professional financial advice, please consult with a qualified advisor.
                </div>
            </div>
        </>
    );
};

export default ChatInterface; 