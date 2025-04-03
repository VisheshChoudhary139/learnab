import React, { Component } from "react";
import Vocabulary from "./Vocabulary";
import Quizzes from "./Quizzes";
import InteractiveV from "./InteractiveV";
import AIPowered from "./AIPowered";
import "./MultimodalLearning.css"; // Import CSS

export class MultimodalLearning extends Component {
  state = {
    activePage: "home",
  };

  setActivePage = (page) => {
    this.setState({ activePage: page });
  };

  renderContent = () => {
    switch (this.state.activePage) {
      case "vocabulary":
        return <Vocabulary goBack={() => this.setActivePage("home")} />;
      case "quizzes":
        return <Quizzes goBack={() => this.setActivePage("home")} />;
      case "interactive":
        return <InteractiveV goBack={() => this.setActivePage("home")} />;
      case "ai":
        return <AIPowered goBack={() => this.setActivePage("home")} />;
      default:
        return this.renderHome();
    }
  };

  renderHome = () => (
      <div className="multimodal-learning-container">
        <div className="container mt-4">
          <div className="text-center mb-5">
            <h1 className="title">Multimodal Learning</h1>
            <p className="subtitle">Enhance your learning with text, audio, video, and visual aids.</p>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="card-style">
                <h4 className="section-title">Interactive Learning Tools <img src="./open-book.png"/></h4>
                <p className="section-text">Boost your learning through engaging activities.</p>
                <div className="button-group">
                  <button className="btn vocabulary-btn" onClick={() => this.setActivePage("vocabulary")}>
                    Vocabulary Games
                  </button>
                  <button className="btn quizzes-btn" onClick={() => this.setActivePage("quizzes")}>
                    Quizzes & Flashcards
                  </button>
                  <button className="btn interactive-btn" onClick={() => this.setActivePage("interactive")}>
                    Interactive Videos
                  </button>
                  <button className="btn ai-btn" onClick={() => this.setActivePage("ai")}>
                    AI-Powered Insights
                  </button>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card-style p-4">
                <h4 className="section-title">Feature Descriptions</h4>
                <ul className="feature-list">
                  <li>
                    <div className="feature-item">
                      <img src="./dictionary.png" alt="Vocabulary" className="feature-icon"/>
                      <span><strong>Vocabulary Games:</strong> Improve your word power through interactive and fun-filled vocabulary exercises.</span>
                    </div>
                  </li>
                  <li>
                    <div className="feature-item">
                      <img src="./ask.png" alt="Quizzes" className="feature-icon"/>
                      <span><strong>Quizzes & Flashcards:</strong> Reinforce learning with engaging quizzes and memory-boosting flashcards.</span>
                    </div>
                  </li>
                  <li>
                    <div className="feature-item">
                      <img src="./video-player.png" alt="Interactive Videos" className="feature-icon"/>
                      <span><strong>Interactive Videos:</strong> Learn through dynamic video tutorials, guided exercises, and real-world applications.</span>
                    </div>
                  </li>
                  <li>
                    <div className="feature-item">
                      <img src="./aii.png" alt="AI Insights" className="feature-icon"/>
                      <span><strong>AI-Powered Insights:</strong> Get personalized learning recommendations and insights powered by AI.</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
  );

  render() {
    return <div className="page-container">{this.renderContent()}</div>;
  }
}

export default MultimodalLearning;