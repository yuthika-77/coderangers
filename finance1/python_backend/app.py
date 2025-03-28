from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import re
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Configure Gemini API
genai.configure(api_key=os.getenv('GOOGLE_API_KEY'))
model = genai.GenerativeModel('gemini-pro')

# Financial context for Gemini
FINANCIAL_CONTEXT = """You are a helpful financial advisor chatbot. Your responses should be:
1. Professional but friendly
2. Focused on practical advice
3. Include specific numbers and calculations when relevant
4. Always mention that this is general advice and users should consult professionals for specific situations
5. Based on Indian financial context (use rupees, Indian financial instruments, etc.)
"""

# Backup responses in case Gemini API fails
backup_responses = {
    'investment': """Here are some investment basics:
1. Start early to benefit from compound interest
2. Diversify your portfolio
3. Consider your risk tolerance
4. Research before investing
5. Don't invest money you can't afford to lose""",
    
    'budgeting': """Here are budgeting tips:
1. Track all your expenses
2. Follow the 50/30/20 rule (50% needs, 30% wants, 20% savings)
3. Set clear financial goals
4. Cut unnecessary expenses
5. Save before spending""",
    
    'savings_generic': """Tips for better savings:
1. Set up automatic transfers
2. Keep an emergency fund
3. Look for high-yield savings accounts
4. Review your subscriptions
5. Set specific savings goals""",

    'savings_specific': """Here's how you can save {amount} rupees:
1. Monthly Target: To save {amount} rupees in:
   - 1 year: Save ₹{monthly_1yr} per month
   - 2 years: Save ₹{monthly_2yr} per month
   - 3 years: Save ₹{monthly_3yr} per month

2. Immediate Actions:
   • Cut non-essential expenses (entertainment, dining out)
   • Review and reduce monthly subscriptions
   • Consider additional income sources (freelancing, part-time work)

3. Smart Saving Strategies:
   • Set up automatic transfers on salary day
   • Use high-yield savings accounts (6-7% interest)
   • Consider recurring deposits or liquid mutual funds
   • Track expenses using budgeting apps

4. Lifestyle Adjustments:
   • Cook meals at home instead of ordering
   • Use public transport when possible
   • Look for cheaper alternatives for regular expenses
   • Share subscriptions with family/friends

5. Additional Tips:
   • Save all windfall money (bonuses, gifts)
   • Sell unused items
   • Compare prices before major purchases
   • Use cashback and reward programs""",
    
    'retirement': """Retirement planning essentials:
1. Start saving early
2. Take advantage of employer matching
3. Diversify retirement accounts
4. Consider tax implications
5. Regularly review your plan""",
    
    'debt': """Debt management strategies:
1. Pay more than minimum payments
2. Target high-interest debt first
3. Consider debt consolidation
4. Create a repayment plan
5. Avoid taking on new debt""",
    
    'default': """I can help you with various financial topics including:
- Investment strategies
- Budgeting tips
- Savings advice
- Retirement planning
- Debt management

What would you like to learn about?"""
}

def extract_amount(message):
    """Extract amount in lakhs or rupees from message"""
    # Pattern for X lakh/lakhs
    lakh_pattern = r'(\d+)\s*lakh'
    # Pattern for rupees/Rs. XXXXX
    rupees_pattern = r'(?:rs\.?|rupees)\s*(\d+)'
    
    lakh_match = re.search(lakh_pattern, message.lower())
    if lakh_match:
        return int(lakh_match.group(1)) * 100000
    
    rupees_match = re.search(rupees_pattern, message.lower())
    if rupees_match:
        return int(rupees_match.group(1))
    
    return None

def format_savings_response(amount):
    """Format the savings response with monthly targets"""
    monthly_1yr = round(amount / 12)
    monthly_2yr = round(amount / 24)
    monthly_3yr = round(amount / 36)
    
    return backup_responses['savings_specific'].format(
        amount=f"₹{amount:,}",
        monthly_1yr=f"{monthly_1yr:,}",
        monthly_2yr=f"{monthly_2yr:,}",
        monthly_3yr=f"{monthly_3yr:,}"
    )

def get_gemini_response(message):
    """Get response from Gemini API"""
    try:
        # Extract amount if it's a savings question
        amount = None
        if 'save' in message.lower() or 'saving' in message.lower():
            amount = extract_amount(message)
            if amount:
                # Add specific amount context to the prompt
                amount_context = f"\nThe user wants to save ₹{amount:,}. Include monthly savings targets for 1, 2, and 3 years, and provide specific strategies."
            else:
                amount_context = ""
        else:
            amount_context = ""

        # Prepare the prompt
        prompt = f"{FINANCIAL_CONTEXT}{amount_context}\n\nUser: {message}\n\nProvide specific, actionable advice with bullet points and clear sections."
        
        # Get response from Gemini
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        print(f"Gemini API error: {str(e)}")
        return None

def get_backup_response(message):
    """Get backup response if Gemini fails"""
    message = message.lower()
    
    if 'save' in message or 'saving' in message:
        amount = extract_amount(message)
        if amount:
            return format_savings_response(amount)
        return backup_responses['savings_generic']
    
    if 'invest' in message:
        return backup_responses['investment']
    elif 'budget' in message:
        return backup_responses['budgeting']
    
    return backup_responses['default']

@app.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json()
        message = data.get('message')
        
        if not message:
            return jsonify({
                'error': 'Message is required',
                'message': 'Please provide a message to get financial advice.'
            }), 400

        # Try to get response from Gemini first
        response = get_gemini_response(message)
        
        # If Gemini fails, use backup response
        if not response:
            response = get_backup_response(message)

        suggestions = [
            "Tell me about investing in mutual funds",
            "How can I budget better with a salary of 50,000?",
            "Help me save 5 lakh rupees",
            "What are the best retirement plans in India?",
            "How to manage credit card debt?"
        ]

        return jsonify({
            'message': response,
            'suggestions': suggestions,
            'disclaimer': "Note: This is general financial information. For personalized advice, consult a financial advisor.",
            'timestamp': str(datetime.now())
        })

    except Exception as e:
        return jsonify({
            'error': 'Something went wrong. Please try again.',
            'details': str(e),
            'timestamp': str(datetime.now())
        }), 500

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'ok'})

@app.route('/', methods=['GET'])
def home():
    return jsonify({
        'message': 'Server is running',
        'timestamp': str(datetime.now())
    })

if __name__ == '__main__':
    from datetime import datetime
    app.run(port=5000, debug=True) 