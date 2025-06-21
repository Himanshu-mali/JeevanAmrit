from textblob import TextBlob
import numpy as np

def analyze_mental_health(text):
    """Analyze text for signs of depression/anxiety."""
    analysis = TextBlob(text)
    
    # Sentiment analysis
    polarity = analysis.sentiment.polarity  # -1 to 1
    subjectivity = analysis.sentiment.subjectivity  # 0 to 1
    
    # Keyword analysis
    depression_keywords = ['depress', 'sad', 'hopeless', 'worthless', 'empty']
    anxiety_keywords = ['anxious', 'worry', 'nervous', 'panic', 'stress']
    
    depression_score = sum(text.lower().count(word) for word in depression_keywords)
    anxiety_score = sum(text.lower().count(word) for word in anxiety_keywords)
    
    # Determine risk level
    if depression_score >= 3 or anxiety_score >= 3 or polarity < -0.5:
        risk_level = "high"
    elif depression_score >= 1 or anxiety_score >= 1 or polarity < 0:
        risk_level = "moderate"
    else:
        risk_level = "low"
    
    # Generate response
    response = {
        "analysis": {
            "sentiment": {
                "polarity": polarity,
                "subjectivity": subjectivity
            },
            "keyword_counts": {
                "depression": depression_score,
                "anxiety": anxiety_score
            },
            "risk_level": risk_level
        },
        "response": generate_coping_strategies(risk_level),
        "suggestions": generate_suggestions(risk_level)
    }
    
    return response

def generate_coping_strategies(risk_level):
    if risk_level == "high":
        return ("I notice some signs that you might be struggling. "
                "Please consider reaching out to a mental health professional. "
                "In the meantime, here are some coping strategies:\n"
                "- Practice deep breathing exercises\n"
                "- Reach out to a trusted friend or family member\n"
                "- Try grounding techniques (name 5 things you can see, 4 you can touch, etc.)")
    elif risk_level == "moderate":
        return ("It sounds like you might be feeling some distress. "
                "Here are some things that might help:\n"
                "- Take a short walk outside\n"
                "- Try a mindfulness exercise\n"
                "- Write down your thoughts in a journal")
    else:
        return ("Everyone experiences ups and downs. "
                "Remember to practice self-care with adequate sleep, nutrition, and social connection.")

def generate_suggestions(risk_level):
    if risk_level == "high":
        return ["Contact a mental health professional", "Reach out to a support network", "Consider crisis hotline if needed"]
    elif risk_level == "moderate":
        return ["Practice relaxation techniques", "Maintain a regular routine", "Limit alcohol and caffeine"]
    else:
        return ["Continue healthy habits", "Check in with yourself regularly"]