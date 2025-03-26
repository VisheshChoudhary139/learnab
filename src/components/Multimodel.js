import React, { Component } from 'react';
import Vocabulary from './Vocabulary';
import Quizzes from './Quizzes';
import InteractiveV from './InteractiveV';
import AIPowered from './AIPowered';

export class MultimodalLearning extends Component {
  state = {
    activePage: 'home'
  };

  setActivePage = (page) => {
    this.setState({ activePage: page });
  };

  renderContent = () => {
    switch (this.state.activePage) {
      case 'vocabulary':
        return <Vocabulary goBack={() => this.setActivePage('home')} />;
      case 'quizzes':
        return <Quizzes goBack={() => this.setActivePage('home')} />;
      case 'interactive':
        return <InteractiveV goBack={() => this.setActivePage('home')} />;
      case 'ai':
        return <AIPowered goBack={() => this.setActivePage('home')} />;
      default:
        return this.renderHome();
    }
  };

  renderHome = () => (
    <div className="container mt-4">
      <div className="text-center mb-5">
        <h1 style={{ color: '#C06500', fontWeight: 'bold', fontSize: '2.5rem' }}>Multimodal Learning</h1>
        <p style={{ color: '#666666', fontSize: '1.2rem' }}>Enhance your learning with text, audio, video, and visual aids.</p>
      </div>
      
      <div className="row">
        <div className="col-md-6">
          <div className="card p-3 shadow-sm" style={{ backgroundColor: '#FFFFFF', borderRadius: '15px' }}>
            <h4 style={{ color: '#C06500', fontWeight: 'bold' }}>Interactive Learning Tools 📚</h4>
            <p style={{ color: '#666666' }}>Boost your learning through engaging activities.</p>
            <div className="d-flex flex-wrap gap-3">
              <button className="btn btn-outline-primary" onClick={() => this.setActivePage('vocabulary')}>Vocabulary Games</button>
              <button className="btn btn-outline-secondary" onClick={() => this.setActivePage('quizzes')}>Quizzes & Flashcards</button>
              <button className="btn btn-outline-success" onClick={() => this.setActivePage('interactive')}>Interactive Videos</button>
              <button className="btn btn-outline-danger" onClick={() => this.setActivePage('ai')}>AI-Powered Insights</button>
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="card p-4 shadow-sm" style={{ backgroundColor: '#FFFFFF', borderRadius: '15px' }}>
            <h4 style={{ color: '#C06500', fontWeight: 'bold' }}>Feature Descriptions</h4>
            <ul style={{ color: '#666666', lineHeight: '1.8' }}>
              <li><strong>Vocabulary Games:</strong> Improve your word power through interactive and fun-filled vocabulary exercises.</li>
              <li><strong>Quizzes & Flashcards:</strong> Reinforce learning with engaging quizzes and memory-boosting flashcards.</li>
              <li><strong>Interactive Videos:</strong> Learn through dynamic video tutorials, guided exercises, and real-world applications.</li>
              <li><strong>AI-Powered Insights:</strong> Get personalized learning recommendations and insights powered by AI.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  render() {
    return (
      <div style={{ backgroundColor: '#F5F5F5', minHeight: '100vh', paddingBottom: '50px' }}>
        {this.renderContent()}
      </div>
    );
  }
}

export default MultimodalLearning;