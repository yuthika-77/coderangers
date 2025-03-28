import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Tasks.css';

const financeQuestions = [
    {
        question: "What is a 401(k)?",
        options: [
            "A retirement savings plan sponsored by an employer",
            "A type of investment fund",
            "A government bond",
            "A savings account"
        ],
        correctAnswer: 0,
        video: "https://www.youtube.com/embed/your-video-id-1"
    },
    {
        question: "What is compound interest?",
        options: [
            "Interest on your savings account",
            "Interest earned on both principal and previously earned interest",
            "Interest paid on loans",
            "A type of investment"
        ],
        correctAnswer: 1,
        video: "https://www.youtube.com/embed/your-video-id-2"
    },
    {
        question: "What is diversification in investing?",
        options: [
            "Putting all money in one stock",
            "Spreading investments across different assets",
            "Saving money in a bank",
            "Trading stocks frequently"
        ],
        correctAnswer: 1,
        video: "https://www.youtube.com/embed/your-video-id-3"
    },
    {
        question: "What is a stock market index?",
        options: [
            "A type of stock",
            "A measure of stock market performance",
            "A trading platform",
            "A financial advisor"
        ],
        correctAnswer: 1,
        video: "https://www.youtube.com/embed/your-video-id-4"
    },
    {
        question: "What is inflation?",
        options: [
            "A type of investment",
            "A decrease in prices",
            "A general increase in prices",
            "A type of tax"
        ],
        correctAnswer: 2,
        video: "https://www.youtube.com/embed/your-video-id-5"
    }
];

const Tasks = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);

    const handleAnswerClick = (selectedAnswer) => {
        if (selectedAnswer === financeQuestions[currentQuestionIndex].correctAnswer) {
            setScore(score + 1);
        }

        const nextQuestion = currentQuestionIndex + 1;
        if (nextQuestion < financeQuestions.length) {
            setCurrentQuestionIndex(nextQuestion);
        } else {
            setShowScore(true);
        }
    };

    const resetQuiz = () => {
        setCurrentQuestionIndex(0);
        setScore(0);
        setShowScore(false);
    };

    return (
        <div className="tasks-page">
            <div className="tasks-container">
                <div className="quiz-section">
                    <h2>Financial Knowledge Quiz</h2>
                    {showScore ? (
                        <div className="score-section">
                            <h3>Quiz Completed!</h3>
                            <p>Your score: {score} out of {financeQuestions.length}</p>
                            <button onClick={resetQuiz}>Try Again</button>
                        </div>
                    ) : (
                        <div className="question-section">
                            <h3>Question {currentQuestionIndex + 1} of {financeQuestions.length}</h3>
                            <p>{financeQuestions[currentQuestionIndex].question}</p>
                            <div className="answer-section">
                                {financeQuestions[currentQuestionIndex].options.map((option, index) => (
                                    <button
                                        key={index}
                                        className="answer-button"
                                        onClick={() => handleAnswerClick(index)}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="videos-section">
                    <h2>Educational Videos</h2>
                    <div className="video-grid">
                        {financeQuestions.map((question, index) => (
                            <div key={index} className="video-item">
                                <iframe
                                    width="100%"
                                    height="200"
                                    src={question.video}
                                    title={`Financial Education Video ${index + 1}`}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tasks; 