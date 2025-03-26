import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class AIChatBox extends Component {
  static propTypes = {
    onNavigate: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      userInput: '',
    };
  }

  handleInputChange = (e) => {
    this.setState({ userInput: e.target.value });
  };

  handleSendMessage = async () => {
    const { messages, userInput } = this.state;
    if (userInput.trim()) {
      this.setState({
        messages: [...messages, { text: userInput, sender: 'user' }],
        userInput: '',
      });

      const aiResponse = await this.getAIResponse(userInput);
      this.setState({
        messages: [...this.state.messages, { text: aiResponse, sender: 'ai' }],
      });
    }
  };

  getAIResponse = async (question) => {
    const responses = {
      "hello": "Hello! How can I assist you today? 😊",
      "how are you": "I'm here to help! How about you?",
      "what is react": "React is a JavaScript library for building UI! ⚛️",
    };
    return responses[question.toLowerCase()] || "I'm still learning! 🤖 Ask me anything else.";
  };

  render() {
    const { messages, userInput } = this.state;

    return (
      <div style={styles.container}>
        <h1 style={styles.header}>💬 AI Chatbox</h1>
        <div style={styles.chatWindow}>
          {messages.map((msg, index) => (
            <div
              key={index}
              style={msg.sender === 'user' ? styles.userMessage : styles.aiMessage}
            >
              {msg.text}
            </div>
          ))}
        </div>
        <div style={styles.inputArea}>
          <input
            type="text"
            value={userInput}
            onChange={this.handleInputChange}
            placeholder="Ask me anything..."
            style={styles.input}
          />
          <button style={styles.sendButton} onClick={this.handleSendMessage}>📩 Send</button>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    maxWidth: '100%',
    margin: '0 auto',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  header: {
    color: '#333',
    marginBottom: '20px',
  },
  chatWindow: {
    height: '400px',
    overflowY: 'auto',
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '15px',
    border: '1px solid #ddd',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  userMessage: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '10px 15px',
    borderRadius: '50px',
    margin: '10px',
    textAlign: 'right',
    maxWidth: '60%',
    alignSelf: 'flex-end',
  },
  aiMessage: {
    backgroundColor: '#f0f0f0',
    color: '#333',
    padding: '10px 15px',
    borderRadius: '50px',
    margin: '10px',
    textAlign: 'left',
    maxWidth: '60%',
    alignSelf: 'flex-start',
  },
  inputArea: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginTop: '10px',
  },
  input: {
    flex: 1,
    padding: '10px',
    borderRadius: '50px',
    border: '1px solid #ddd',
    width: '70%',
    textAlign: 'center',
  },
  sendButton: {
    padding: '10px 20px',
    backgroundColor: 'orange',
    color: '#fff',
    border: 'none',
    borderRadius: '50px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};

export default AIChatBox;