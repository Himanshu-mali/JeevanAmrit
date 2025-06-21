document.addEventListener('DOMContentLoaded', function() {
    const voiceBtn = document.getElementById('voice-btn');
    
    if ('webkitSpeechRecognition' in window) {
        const recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        
        voiceBtn.addEventListener('click', function() {
            voiceBtn.innerHTML = '<i class="fas fa-microphone-slash"></i>';
            voiceBtn.classList.remove('btn-light');
            voiceBtn.classList.add('btn-danger');
            
            recognition.onresult = function(event) {
                const command = event.results[0][0].transcript.toLowerCase();
                processVoiceCommand(command);
            };
            
            recognition.onerror = function(event) {
                console.log('Error occurred in recognition: ' + event.error);
                resetVoiceButton();
            };
            
            recognition.onend = function() {
                resetVoiceButton();
            };
            
            recognition.start();
        });
    } else {
        voiceBtn.style.display = 'none';
    }
    
    function resetVoiceButton() {
        voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
        voiceBtn.classList.remove('btn-danger');
        voiceBtn.classList.add('btn-light');
    }
    
    function processVoiceCommand(command) {
        console.log("Voice command:", command);
        
        if (command.includes('home') || command.includes('go home')) {
            window.location.href = '/';
        } 
        else if (command.includes('medicine') || command.includes('drugs')) {
            window.location.href = '/products';
        }
        else if (command.includes('chat') || command.includes('assistant')) {
            document.querySelector('.chatbot-container').style.display = 'flex';
        }
        else if (command.includes('dashboard') || command.includes('health')) {
            window.location.href = '/dashboard';
        }
        else if (command.includes('cart') || command.includes('basket')) {
            window.location.href = '/cart';
        }
        else if (command.includes('search')) {
            const searchTerm = command.replace('search', '').trim();
            if (searchTerm) {
                // In a real app, this would trigger a search
                alert(`Searching for: ${searchTerm}`);
            }
        }
        else {
            alert(`You said: "${command}". I'm not sure how to handle this command yet.`);
        }
    }
});