import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './AIChatBox.css';

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
      this.setState((prevState) => ({
        messages: [...prevState.messages, { text: aiResponse, sender: 'ai' }],
      }));
    }
  };

  getAIResponse = async (question) => {
    const responses = {
      "hello": "Hello! How can I assist you today? :)",
      "how are you": "I'm here to help! How about you?",
      "what is react": "React is a JavaScript library for building UI! ⚛",
    };
    return responses[question.toLowerCase()] || "I'm still learning! Ask me anything else.";
  };

  render() {
    const { messages, userInput } = this.state;

    return (
        <div className="chatbox-container">
          <h1 className="chatbox-header"><img src="./technology.png"/> AI Chatbox</h1>
          <div className="chatbox-window">
            {messages.map((msg, index) => (
                <div
                    key={index}
                    className={msg.sender === 'user' ? 'chatbox-user-message' : 'chatbox-ai-message'}
                >
                  {msg.text}
                </div>
            ))}
          </div>
          <div className="chatbox-input-area">
            <input
                type="text"
                value={userInput}
                onChange={this.handleInputChange}
                placeholder="Ask me anything..."
                className="chatbox-input"
            />
            <button className="chatbox-send-button" onClick={this.handleSendMessage}><img src="./paper-plane.png"
                                                                                          alt="Rhyme"/> Send
            </button>
          </div>
        </div>
    );
  }
}

export default AIChatBox;
