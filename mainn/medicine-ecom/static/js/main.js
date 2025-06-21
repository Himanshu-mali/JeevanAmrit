// Toggle chatbot visibility
document.addEventListener('DOMContentLoaded', function() {
    const chatbotToggle = document.createElement('div');
    chatbotToggle.className = 'chatbot-toggle';
    chatbotToggle.innerHTML = '<i class="fas fa-robot"></i>';
    document.body.appendChild(chatbotToggle);
    
    const chatbotContainer = document.querySelector('.chatbot-container');
    const closeChatbot = document.querySelector('.close-chatbot');
    
    // Make chatbot visible by default
    chatbotContainer.style.display = 'flex';
    
    chatbotToggle.addEventListener('click', function() {
        chatbotContainer.style.display = chatbotContainer.style.display === 'flex' ? 'none' : 'flex';
    });
    
    closeChatbot.addEventListener('click', function() {
        chatbotContainer.style.display = 'none';
    });
    
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Initialize fall detection if on dashboard
    if (window.location.pathname === '/dashboard') {
        initializeFallDetection();
    }

    // Blood donation feature button click handling
    const featureBtns = document.querySelectorAll('.feature-btn');
    const bloodDonation = document.getElementById('blood-donation');

    featureBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.dataset.feature === 'blood') {
                if (bloodDonation.style.display === 'block') {
                    bloodDonation.style.display = 'none';
                } else {
                    bloodDonation.style.display = 'block';
                }
            } else {
                bloodDonation.style.display = 'none';
            }
        });
    });
});

// Fall detection
function initializeFallDetection() {
    if (window.DeviceMotionEvent) {
        let lastAcceleration = { x: null, y: null, z: null };
        let lastUpdate = 0;
        const threshold = 15; // Adjust this value based on sensitivity
        
        window.addEventListener('devicemotion', function(event) {
            const acceleration = event.accelerationIncludingGravity;
            const now = Date.now();
            
            if (lastAcceleration.x !== null && now - lastUpdate > 100) {
                const deltaX = Math.abs(acceleration.x - lastAcceleration.x);
                const deltaY = Math.abs(acceleration.y - lastAcceleration.y);
                const deltaZ = Math.abs(acceleration.z - lastAcceleration.z);
                
                const totalAcceleration = Math.sqrt(deltaX * deltaX + deltaY * deltaY + deltaZ * deltaZ);
                
                if (totalAcceleration > threshold) {
                    // Possible fall detected
                    showFallAlert();
                }
            }
            
            lastAcceleration = {
                x: acceleration.x,
                y: acceleration.y,
                z: acceleration.z
            };
            lastUpdate = now;
        });
    } else {
        console.log("DeviceMotionEvent is not supported");
    }
}

function showFallAlert() {
    if (confirm("We detected a possible fall. Are you okay?")) {
        // User is okay
    } else {
        // Send alert to caregivers
        alert("Alert sent to your emergency contacts!");
        // In a real app, this would call an API to notify caregivers
    }
}
