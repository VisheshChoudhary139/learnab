import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './InteractiveV.css';

export class InteractiveV extends Component {
  static propTypes = {
    goBack: PropTypes.func.isRequired,
  };

  state = {
    currentQuestion: null,
    videoTime: 0,
    player: null,
  };

  questions = [
    { time: 5, question: 'What is the main topic of this video?', options: ['Education', 'Technology', 'Science'], correct: 0 },
    { time: 10, question: 'What feature makes this video interactive?', options: ['Animations', 'Questions', 'Subtitles'], correct: 1 },
  ];

  componentDidMount() {
    // Check if YouTube API is already loaded
    if (window.YT && window.YT.Player) {
      this.onYouTubeAPIReady();
    } else {
      // If not loaded, create a global callback for when API is ready
      window.onYouTubeIframeAPIReady = () => {
        this.onYouTubeAPIReady();
      };

      // Inject YouTube API script if it isn't loaded
      if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
        const script = document.createElement('script');
        script.src = 'https://www.youtube.com/iframe_api';
        document.body.appendChild(script);
      }
    }
  }


  onYouTubeAPIReady = () => {
    this.setState({
      player: new window.YT.Player('youtube-player', {
        videoId: 'kDFLcCOS7aw', // Extract the video ID from your URL
        playerVars: {
          enablejsapi: 1,
          modestbranding: 1,
          controls: 1
        },
        events: {
          onReady: this.onPlayerReady,
          onStateChange: this.onPlayerStateChange,
        }
      })
    });
  };

  onPlayerReady = (event) => {
    setInterval(() => {
      const currentTime = Math.floor(event.target.getCurrentTime());
      this.checkForQuestions(currentTime);
    }, 1000); // Check every second
  };

  checkForQuestions = (currentTime) => {
    const { currentQuestion } = this.state;
    const question = this.questions.find(q => q.time === currentTime);

    if (question && (!currentQuestion || currentQuestion.time !== question.time)) {
      this.state.player.pauseVideo();
      this.setState({ currentQuestion: question, videoTime: currentTime });
    }
  };

  handleAnswer = (index) => {
    const { player, currentQuestion } = this.state;

    if (!currentQuestion) return;

    if (index === currentQuestion.correct) {
      alert('Correct!');

      // Step 1: Remove the question and pop-up
      this.setState({ currentQuestion: null }, () => {
        // Step 2: Wait for state update, then force a re-render before resuming playback
        setTimeout(() => {
          if (this.state.player) {
            this.forceUpdate(); // Ensures UI update before playback
            this.state.player.playVideo();
          }
        }, 100); // Short delay allows UI to update first
      });
    } else {
      alert('Try again!');
    }
  };


  render() {
    return (
        <div className="interactive-container">
          <div className="V-container">
            <button className="back-button-V" onClick={this.props.goBack}>
              <img src="./preview.png" alt="Back" /> Back
            </button>

            <div className="v-txt">
              <h1 className="interactive-title">Interactive Videos</h1>
              <p className="interactive-subtitle">Engage with video content that responds to you.</p>
            </div>

            <div className="row">
              <div className="col-md-8 mx-auto mb-4">
                <div className="video-card-container">
                <div className="video-card">
                  <div className="video-container-v">
                    {/* YouTube iframe */}
                    <div id="youtube-player" className="video-iframe"></div>

                    {/* Pop-up message when a question appears */}
                    {this.state.currentQuestion && (
                        <div className="question-popup">
                          <p>Answer the question! <img src="./download.png" alt="Back"/></p>
                        </div>
                    )}
                  </div>

                  {/* Question Box */}
                  {this.state.currentQuestion && (
                      <div className="question-box">
                        <h3 className="question-text">{this.state.currentQuestion.question}</h3>
                        <div className="question-options">
                          {this.state.currentQuestion.options.map((option, index) => (
                              <button key={index} className="question-option" onClick={() => this.handleAnswer(index)}>
                                {option}
                              </button>
                          ))}
                        </div>
                      </div>
                  )}

                  <h3 className="video-title">How Interactive Videos Work</h3>
                  <p className="video-description">Our interactive video player includes these features:</p>
                  <ul className="video-features">
                    <li><strong>Pause Points:</strong> Videos automatically pause for reflection</li>
                    <li><strong>Embedded Questions:</strong> Answer questions without leaving the video</li>
                    <li><strong>Branching Paths:</strong> Your answers determine what content comes next</li>
                    <li><strong>Note-taking:</strong> Add timestamped notes that sync with the video</li>
                  </ul>
                  <button className="browse-library-btn">Browse Video Library</button>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default InteractiveV;
