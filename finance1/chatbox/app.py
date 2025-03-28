from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import google.generativeai as genai
import os

app = Flask(__name__)
# Enable CORS with specific origins
CORS(app, resources={
    r"/*": {
        "origins": ["http://localhost:3000", "http://127.0.0.1:3000"],
        "methods": ["GET", "POST"],
        "allow_headers": ["Content-Type"]
    }
})

# Configure the Gemini API
GEMINI_API_KEY = "AIzaSyCvfMLXqu1Yaop4jKphidNe8hPcFQZSq_k"
genai.configure(api_key=GEMINI_API_KEY)

# Initialize the model
model = genai.GenerativeModel('gemini-1.5-pro')

# Create a chat session with finance-specific context
def create_finance_chat():
    return model.start_chat(history=[])

# Finance-specific system prompt
FINANCE_PROMPT = """You are a knowledgeable financial advisor chatbot. You can help with:
- Investment advice and strategies
- Budgeting and personal finance
- Market analysis and trends
- Financial planning and goal setting
- Basic tax information
- Understanding financial terms and concepts

Please provide accurate, helpful, and easy-to-understand financial guidance. If a question is too specific or requires professional advice, recommend consulting with a qualified financial advisor.

User's question: """

def get_finance_response(user_message):
    try:
        chat = create_finance_chat()
        full_prompt = FINANCE_PROMPT + user_message
        response = chat.send_message(full_prompt)
        return response.text
    except Exception as e:
        return f"Error: {str(e)}"

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        user_message = data.get('message')
        if not user_message:
            return jsonify({"error": "No message provided"}), 400

        # Get response from Gemini
        bot_message = get_finance_response(user_message)
        return jsonify({"response": bot_message})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    # Create templates directory if it doesn't exist
    os.makedirs('templates', exist_ok=True)
    # Run the app on port 5000 and allow external connections
    app.run(host='0.0.0.0', port=5000, debug=True)
