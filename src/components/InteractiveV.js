import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class InteractiveV extends Component {
  static propTypes = {};

  handleReadAloud = () => {
    const text = "Interactive Videos: Learn through engaging video content with built-in questions and activities. Pause to practice concepts, answer embedded questions, and control your learning pace.";
    const speech = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(speech);
  };

  render() {
    return (
      <div style={{ backgroundColor: '#F5F5F5', minHeight: '100vh', paddingBottom: '50px' }}>
        <div className="container mt-4">
        <button className="btn btn-outline-secondary mb-3" onClick={this.props.goBack}>🔙 Back</button>
          <div className="text-center mb-5">
            <h1 style={{ color: '#C06500', fontWeight: 'bold', fontSize: '2.5rem' }}>Interactive Videos</h1>
            <p style={{ color: '#666666', fontSize: '1.2rem' }}>Engage with video content that responds to you.</p>
            <button 
              onClick={this.handleReadAloud} 
              className="btn btn-success mt-3"
              style={{
                backgroundColor: '#C06500',
                color: '#FFFFFF',
                fontSize: '1.1rem',
                padding: '12px 30px',
                borderRadius: '25px',
                transition: 'background-color 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#A05200'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#C06500'}
              aria-label="Read Description Aloud"
            >
              📢 Read Aloud
            </button>
          </div>

          <div className="row">
            <div className="col-md-8 mx-auto mb-4">
              <div className="card p-4 shadow-sm" style={{ backgroundColor: '#FFFFFF', borderRadius: '15px' }}>
                <div className="ratio ratio-16x9 mb-3">
                  <iframe 
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                    title="Interactive Video Example" 
                    allowFullScreen
                    style={{ borderRadius: '10px' }}
                  ></iframe>
                </div>
                <h3 style={{ color: '#C06500', fontWeight: 'bold' }}>How Interactive Videos Work</h3>
                <p style={{ color: '#666666' }}>Our interactive video player includes these features:</p>
                <ul style={{ color: '#666666', lineHeight: '1.8' }}>
                  <li><strong>Pause Points:</strong> Videos automatically pause for reflection</li>
                  <li><strong>Embedded Questions:</strong> Answer questions without leaving the video</li>
                  <li><strong>Branching Paths:</strong> Your answers determine what content comes next</li>
                  <li><strong>Note-taking:</strong> Add timestamped notes that sync with the video</li>
                </ul>
                <button className="btn btn-warning mt-2" style={{ backgroundColor: '#C06500', color: 'white' }}>Browse Video Library</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default InteractiveV;