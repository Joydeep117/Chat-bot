from flask import Flask, request, jsonify
from flask_cors import CORS
import re
import random
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

# Enhanced relationship advice knowledge base
RELATIONSHIP_ADVICE = {
    'friendship': {
        'keywords': ['friend', 'friendship', 'buddy', 'pal', 'mate', 'best friend', 'close friend', 'friends'],
        'responses': [
            "Friendships are built on trust, respect, and mutual understanding. Communication is key - try to express your feelings honestly but kindly.",
            "If you're having issues with a friend, consider having an open conversation. Sometimes misunderstandings can be resolved through honest dialogue.",
            "Remember that good friendships require effort from both sides. Make sure you're both investing time and energy into the relationship.",
            "Boundaries are important in friendships. It's okay to say no and prioritize your own well-being.",
            "If a friendship is causing more stress than joy, it might be time to reassess. Healthy friendships should be supportive and positive.",
            "True friends accept you for who you are. If someone constantly criticizes or makes you feel bad about yourself, it might not be a healthy friendship.",
            "Distance and time apart don't have to end friendships. Good friends understand when life gets busy and can pick up where you left off.",
            "Apologizing when you're wrong shows maturity and strengthens friendships. A sincere apology can repair many relationship issues."
        ]
    },
    'family': {
        'keywords': ['family', 'parent', 'mother', 'father', 'sibling', 'brother', 'sister', 'cousin', 'relative', 'mom', 'dad', 'parents'],
        'responses': [
            "Family relationships can be complex. Remember that everyone has different perspectives and experiences that shape their behavior.",
            "When dealing with family conflicts, try to understand their point of view first before expressing your own.",
            "Setting boundaries with family members is healthy and necessary. You can love someone while still maintaining your personal space.",
            "Family dynamics often involve patterns that have developed over years. Change takes time and patience.",
            "If family relationships are strained, consider family therapy or mediation. Sometimes an outside perspective helps.",
            "Remember that you can't control how others behave, but you can control your reactions and responses.",
            "Sometimes the best way to improve family relationships is to focus on what you can change about yourself rather than trying to change others.",
            "Family doesn't always mean blood. Surround yourself with people who support and care for you, regardless of relation."
        ]
    },
    'romantic': {
        'keywords': ['romantic', 'boyfriend', 'girlfriend', 'partner', 'relationship', 'dating', 'love', 'spouse', 'husband', 'wife', 'date'],
        'responses': [
            "Healthy romantic relationships are built on communication, trust, and mutual respect. Make sure you're both on the same page about your needs and expectations.",
            "If you're facing challenges in your relationship, try to approach conversations with empathy and a willingness to understand your partner's perspective.",
            "Remember that relationships require compromise, but not at the expense of your core values or well-being.",
            "Quality time together is important, but so is maintaining your individual identity and interests.",
            "If you're experiencing conflicts, consider couples counseling. There's no shame in seeking professional help.",
            "Trust is fundamental. If trust has been broken, rebuilding it takes time, consistency, and transparency.",
            "Love languages matter - understanding how your partner expresses and receives love can transform your relationship.",
            "Arguments are normal, but how you handle them matters. Focus on the issue, not attacking each other personally."
        ]
    },
    'work': {
        'keywords': ['work', 'colleague', 'boss', 'manager', 'coworker', 'office', 'professional', 'job', 'career', 'team', 'workplace'],
        'responses': [
            "Professional relationships require clear communication and respect for boundaries. Keep interactions professional and constructive.",
            "If you're having issues with a colleague, try to address concerns directly but diplomatically. Document important conversations if needed.",
            "Set clear boundaries between work and personal life. It's important to maintain a healthy work-life balance.",
            "If workplace conflicts arise, consider speaking with HR or a supervisor. Don't hesitate to seek support when needed.",
            "Building positive work relationships involves collaboration, respect, and being reliable. Focus on being a good team player.",
            "Remember that you can't control others' behavior, but you can control your professionalism and responses.",
            "Networking isn't just about advancing your career - it's about building genuine connections with people in your field.",
            "If you're dealing with a difficult boss or manager, document incidents, maintain professionalism, and know when to escalate if necessary."
        ]
    },
    'general': {
        'responses': [
            "I understand you're going through a challenging situation. Can you tell me more about what's happening?",
            "Relationships can be complicated, but open communication is often the first step toward resolution.",
            "It's important to remember that healthy relationships should make you feel supported and valued.",
            "Sometimes taking a step back and reflecting on what you need from a relationship can help clarify things.",
            "Would you like to discuss a specific type of relationship? I can help with friendships, family, romantic relationships, or work relationships.",
            "Every relationship is unique, and what works for one might not work for another. Trust your instincts about what feels right.",
            "Remember that it's okay to walk away from relationships that are consistently harmful or toxic, regardless of the type."
        ]
    }
}

def detect_relationship_topic(message):
    """Detect the relationship topic from user message"""
    message_lower = message.lower()
    
    for topic, data in RELATIONSHIP_ADVICE.items():
        if topic == 'general':
            continue
        if any(keyword in message_lower for keyword in data['keywords']):
            return topic
    
    return None

def generate_response(user_message, context_topic=None):
    """Generate an intelligent response based on user message"""
    message_lower = user_message.lower()
    
    # Handle greetings
    if re.search(r'^(hi|hello|hey|greetings|good morning|good afternoon|good evening)', message_lower):
        return {
            'response': "Hello! I'm your AI Relationship Advisor. I'm here to help you navigate through various relationship challenges - whether it's with friends, family, romantic partners, or colleagues. What would you like to discuss today?",
            'topic': None
        }
    
    # Handle thanks
    if re.search(r'(thank|thanks|appreciate|grateful)', message_lower):
        return {
            'response': "You're welcome! I'm glad I could help. If you have any other relationship questions or concerns, feel free to ask. Remember, healthy relationships take work, but they're worth it!",
            'topic': context_topic
        }
    
    # Handle goodbye
    if re.search(r'(bye|goodbye|see you|farewell|exit)', message_lower):
        return {
            'response': "Goodbye! Take care, and remember that seeking help and advice shows strength. I'm here whenever you need to talk about relationships. Best of luck!",
            'topic': context_topic
        }
    
    # Detect topic from message
    detected_topic = detect_relationship_topic(user_message)
    topic = detected_topic or context_topic or 'general'
    
    # Get appropriate responses
    if topic in RELATIONSHIP_ADVICE:
        responses = RELATIONSHIP_ADVICE[topic]['responses']
    else:
        responses = RELATIONSHIP_ADVICE['general']['responses']
    
    # Select a response
    response = random.choice(responses)
    
    # Add contextual follow-up
    if topic != 'general':
        topic_names = {
            'friendship': 'friendship',
            'family': 'family relationship',
            'romantic': 'romantic relationship',
            'work': 'work relationship'
        }
        response += f"\n\nIs there a specific aspect of this {topic_names.get(topic, topic)} you'd like to explore further?"
    
    return {
        'response': response,
        'topic': topic
    }

@app.route('/')
def index():
    return jsonify({
        'message': 'AI Relationship Advisor API',
        'status': 'running',
        'endpoints': {
            '/chat': 'POST - Send messages to the chatbot',
            '/health': 'GET - Check API health'
        }
    })

@app.route('/health', methods=['GET'])
def health():
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat()
    })

@app.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json()
        user_message = data.get('message', '').strip()
        context_topic = data.get('topic', None)
        
        if not user_message:
            return jsonify({
                'error': 'Message is required'
            }), 400
        
        # Generate response
        result = generate_response(user_message, context_topic)
        
        return jsonify({
            'response': result['response'],
            'topic': result['topic'],
            'timestamp': datetime.now().isoformat()
        })
    
    except Exception as e:
        return jsonify({
            'error': str(e)
        }), 500

@app.route('/topics', methods=['GET'])
def get_topics():
    """Get available relationship topics"""
    topics = {
        'friendship': {
            'name': 'Friendship',
            'icon': '👥',
            'description': 'Advice on friend-related issues'
        },
        'family': {
            'name': 'Family',
            'icon': '👨‍👩‍👧‍👦',
            'description': 'Help with family dynamics'
        },
        'romantic': {
            'name': 'Romantic',
            'icon': '💕',
            'description': 'Guidance on romantic relationships'
        },
        'work': {
            'name': 'Work/Colleagues',
            'icon': '💼',
            'description': 'Professional relationship advice'
        }
    }
    return jsonify(topics)

if __name__ == '__main__':
    print("🤖 AI Relationship Advisor API starting...")
    print("📡 Server running on http://localhost:5000")
    print("💬 Chat endpoint: http://localhost:5000/chat")
    app.run(debug=True, host='0.0.0.0', port=5000)
