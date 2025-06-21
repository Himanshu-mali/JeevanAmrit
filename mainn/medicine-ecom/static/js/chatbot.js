document.addEventListener('DOMContentLoaded', function() {
    const chatbotInput = document.querySelector('.chatbot-input input');
    const sendBtn = document.querySelector('.chatbot-input button:first-child');
    const voiceBtn = document.querySelector('.chatbot-input .voice-command');
    const messagesContainer = document.querySelector('.chatbot-messages');
    
    // Initial bot message
    addBotMessage("Hello! I'm your Health Companion. How can I help you today? You can ask about medicines, symptoms, or mental health support.");
    
    sendBtn.addEventListener('click', sendMessage);
    chatbotInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') sendMessage();
    });
    
    voiceBtn.addEventListener('click', toggleVoiceRecognition);
    
    function sendMessage() {
        const message = chatbotInput.value.trim();
        if (message) {
            addUserMessage(message);
            chatbotInput.value = '';
            
            // Simulate thinking
            setTimeout(() => {
                processUserMessage(message);
            }, 500);
        }
    }
    
    function addUserMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user-message';
        messageDiv.textContent = text;
        messagesContainer.appendChild(messageDiv);
        scrollToBottom();
    }
    
    function addBotMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot-message';
        messageDiv.textContent = text;
        messagesContainer.appendChild(messageDiv);
        scrollToBottom();
    }
    
    function scrollToBottom() {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    function toggleVoiceRecognition() {
        if (!('webkitSpeechRecognition' in window)) {
            addBotMessage("Sorry, voice recognition is not supported in your browser.");
            return;
        }
        
        const recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        
        voiceBtn.innerHTML = '<i class="fas fa-microphone-slash"></i>';
        voiceBtn.style.background = 'var(--danger-color)';
        
        recognition.onresult = function(event) {
            const transcript = event.results[0][0].transcript;
            chatbotInput.value = transcript;
            sendMessage();
        };
        
        recognition.onerror = function(event) {
            addBotMessage("Error occurred in recognition: " + event.error);
        };
        
        recognition.onend = function() {
            voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
            voiceBtn.style.background = 'var(--primary-color)';
        };
        
        recognition.start();
    }
    
    function processUserMessage(message) {
        // In a real app, this would call your Python backend API
        // For demo, we'll use simple pattern matching
        
        message = message.toLowerCase();
        
        if (message.includes('medicine') || message.includes('drug') || message.includes('pill')) {
            // Medicine information request
            const medicineName = extractMedicineName(message);
            if (medicineName) {
                fetchMedicineInfo(medicineName);
            } else {
                addBotMessage("Which medicine would you like information about?");
            }
        } 
        else if (message.includes('depress') || message.includes('anxiety') || message.includes('sad')) {
            // Mental health analysis
            analyzeMentalHealth(message);
        }
        else if (message.includes('symptom') || message.includes('feel')) {
            // Symptom analysis
            analyzeSymptoms(message);
        }
        else if (message.includes('disease') || message.includes('outbreak')) {
            // Disease outbreak info
            getDiseaseOutbreakInfo();
        }
        else if (message.includes('blood') || message.includes('donate')) {
            // Blood donation info
            getBloodDonationInfo();
        }
        else {
            addBotMessage("I'm not sure I understand. Can you rephrase your question or ask about medicines, symptoms, or mental health?");
        }
    }
    
    function extractMedicineName(message) {
        // Simple extraction - in a real app, use NLP
        const medKeywords = ['about', 'information', 'for', 'on'];
        const words = message.split(' ');
        
        for (let i = 0; i < words.length; i++) {
            if (medKeywords.includes(words[i]) && i < words.length - 1) {
                return words[i + 1];
            }
        }
        
        return null;
    }
    
    function fetchMedicineInfo(medicineName) {
        // Simulate API call
        setTimeout(() => {
            const mockData = {
                'paracetamol': {
                    name: 'Paracetamol',
                    uses: 'Used to treat pain and fever.',
                    dosage: '500mg every 4-6 hours as needed.',
                    sideEffects: 'Rare but may include skin reactions.',
                    warnings: 'Do not exceed recommended dose.'
                },
                'ibuprofen': {
                    name: 'Ibuprofen',
                    uses: 'Used for pain, inflammation, and fever.',
                    dosage: '200-400mg every 4-6 hours.',
                    sideEffects: 'May cause stomach pain or heartburn.',
                    warnings: 'Not recommended for people with stomach ulcers.'
                },
                'omeprazole': {
                    name: 'Omeprazole',
                    uses: 'Treats heartburn and acid reflux.',
                    dosage: '20mg once daily before a meal.',
                    sideEffects: 'May cause headache or diarrhea.',
                    warnings: 'Consult doctor if symptoms persist.'
                }
            };
            
            const info = mockData[medicineName.toLowerCase()] || {
                name: medicineName,
                info: "I couldn't find detailed information about this medicine. Please consult a healthcare professional."
            };
            
            let response = `Information about ${info.name}:\n`;
            response += `Uses: ${info.uses}\n`;
            response += `Dosage: ${info.dosage}\n`;
            response += `Side Effects: ${info.sideEffects}\n`;
            response += `Warnings: ${info.warnings}`;
            
            addBotMessage(response);
        }, 1000);
    }
    
    function analyzeMentalHealth(message) {
        // Simulate AI analysis
        setTimeout(() => {
            const keywords = {
                depressed: 3, depression: 3, sad: 2, unhappy: 2, hopeless: 3,
                anxious: 2, anxiety: 2, nervous: 1, worry: 1, stressed: 1
            };
            
            let score = 0;
            for (const [word, value] of Object.entries(keywords)) {
                if (message.includes(word)) score += value;
            }
            
            let response;
            if (score >= 5) {
                response = "I notice you might be experiencing some significant distress. ";
                response += "Here are some coping strategies:\n";
                response += "- Practice deep breathing exercises\n";
                response += "- Reach out to a trusted friend or family member\n";
                response += "- Consider contacting a mental health professional\n";
                response += "Would you like me to help you find local mental health resources?";
            } else if (score >= 2) {
                response = "It sounds like you might be feeling a bit down or anxious. ";
                response += "Some things that might help:\n";
                response += "- Take a short walk outside\n";
                response += "- Try a mindfulness exercise\n";
                response += "- Write down your thoughts in a journal";
            } else {
                response = "Everyone feels down sometimes. ";
                response += "Remember to practice self-care and reach out for support if needed.";
            }
            
            addBotMessage(response);
        }, 1500);
    }
    
    function analyzeSymptoms(message) {
        // Simulate symptom analysis
        setTimeout(() => {
            const responses = {
                headache: "For headaches, try resting in a quiet room and drinking water. Paracetamol may help.",
                fever: "For fever, stay hydrated and rest. Paracetamol can reduce fever.",
                cough: "For cough, honey and warm liquids may help. See a doctor if it persists.",
                stomach: "For stomach issues, try bland foods and stay hydrated. Consult a doctor if severe."
            };
            
            let found = false;
            for (const [symptom, response] of Object.entries(responses)) {
                if (message.includes(symptom)) {
                    addBotMessage(response);
                    found = true;
                    break;
                }
            }
            
            if (!found) {
                addBotMessage("I'm not sure about these symptoms. It's best to consult a healthcare professional for accurate diagnosis.");
            }
        }, 1000);
    }
    
    function getDiseaseOutbreakInfo() {
        // Simulate disease outbreak prediction
        setTimeout(() => {
            const outbreaks = [
                { disease: "Flu", location: "your region", level: "moderate", advice: "Consider getting a flu vaccine and practice good hygiene." },
                { disease: "Dengue", location: "nearby areas", level: "low", advice: "Use mosquito repellent and eliminate standing water." }
            ];
            
            let response = "Based on recent data:\n";
            outbreaks.forEach(outbreak => {
                response += `- ${outbreak.disease} activity is ${outbreak.level} in ${outbreak.location}. ${outbreak.advice}\n`;
            });
            response += "Would you like more specific information about any of these?";
            
            addBotMessage(response);
        }, 2000);
    }
    
    function getBloodDonationInfo() {
        // Simulate blood donation platform info
        setTimeout(() => {
            addBotMessage("Our blood donation platform connects donors with those in need. ");
            addBotMessage("Would you like to:\n1. Find a blood donation center\n2. Request blood\n3. Become a donor?");
        }, 1000);
    }
});