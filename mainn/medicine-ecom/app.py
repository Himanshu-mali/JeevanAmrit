from flask import Flask, render_template, request, jsonify
import json
from ai_models.mental_health import analyze_mental_health
from ai_models.disease_predictor import predict_disease_outbreak
from ai_models.medicine_recommender import recommend_medicine
from ai_models.fall_detection import process_fall_alert
import threading

app = Flask(__name__)

# Mock database
with open('static/data/medicines.json') as f:
    medicines = json.load(f)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/products')
def products():
    return render_template('products.html', medicines=medicines)

@app.route('/chatbot')
def chatbot():
    return render_template('chatbot.html')

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

@app.route('/api/chat', methods=['POST'])
def chat_api():
    data = request.json
    message = data.get('message', '')
    
    # Route to appropriate AI model based on message content
    if any(word in message.lower() for word in ['depress', 'anxiety', 'sad', 'stress']):
        response = analyze_mental_health(message)
    elif any(word in message.lower() for word in ['disease', 'outbreak', 'flu', 'dengue']):
        response = predict_disease_outbreak(message)
    elif any(word in message.lower() for word in ['recommend', 'suggest', 'medicine']):
        # In a real app, you'd get user medical history from database
        response = recommend_medicine(message, medical_history={})
    else:
        response = {"response": "I'm not sure how to help with that. Can you ask about medicines, symptoms, or mental health?"}
    
    return jsonify(response)

@app.route('/api/fall-detected', methods=['POST'])
def fall_detected():
    data = request.json
    # Process in background to avoid delay
    threading.Thread(target=process_fall_alert, args=(data,)).start()
    return jsonify({"status": "Alert processing"})

@app.route('/api/blood-donors', methods=['GET'])
def get_blood_donors():
    # In a real app, this would query a database
    location = request.args.get('location', '')
    blood_type = request.args.get('blood_type', '')
    
    mock_donors = [
        {"name": "John Doe", "blood_type": "O+", "location": "Downtown", "last_donation": "3 months ago", "contact": "***-***-1234"},
        {"name": "Jane Smith", "blood_type": "A-", "location": "Uptown", "last_donation": "5 months ago", "contact": "***-***-5678"}
    ]
    
    if blood_type:
        mock_donors = [d for d in mock_donors if d['blood_type'] == blood_type]
    
    return jsonify({"donors": mock_donors})

if __name__ == '__main__':
    app.run(debug=True)