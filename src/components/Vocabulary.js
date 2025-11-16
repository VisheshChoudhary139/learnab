import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Vocabulary extends Component {
  static propTypes = {
    goBack: PropTypes.func.isRequired
  };

  handleReadAloud = () => {
    const text = "Vocabulary Games: Expand your word knowledge with flashcards, word matching, and context-based learning.";
    const speech = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(speech);
  };

  render() {
    return (
      <div style={{ backgroundColor: '#F5F5F5', minHeight: '100vh', paddingBottom: '50px' }}>
        <div className="container mt-4">
          <button className="btn btn-outline-secondary mb-3" onClick={this.props.goBack}>🔙 Back</button>

          <div className="text-center mb-5">
            <h1 style={{ color: '#C06500', fontWeight: 'bold', fontSize: '2.5rem' }}>Vocabulary Builder</h1>
            <p style={{ color: '#666666', fontSize: '1.2rem' }}>Expand your word power through engaging games and activities.</p>
            <button 
              onClick={this.handleReadAloud} 
              className="btn btn-success mt-3"
              style={{
                backgroundColor: '#C06500',
                color: '#FFFFFF',
                fontSize: '1.1rem',
                padding: '12px 30px',
                borderRadius: '25px'
              }}
              aria-label="Read Description Aloud"
            >
              📢 Read Aloud
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Vocabulary;
