import React, { Component } from 'react';

export class Progress extends Component {
  handleReadAloud = () => {
    const reportText = `Performance Overview: Visualize your progress with weekly score analysis and learning path insights.
      Recommended Lessons: AI suggests topics to focus on for improvement.
      Strengths & Weaknesses: Detailed analysis of areas where you excel or need improvement.
      Progress Milestones: Track your goals and achievements to stay motivated.
      AI Feedback: Receive tips and tricks tailored to your learning style.
      Next Steps: Curated action items for improved learning outcomes.`;

    const speech = new SpeechSynthesisUtterance(reportText);
    window.speechSynthesis.speak(speech);
  };

  handleNavigation = (page) => {
    document.getElementById('content').innerHTML = `<h1>${page}</h1><p>Content for ${page} will be displayed here.</p>`;
  };

  render() {
    const features = [                    
      { title: 'Performance Overview', page: 'Performance Overview' },
      { title: 'Recommended Lessons', page: 'Recommended Lessons' },
      { title: 'Strengths & Weaknesses', page: 'Strengths & Weaknesses' },
      { title: 'Progress Milestones', page: 'Progress Milestones' },
      { title: 'AI Feedback', page: 'AI Feedback' },
      { title: 'Next Steps', page: 'Next Steps' },
    ];

    return (
      <div style={{ backgroundColor: '#F5F5F5', minHeight: '100vh', paddingBottom: '50px' }}>
        <div className="container mt-4 text-center">
          <h1 style={{ color: '#C06500', fontWeight: 'bold', fontSize: '2.5rem' }}>AI Progress Report</h1>
          <button 
            onClick={this.handleReadAloud} 
            className="btn mt-3"
            style={{ backgroundColor: '#C06500', color: '#FFFFFF', fontSize: '1.1rem', padding: '12px 30px', borderRadius: '25px' }}
          >
            📢 Read Report Aloud
          </button>
        </div>

        <div className="container mt-4">
          <div className="row">
            {features.map((item, index) => (
              <div key={index} className="col-md-4 mb-3 text-center">
                <button 
                  className="btn btn-lg w-100 p-3" 
                  style={{ backgroundColor: '#E89B54', color: '#FFFFFF', borderRadius: '10px' }}
                  onClick={() => this.handleNavigation(item.page)}
                >
                  {item.title}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="container mt-5" id="content" style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '10px' }}>
          <h2>Select a feature to view details</h2>
        </div>
      </div>
    );
  }
}

export default Progress;
