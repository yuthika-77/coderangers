import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Chat from './components/Chat';
import Tasks from './components/Tasks';
import Layout from './components/Layout';
import Quiz from './components/Quiz';
import SavingsCalculator from './components/SavingsCalculator';
import ReturnsEstimator from './components/ReturnsEstimator';
import './App.css';

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/calculator" element={<SavingsCalculator />} />
          <Route path="/returns" element={<ReturnsEstimator />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App; 