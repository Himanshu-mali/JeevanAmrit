import random
from datetime import datetime, timedelta

def predict_disease_outbreak(text):
    """Predict disease outbreaks based on keywords (simulated)."""
    # In a real app, this would analyze social media/news data
    diseases = {
        'flu': {
            'current_level': random.choice(['low', 'moderate', 'high']),
            'trend': random.choice(['increasing', 'stable', 'decreasing']),
            'hotspots': random.sample(['North District', 'South District', 'East Side'], random.randint(1, 3))
        },
        'dengue': {
            'current_level': random.choice(['low', 'moderate']),
            'trend': random.choice(['increasing', 'stable']),
            'hotspots': random.sample(['West Area', 'Central Zone'], random.randint(0, 2))
        },
        'covid': {
            'current_level': random.choice(['low']),
            'trend': 'stable',
            'hotspots': []
        }
    }
    
    # Check if specific disease mentioned
    mentioned_diseases = []
    for disease in diseases:
        if disease in text.lower():
            mentioned_diseases.append(disease)
    
    if not mentioned_diseases:
        mentioned_diseases = list(diseases.keys())
    
    response = {
        "diseases": {},
        "advice": generate_prevention_advice(mentioned_diseases)
    }
    
    for disease in mentioned_diseases:
        response['diseases'][disease] = diseases[disease]
    
    return response

def generate_prevention_advice(diseases):
    advice = []
    if 'flu' in diseases:
        advice.append("Flu: Consider vaccination, practice good hand hygiene, stay home if sick.")
    if 'dengue' in diseases:
        advice.append("Dengue: Use mosquito repellent, wear long sleeves, eliminate standing water.")
    if 'covid' in diseases:
        advice.append("COVID-19: Consider vaccination, wear masks in crowded places, practice social distancing if cases are rising.")
    
    return advice