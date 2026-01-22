# AI Relationship Advisor Chatbot

A beautiful, modern AI chatbot that provides relationship advice for friendships, family, romantic relationships, and work relationships. Built with HTML5, CSS, JavaScript, and Python Flask backend.

## Features

- 🤖 **AI-Powered Responses** - Intelligent relationship advice powered by Python backend
- 💬 **Multiple Relationship Types** - Support for friendships, family, romantic, and work relationships
- 🎨 **Modern UI** - Beautiful gradient design with smooth animations
- 📱 **Responsive Design** - Works perfectly on desktop and mobile devices
- ⚡ **Real-time Chat** - Instant responses with typing indicators
- 🔄 **Fallback Mode** - Works even if Python backend is not running

## Project Structure

```
chatbot2/
├── index.html      # Main HTML structure
├── styles.css      # Beautiful CSS styling
├── script.js       # Frontend JavaScript (connects to Python backend)
├── app.py          # Python Flask backend API
├── requirements.txt # Python dependencies
└── README.md       # This file
```

## Setup Instructions

### 1. Install Python Dependencies

Make sure you have Python 3.7+ installed, then install the required packages:

```bash
pip install -r requirements.txt
```

### 2. Start the Python Backend

Run the Flask server:

```bash
python app.py
```

You should see:
```
🤖 AI Relationship Advisor API starting...
📡 Server running on http://localhost:5000
💬 Chat endpoint: http://localhost:5000/chat
```

### 3. Open the Frontend

Open `index.html` in your web browser. You can:
- Double-click the file to open it
- Or use a local server (recommended):
  ```bash
  # Using Python's built-in server
  python -m http.server 8000
  # Then open http://localhost:8000 in your browser
  ```

## Usage

1. **Start a Conversation**: Type your message in the input box or click one of the quick action buttons
2. **Choose a Topic**: Use the buttons for Friendship, Family, Romantic, or Work relationships
3. **Get Advice**: The AI will analyze your message and provide helpful relationship advice
4. **Continue Chatting**: Keep the conversation going to explore different aspects

## API Endpoints

The Python backend provides the following endpoints:

- `GET /` - API information
- `GET /health` - Health check
- `POST /chat` - Send messages and get AI responses
- `GET /topics` - Get available relationship topics

### Example API Usage

```bash
# Send a chat message
curl -X POST http://localhost:5000/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "I need help with my friend", "topic": null}'
```

## Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Python 3, Flask, Flask-CORS
- **Features**: RESTful API, Real-time chat, Responsive design

## Notes

- The chatbot works in **fallback mode** if the Python backend is not running, but with limited functionality
- For full AI capabilities, make sure the Python backend is running on `http://localhost:5000`
- The chatbot automatically detects the relationship type from your messages
- All conversations are processed in real-time with typing indicators

## Troubleshooting

**Backend not connecting?**
- Make sure Python is installed and Flask is running
- Check that port 5000 is not being used by another application
- Verify you've installed all requirements: `pip install -r requirements.txt`

**CORS errors?**
- The Flask app includes CORS support, but if you see errors, make sure you're accessing the HTML file through a web server (not just file://)

## License

This project is open source and available for personal and educational use.

---

Made with ❤️ for better relationships
