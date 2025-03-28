# FinWise - AI-Powered Financial Education Platform

## Overview
FinWise is an interactive financial education platform that helps users learn about personal finance through an AI chatbot, interactive quizzes, and financial calculators. The platform aims to make financial education accessible and engaging.

## Features

### 💬 AI Chatbot
- Interactive financial advice chatbot
- Keyword-based responses for common financial topics
- Suggestions and follow-up questions
- Disclaimer system for financial advice

### 📊 Financial Tools
- Returns Estimator
  - SIP vs Lumpsum calculator
  - Visual representation using charts
  - Customizable parameters (duration, rate, amount)

### 📝 Financial Knowledge Quiz
- Interactive quiz system
- Multiple-choice questions
- Instant feedback
- Score tracking
- Topics covered:
  - Investment basics (SIP, NAV)
  - Tax-saving investments
  - Financial planning

### 🏠 Interactive UI
- Modern, responsive design
- Easy navigation
- Real-time calculations
- Mobile-friendly interface

## Technology Stack

### Frontend
- React.js
- React Router for navigation
- Chart.js for data visualization
- CSS for styling
- Modern JavaScript (ES6+)

### Backend
- Node.js
- Express.js
- RESTful API architecture
- Hugging Face API integration

## Project Structure
```
finance/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Chat.jsx
│   │   ├── Home.jsx
│   │   ├── Quiz.jsx
│   │   ├── Tasks.jsx
│   │   └── ReturnsEstimator.jsx
│   ├── App.jsx
│   └── index.js
├── server.js
├── package.json
└── README.md
```

## Setup and Installation

1. Clone the repository
```bash
git clone [repository-url]
cd finance
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
# Start React frontend
npm start

# In a separate terminal, start Node.js backend
node server.js
```

4. Open your browser and navigate to `http://localhost:3000`

## Environment Variables
Create a `.env` file in the root directory with:
```
HUGGINGFACE_API_KEY=your_api_key_here
```

## Features in Development
- User authentication system
- Database integration for storing user progress
- Enhanced AI capabilities
- Personalized learning paths
- Integration with financial news APIs
- Mobile application

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments
- React.js documentation
- Chart.js library
- Node.js community
- Hugging Face API