// Chatbot AI Logic for Relationship Advice

const chatContainer = document.getElementById('chatContainer');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const quickActions = document.getElementById('quickActions');

// Relationship advice knowledge base
const adviceDatabase = {
    friendship: {
        keywords: ['friend', 'friendship', 'buddy', 'pal', 'mate', 'best friend', 'close friend'],
        responses: [
            "Friendships are built on trust, respect, and mutual understanding. Communication is key - try to express your feelings honestly but kindly.",
            "If you're having issues with a friend, consider having an open conversation. Sometimes misunderstandings can be resolved through honest dialogue.",
            "Remember that good friendships require effort from both sides. Make sure you're both investing time and energy into the relationship.",
            "Boundaries are important in friendships. It's okay to say no and prioritize your own well-being.",
            "If a friendship is causing more stress than joy, it might be time to reassess. Healthy friendships should be supportive and positive."
        ]
    },
    family: {
        keywords: ['family', 'parent', 'mother', 'father', 'sibling', 'brother', 'sister', 'cousin', 'relative', 'mom', 'dad'],
        responses: [
            "Family relationships can be complex. Remember that everyone has different perspectives and experiences that shape their behavior.",
            "When dealing with family conflicts, try to understand their point of view first before expressing your own.",
            "Setting boundaries with family members is healthy and necessary. You can love someone while still maintaining your personal space.",
            "Family dynamics often involve patterns that have developed over years. Change takes time and patience.",
            "If family relationships are strained, consider family therapy or mediation. Sometimes an outside perspective helps.",
            "Remember that you can't control how others behave, but you can control your reactions and responses."
        ]
    },
    romantic: {
        keywords: ['romantic', 'boyfriend', 'girlfriend', 'partner', 'relationship', 'dating', 'love', 'spouse', 'husband', 'wife'],
        responses: [
            "Healthy romantic relationships are built on communication, trust, and mutual respect. Make sure you're both on the same page about your needs and expectations.",
            "If you're facing challenges in your relationship, try to approach conversations with empathy and a willingness to understand your partner's perspective.",
            "Remember that relationships require compromise, but not at the expense of your core values or well-being.",
            "Quality time together is important, but so is maintaining your individual identity and interests.",
            "If you're experiencing conflicts, consider couples counseling. There's no shame in seeking professional help.",
            "Trust is fundamental. If trust has been broken, rebuilding it takes time, consistency, and transparency."
        ]
    },
    work: {
        keywords: ['work', 'colleague', 'boss', 'manager', 'coworker', 'office', 'professional', 'job', 'career', 'team'],
        responses: [
            "Professional relationships require clear communication and respect for boundaries. Keep interactions professional and constructive.",
            "If you're having issues with a colleague, try to address concerns directly but diplomatically. Document important conversations if needed.",
            "Set clear boundaries between work and personal life. It's important to maintain a healthy work-life balance.",
            "If workplace conflicts arise, consider speaking with HR or a supervisor. Don't hesitate to seek support when needed.",
            "Building positive work relationships involves collaboration, respect, and being reliable. Focus on being a good team player.",
            "Remember that you can't control others' behavior, but you can control your professionalism and responses."
        ]
    },
    general: {
        responses: [
            "I understand you're going through a challenging situation. Can you tell me more about what's happening?",
            "Relationships can be complicated, but open communication is often the first step toward resolution.",
            "It's important to remember that healthy relationships should make you feel supported and valued.",
            "Sometimes taking a step back and reflecting on what you need from a relationship can help clarify things.",
            "Would you like to discuss a specific type of relationship? I can help with friendships, family, romantic relationships, or work relationships."
        ]
    }
};

// Conversation context
let conversationContext = {
    topic: null,
    previousMessages: []
};

// Add message to chat
function addMessage(text, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = isUser ? '👤' : '🤖';
    
    const content = document.createElement('div');
    content.className = 'message-content';
    
    // Split text by paragraphs if it contains multiple sentences
    const paragraphs = text.split('\n').filter(p => p.trim());
    paragraphs.forEach(para => {
        const p = document.createElement('p');
        p.textContent = para;
        content.appendChild(p);
    });
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(content);
    chatContainer.appendChild(messageDiv);
    
    // Save to context
    conversationContext.previousMessages.push({
        text,
        isUser,
        timestamp: Date.now()
    });
    
    // Scroll to bottom
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Show typing indicator
function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message typing-message';
    typingDiv.id = 'typingIndicator';
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = '🤖';
    
    const content = document.createElement('div');
    content.className = 'message-content typing-indicator';
    content.innerHTML = '<span></span><span></span><span></span>';
    
    typingDiv.appendChild(avatar);
    typingDiv.appendChild(content);
    chatContainer.appendChild(typingDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Remove typing indicator
function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Analyze user message and determine topic
function analyzeMessage(message) {
    const lowerMessage = message.toLowerCase();
    
    for (const [topic, data] of Object.entries(adviceDatabase)) {
        if (topic === 'general') continue;
        
        if (data.keywords.some(keyword => lowerMessage.includes(keyword))) {
            return topic;
        }
    }
    
    return null;
}

// Generate AI response
function generateResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for greetings
    if (lowerMessage.match(/^(hi|hello|hey|greetings|good morning|good afternoon|good evening)/)) {
        return "Hello! I'm here to help you with relationship advice. Whether it's about friendships, family, romantic relationships, or work relationships, I'm ready to listen and provide guidance. What would you like to discuss?";
    }
    
    // Check for thanks/gratitude
    if (lowerMessage.match(/(thank|thanks|appreciate|grateful)/)) {
        return "You're welcome! I'm glad I could help. If you have any other relationship questions or concerns, feel free to ask. Remember, healthy relationships take work, but they're worth it!";
    }
    
    // Check for goodbye
    if (lowerMessage.match(/(bye|goodbye|see you|farewell|exit)/)) {
        return "Goodbye! Take care, and remember that seeking help and advice shows strength. I'm here whenever you need to talk about relationships. Best of luck!";
    }
    
    // Determine topic
    const detectedTopic = analyzeMessage(userMessage);
    if (detectedTopic) {
        conversationContext.topic = detectedTopic;
    }
    
    // Get topic-specific responses
    const topic = conversationContext.topic || 'general';
    const responses = adviceDatabase[topic]?.responses || adviceDatabase.general.responses;
    
    // Select a response (can be made smarter with context)
    let response = responses[Math.floor(Math.random() * responses.length)];
    
    // Add contextual follow-up
    if (topic !== 'general') {
        const topicNames = {
            friendship: 'friendship',
            family: 'family relationship',
            romantic: 'romantic relationship',
            work: 'work relationship'
        };
        
        response += `\n\nIs there a specific aspect of this ${topicNames[topic]} you'd like to explore further?`;
    }
    
    return response;
}

// Handle user input
function handleUserInput() {
    const message = userInput.value.trim();
    
    if (!message) return;
    
    // Add user message
    addMessage(message, true);
    userInput.value = '';
    
    // Disable input while processing
    sendBtn.disabled = true;
    userInput.disabled = true;
    
    // Show typing indicator
    showTypingIndicator();
    
    // Simulate AI thinking time
    setTimeout(() => {
        removeTypingIndicator();
        
        // Generate and add bot response
        const response = generateResponse(message);
        addMessage(response);
        
        // Re-enable input
        sendBtn.disabled = false;
        userInput.disabled = false;
        userInput.focus();
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
}

// Handle quick action buttons
quickActions.addEventListener('click', (e) => {
    if (e.target.classList.contains('quick-btn')) {
        const topic = e.target.dataset.topic;
        const topicNames = {
            friendship: 'friendship',
            family: 'family',
            romantic: 'romantic relationship',
            work: 'work relationship'
        };
        
        conversationContext.topic = topic;
        
        const message = `I'd like to discuss ${topicNames[topic]} issues.`;
        userInput.value = message;
        handleUserInput();
    }
});

// Send button click
sendBtn.addEventListener('click', handleUserInput);

// Enter key press
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !sendBtn.disabled) {
        handleUserInput();
    }
});

// Focus input on load
userInput.focus();

// Welcome message suggestions
setTimeout(() => {
    addMessage("💡 Tip: You can click the quick action buttons above to start a conversation about a specific type of relationship, or just type your question directly!");
}, 2000);
