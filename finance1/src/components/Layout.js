import React from 'react';
import { Link } from 'react-router-dom';
import './Layout.css';

const Layout = ({ children }) => {
    return (
        <div className="layout">
            <div className="sidebar">
                <nav>
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/chat" className="nav-link">Chat</Link>
                    <Link to="/tasks" className="nav-link">Tasks</Link>
                    <Link to="/quiz" className="nav-link">Quiz</Link>
                    <Link to="/calculator" className="nav-link">Savings Calculator</Link>
                    <Link to="/returns" className="nav-link">Returns Estimator</Link>
                </nav>
            </div>
            <div className="content">
                {children}
            </div>
        </div>
    );
};

export default Layout; 