import random

def recommend_medicine(symptoms, medical_history):
    """Recommend medicine based on symptoms and medical history (simulated)."""
    # In a real app, this would use a more sophisticated algorithm
    medicine_db = {
        'headache': ['Paracetamol', 'Ibuprofen'],
        'fever': ['Paracetamol'],
        'muscle pain': ['Ibuprofen', 'Diclofenac'],
        'heartburn': ['Omeprazole', 'Ranitidine'],
        'allergy': ['Cetirizine', 'Loratadine']
    }
    
    # Check for contraindications
    contraindications = medical_history.get('contraindications', [])
    
    recommendations = []
    for symptom, meds in medicine_db.items():
        if symptom in symptoms.lower():
            for med in meds:
                if med not in contraindications:
                    recommendations.append(med)
    
    if not recommendations:
        return {
            "response": "No specific recommendation based on your symptoms. Please consult a healthcare provider.",
            "recommendations": []
        }
    
    # Remove duplicates and select top 2
    recommendations = list(set(recommendations))[:2]
    
    return {
        "response": f"Based on your symptoms, consider: {', '.join(recommendations)}. Always follow dosage instructions.",
        "recommendations": recommendations,
        "disclaimer": "This is not medical advice. Consult a healthcare professional."
    }