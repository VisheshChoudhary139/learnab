import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
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
    const OPENROUTER_API_KEY = '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';

    const url = "https://openrouter.ai/api/v1/chat/completions";

    const headers = {
      "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "http://localhost:3000",
      "X-Title": "AIChatBox",
    };

    const data = {
      model: "deepseek/deepseek-r1:free",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: question }
      ]
    };

    try {
      const response = await axios.post(url, data, { headers });
      return response.data.choices[0].message.content.trim();
    } catch (error) {
      console.error("Error fetching AI response:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      return "Oops! Something went wrong while talking to DeepSeek R1.";
    }
  };

  render() {
    const { messages, userInput } = this.state;

    return (
        <div className="chatbox-container">
          <h1 className="chatbox-header">
            <img src="./technology.png" alt="tech" /> AI Chatbox
          </h1>
          <div className="chatbox-window">
            {messages.map((msg, index) => (
                <div
                    key={index}
                    className={msg.sender === 'user' ? 'chatbox-user-message' : 'chatbox-ai-message'}
                >
                  {msg.sender === 'ai' ? (
                      <ReactMarkdown>{msg.text}</ReactMarkdown>
                  ) : (
                      msg.text
                  )}
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
            <button className="chatbox-send-button" onClick={this.handleSendMessage}>
              <img src="./paper-plane.png" alt="Send" /> Send
            </button>
          </div>
        </div>
    );
  }
}

export default AIChatBox;
