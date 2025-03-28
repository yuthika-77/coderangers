import React, { useState } from 'react';
import ChatbotModal from './ChatbotModal';

const Quiz = () => {
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);

    return (
        <div className="quiz-container">
            <div className="quiz-header">
                <h1>Finance Quiz</h1>
                <button 
                    className="help-button"
                    onClick={() => setIsChatbotOpen(true)}
                >
                    Need Help? Ask AI
                </button>
            </div>
            
            <ChatbotModal 
                isOpen={isChatbotOpen} 
                onClose={() => setIsChatbotOpen(false)} 
            />
        </div>
    );
};

export default Quiz; 