import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Speech extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      level: 'easy',
      currentQuestionIndex: 0,
      userSpeech: '',
      feedback: '',
      practiceConvo: '',
      isListening: false, // Track if recognition is active
      questions: {
        easy: [
          {
            question: 'Pronounce the word "Happy"',
            answer: 'Happy',
          },
          {
            question: 'Say: "The cat is on the table."',
            answer: 'The cat is on the table.',
          },
        ],
      },
    };

    this.recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    this.recognition.continuous = false;
    this.recognition.lang = 'en-US';

    this.recognition.onresult = (event) => {
      const userSpeech = event.results[0][0].transcript.trim();
      this.setState({ userSpeech, isListening: false }, this.provideFeedback);
    };

    this.recognition.onend = () => {
      this.setState({ isListening: false }); // Reset listening state on stop
    };
  }

  startSpeechRecognition = () => {
    if (!this.state.isListening) {
      this.setState({ feedback: '', isListening: true }, () => {
        this.recognition.start();
      });
    }
  };

  provideFeedback = () => {
    const { userSpeech, questions, level, currentQuestionIndex } = this.state;
    const correctAnswer = questions[level][currentQuestionIndex].answer.toLowerCase();
    const similarityScore = this.calculateSimilarity(userSpeech.toLowerCase(), correctAnswer);

    let feedback = '';
    if (similarityScore > 0.8) {
      feedback = 'Excellent pronunciation! ✅';
    } else if (similarityScore > 0.5) {
      feedback = 'Good attempt, but needs improvement. 👍';
    } else {
      feedback = 'Try again, focus on pronunciation. ❌';
    }

    this.setState({ feedback });
  };

  calculateSimilarity(str1, str2) {
    const matches = str1.split(' ').filter((word) => str2.includes(word)).length;
    return matches / Math.max(str1.split(' ').length, str2.split(' ').length);
  }

  handlePracticeConversation = (event) => {
    this.setState({ practiceConvo: event.target.value });
  };

  render() {
    const { level, currentQuestionIndex, questions, feedback, userSpeech, practiceConvo, isListening } = this.state;
    const currentQuestion = questions[level][currentQuestionIndex];

    return (
      <div style={{ backgroundColor: '#F5F5F5', minHeight: '100vh', padding: '20px' }}>
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '15px',
            padding: '20px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            maxWidth: '600px',
            margin: '0 auto',
          }}
        >
          <h3 style={{ color: '#C06500', fontWeight: 'bold', marginBottom: '20px' }}>
            {currentQuestion.question}
          </h3>

          <button
            onClick={this.startSpeechRecognition}
            style={{
              backgroundColor: isListening ? '#FFA500' : '#C06500', // Change color when listening
              color: '#FFFFFF',
              padding: '10px 20px',
              borderRadius: '5px',
              border: 'none',
              cursor: 'pointer',
            }}
            disabled={isListening} // Prevent multiple starts
          >
            🎙️ {isListening ? 'Listening...' : 'Start Speaking'}
          </button>

          {userSpeech && (
            <div style={{ marginTop: '20px', color: '#666666' }}>
              <p><strong>Your Speech:</strong> {userSpeech}</p>
              <p><strong>Feedback:</strong> {feedback}</p>
            </div>
          )}

          <div style={{ marginTop: '30px' }}>
            <h4 style={{ color: '#C06500' }}>Practice Conversation:</h4>
            <textarea
              value={practiceConvo}
              onChange={this.handlePracticeConversation}
              placeholder="Type your practice sentence here..."
              style={{ width: '100%', height: '80px', padding: '10px' }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Speech;
