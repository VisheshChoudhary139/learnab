import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Speech.css';

export class Speech extends Component {
  static propTypes = {
    // Add any prop types if needed
  };

  constructor(props) {
    super(props);
    this.state = {
      level: 'easy',
      currentQuestionIndex: 0,
      userSpeech: '',
      feedback: '',
      correctedText: '',
      practiceConvo: '',
      practiceFeedback: '',
      isListening: false,
      waitingForStop: false,
      language: 'en-US',
      recognitionSupported: false,
      micPermissionGranted: false,
      languages: {
        'en-US': 'English',
        'es-ES': 'Spanish',
        'fr-FR': 'French',
        'de-DE': 'German',
        'zh-CN': 'Chinese',
      },
      questions: {
        'fr-FR': {
          easy: [
            { question: 'Prononcez le mot "Heureux"', answer: 'Heureux' },
            { question: 'Dites : "Le chat est sur la table."', answer: 'Le chat est sur la table.' },
          ],
          medium: [
            { question: 'Dites : "J\'aime lire des livres sur l\'histoire."', answer: 'J\'aime lire des livres sur l\'histoire.' },
            { question: 'Prononcez : "L\'intelligence artificielle est fascinante."', answer: 'L\'intelligence artificielle est fascinante.' },
          ],
          difficult: [
            { question: 'Dites : "Un chasseur sachant chasser sait chasser sans son chien."', answer: 'Un chasseur sachant chasser sait chasser sans son chien.' },
            { question: 'Prononcez : "Les chaussettes de l\'archiduchesse sont-elles sèches, archi-sèches?"', answer: 'Les chaussettes de l\'archiduchesse sont-elles sèches, archi-sèches?' },
          ],
        },
        'de-DE': {
          easy: [
            { question: 'Sprich das Wort "Glücklich" aus', answer: 'Glücklich' },
            { question: 'Sage: "Die Katze ist auf dem Tisch."', answer: 'Die Katze ist auf dem Tisch.' },
          ],
          medium: [
            { question: 'Sage: "Ich lese gerne Bücher über Geschichte."', answer: 'Ich lese gerne Bücher über Geschichte.' },
            { question: 'Sprich aus: "Künstliche Intelligenz ist faszinierend."', answer: 'Künstliche Intelligenz ist faszinierend.' },
          ],
          difficult: [
            { question: 'Sage: "Blaukraut bleibt Blaukraut und Brautkleid bleibt Brautkleid."', answer: 'Blaukraut bleibt Blaukraut und Brautkleid bleibt Brautkleid.' },
            { question: 'Sprich aus: "Fischers Fritz fischt frische Fische, frische Fische fischt Fischers Fritz."', answer: 'Fischers Fritz fischt frische Fische, frische Fische fischt Fischers Fritz.' },
          ],
        },
        'zh-CN': {
          easy: [
            { question: '请发音 "快乐"', answer: '快乐' },
            { question: '请说："猫在桌子上。"', answer: '猫在桌子上。' },
          ],
          medium: [
            { question: '请说："我喜欢阅读关于历史的书籍。"', answer: '我喜欢阅读关于历史的书籍。' },
            { question: '请发音："人工智能很有趣。"', answer: '人工智能很有趣。' },
          ],
          difficult: [
            { question: '请说："吃葡萄不吐葡萄皮，不吃葡萄倒吐葡萄皮。"', answer: '吃葡萄不吐葡萄皮，不吃葡萄倒吐葡萄皮。' },
            { question: '请发音："黑化肥发灰，灰化肥发黑。"', answer: '黑化肥发灰，灰化肥发黑。' },
          ],
        },
        'en-US': {
          easy: [
            { question: 'Pronounce the word "Happy"', answer: 'Happy' },
            { question: 'Say: "The cat is on the table."', answer: 'The cat is on the table.' },
          ],
          medium: [
            { question: 'Say: "I enjoy reading books about history."', answer: 'I enjoy reading books about history.' },
            { question: 'Pronounce: "Artificial Intelligence is fascinating."', answer: 'Artificial Intelligence is fascinating.' },
          ],
          difficult: [
            { question: 'Say: "She sells seashells by the seashore."', answer: 'She sells seashells by the seashore.' },
            { question: 'Pronounce: "The quick brown fox jumps over the lazy dog."', answer: 'The quick brown fox jumps over the lazy dog.' },
          ],
        },
        'es-ES': {
          easy: [
            { question: 'Pronuncia la palabra "Feliz"', answer: 'Feliz' },
            { question: 'Di: "El gato está en la mesa."', answer: 'El gato está en la mesa.' },
          ],
          medium: [
            { question: 'Di: "Me gusta leer libros de historia."', answer: 'Me gusta leer libros de historia.' },
            { question: 'Pronuncia: "La inteligencia artificial es fascinante."', answer: 'La inteligencia artificial es fascinante.' },
          ],
          difficult: [
            { question: 'Di: "Tres tristes tigres tragan trigo en un trigal."', answer: 'Tres tristes tigres tragan trigo en un trigal.' },
            { question: 'Pronuncia: "El rápido zorro marrón salta sobre el perro perezoso."', answer: 'El rápido zorro marrón salta sobre el perro perezoso.' },
          ],
        }
      }
    };

    // Stop commands for different languages
    this.stopCommands = {
      'en-US': 'stop',
      'es-ES': 'parar',
      'fr-FR': 'arrêt',
      'de-DE': 'stopp',
      'zh-CN': '停止'
    };

    // Double tap detection properties
    this.lastTapTime = 0;
    this.tapDelay = 300; // milliseconds for double-tap detection

    // Check for speech recognition support
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      this.setState({ recognitionSupported: true }, this.initializeSpeechRecognition);
    } else {
      this.setState({
        feedback: 'Speech recognition is not supported in your browser. Please try Chrome or Edge.'
      });
    }
  }

  initializeSpeechRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    this.recognition = new SpeechRecognition();
    this.recognition.continuous = false;
    this.recognition.interimResults = false;
    this.recognition.lang = this.state.language;
    this.recognition.maxAlternatives = 1;

    this.recognition.onstart = () => {
      console.log('Speech recognition started');
      this.setState({ isListening: true });
    };

    this.recognition.onresult = (event) => {
      let finalTranscript = '';
      let interimTranscript = '';
      let stopDetected = false;

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }

        // Check for stop command in current language
        const stopWord = this.stopCommands[this.state.language];
        if (transcript.toLowerCase().includes(stopWord)) {
          stopDetected = true;
        }
      }

      if (stopDetected) {
        this.stopListening();
        return;
      }

      if (finalTranscript) {
        this.setState({
          userSpeech: finalTranscript.trim(),
          isListening: false,
          micPermissionGranted: true
        }, this.provideFeedback);
      }
    };

    this.recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      let errorMessage = 'Error recognizing speech';

      if (event.error === 'not-allowed') {
        errorMessage = 'Microphone access denied. Please allow microphone permissions.';
        this.setState({ micPermissionGranted: false });
      } else if (event.error === 'no-speech') {
        errorMessage = 'No speech detected. Please try again.';
      }

      this.setState({
        isListening: false,
        waitingForStop: false,
        feedback: errorMessage
      });
    };

    this.recognition.onend = () => {
      if (this.state.isListening) {
        // Try restarting if we're still supposed to be listening
        setTimeout(() => {
          if (this.state.isListening) {
            try {
              this.recognition.start();
            } catch (error) {
              console.error('Error restarting recognition:', error);
              this.setState({ isListening: false, waitingForStop: false });
            }
          }
        }, 100);
      }
    };
  };

  componentDidMount() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      this.setState({ recognitionSupported: true }, () => {
        this.initializeSpeechRecognition();
      });
    } else {
      this.setState({ feedback: 'Speech recognition is not supported in your browser. Please use Chrome or Edge.' });
    }
  }

  setupStopCommand = () => {
    if (!this.recognition) return;

    // Store original continuous setting
    this.originalContinuous = this.recognition.continuous;

    // For stop command detection, we need continuous listening
    this.recognition.continuous = true;
    this.recognition.interimResults = true;

    this.recognition.onresult = (event) => {
      let finalTranscript = '';
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      // Check if stop command was said in either final or interim results
      const stopWord = this.stopCommands[this.state.language];
      const stopCommandDetected =
          finalTranscript.toLowerCase().includes(stopWord) ||
          interimTranscript.toLowerCase().includes(stopWord);

      if (stopCommandDetected) {
        this.stopListening();
        return;
      }

      // Only update state if we're in normal recording mode
      if (this.state.isListening && !this.state.waitingForStop) {
        this.setState({
          userSpeech: finalTranscript || interimTranscript,
        });
      }
    };
  };

  stopListening = () => {
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (error) {
        console.error('Error stopping recognition:', error);
      }
    }
    this.setState({
      isListening: false,
      waitingForStop: false
    });
  };

  requestMicrophonePermission = () => {
    this.setState({
      feedback: 'Please allow microphone access in the browser prompt...'
    }, () => {
      try {
        this.recognition.start();
      } catch (error) {
        console.error('Permission request error:', error);
        this.setState({
          feedback: 'Could not access microphone. Please check your browser permissions.'
        });
      }
    });
  };

  startSpeechRecognition = () => {
    if (!this.state.recognitionSupported) {
      this.setState({
        feedback: 'Speech recognition not supported in your browser'
      });
      return;
    }

    if (!this.state.micPermissionGranted) {
      this.requestMicrophonePermission();
      return;
    }

    if (!this.state.isListening) {
      this.recognition.lang = this.state.language;
      this.setState({
        feedback: '',
        userSpeech: '',
        isListening: true,
        waitingForStop: true
      }, () => {
        try {
          this.setupStopCommand();
          this.recognition.start();
        } catch (error) {
          console.error('Recognition start error:', error);
          this.setState({
            isListening: false,
            waitingForStop: false,
            feedback: 'Error starting speech recognition. Please refresh the page and try again.'
          });
        }
      });
    }
  };

  handleDoubleTap = () => {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - this.lastTapTime;

    if (this.state.isListening && tapLength < this.tapDelay && tapLength > 0) {
      // Double tap detected while listening - stop
      this.stopListening();
      return;
    }

    this.lastTapTime = currentTime;

    if (!this.state.isListening) {
      // Single tap - start listening
      this.startSpeechRecognition();
    }
  };

  changeLanguage = (event) => {
    const newLanguage = event.target.value;
    if (this.recognition) {
      this.recognition.lang = newLanguage;
    }
    this.setState({
      language: newLanguage,
      currentQuestionIndex: 0,
      userSpeech: '',
      feedback: '',
      practiceFeedback: '',
      correctedText: ''
    });
  };

  checkGrammar = async () => {
    const { practiceConvo, language } = this.state;
    if (!practiceConvo.trim()) {
      this.setState({
        practiceFeedback: 'Please enter some text to check.',
        correctedText: ''
      });
      return;
    }

    try {
      const response = await fetch('https://api.languagetool.org/v2/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          text: practiceConvo,
          language: language.split('-')[0],
          enabledOnly: 'false'
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Grammar check response:', data);

      if (data.matches && data.matches.length > 0) {
        this.processGrammarErrors(practiceConvo, data.matches);
      } else {
        this.setState({
          correctedText: practiceConvo,
          practiceFeedback: 'Excellent! Your text looks grammatically correct and natural.'
        });
      }
    } catch (error) {
      console.error('Grammar check error:', error);
      this.setState({
        practiceFeedback: 'Error checking grammar. Please try again later.',
        correctedText: ''
      });
    }
  };

  processGrammarErrors = (originalText, matches) => {
    const sortedMatches = [...matches].sort((a, b) => b.offset - a.offset);

    let correctedText = originalText;
    let feedbackItems = [];
    let errorCount = 0;
    let warningCount = 0;

    sortedMatches.forEach((match) => {
      const start = match.offset;
      const end = start + match.length;
      const errorText = originalText.slice(start, end);
      const bestReplacement = match.replacements[0]?.value || errorText;

      correctedText = correctedText.slice(0, start) + bestReplacement + correctedText.slice(end);

      const message = this.generateErrorFeedback(match, errorText, bestReplacement);

      if (match.rule.category.id === 'TYPOS' || match.rule.category.id === 'GRAMMAR') {
        errorCount++;
      } else {
        warningCount++;
      }

      feedbackItems.push({
        message,
        context: originalText.slice(Math.max(0, start - 20), end + 20),
        category: match.rule.category.id
      });
    });

    let summaryFeedback = '';
    if (errorCount > 0 && warningCount > 0) {
      summaryFeedback = `Found ${errorCount} error(s) and ${warningCount} suggestion(s):`;
    } else if (errorCount > 0) {
      summaryFeedback = `Found ${errorCount} error(s):`;
    } else {
      summaryFeedback = `Found ${warningCount} suggestion(s):`;
    }

    const detailedFeedback = feedbackItems.map((item, i) => (
        `• ${item.message}\n   Context: "...${item.context}..."`
    )).join('\n\n');

    this.setState({
      correctedText,
      practiceFeedback: `${summaryFeedback}\n\n${detailedFeedback}`
    });
  };

  generateErrorFeedback = (match, errorText, replacement) => {
    switch (match.rule.category.id) {
      case 'TYPOS':
        return `Spelling error: "${errorText}" should be "${replacement}"`;
      case 'GRAMMAR':
        return `Grammar error: ${match.message}. Suggested correction: "${replacement}"`;
      case 'CONFUSED_WORDS':
        return `Common confusion: "${errorText}" might be confused with "${replacement}"`;
      case 'PUNCTUATION':
        return `Punctuation issue: ${match.message}. Suggested: "${replacement}"`;
      case 'STYLE':
        return `Style suggestion: ${match.message}. Consider: "${replacement}"`;
      case 'CASING':
        return `Capitalization issue: ${match.message}. Should be: "${replacement}"`;
      default:
        return `${match.message}. Suggested correction: "${replacement}"`;
    }
  };

  applyCorrection = () => {
    this.setState({
      practiceConvo: this.state.correctedText,
      correctedText: '',
      practiceFeedback: 'Correction applied! You can make further edits or check again.'
    });
  };

  changeLevel = (event) => {
    this.setState({
      level: event.target.value,
      currentQuestionIndex: 0,
      userSpeech: '',
      feedback: ''
    });
  };

  provideFeedback = () => {
    const { userSpeech, questions, level, language, currentQuestionIndex } = this.state;

    if (!questions[language] || !questions[language][level] ||
        currentQuestionIndex >= questions[language][level].length) {
      this.setState({
        feedback: "No question available for current selection."
      });
      return;
    }

    const currentQuestion = questions[language][level][currentQuestionIndex];
    if (!currentQuestion || !currentQuestion.answer) {
      this.setState({
        feedback: "Correct answer not available for this question."
      });
      return;
    }

    const correctAnswer = currentQuestion.answer;

    const normalizedUser = userSpeech.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").trim();
    const normalizedCorrect = correctAnswer.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").trim();

    const similarityScore = this.calculateSimilarity(normalizedUser, normalizedCorrect);

    let feedback = '';
    if (similarityScore > 0.8) {
      feedback = 'Excellent pronunciation!';
    } else if (similarityScore > 0.5) {
      feedback = 'Good attempt, but needs improvement.';
    } else {
      feedback = 'Try again, focus on pronunciation.';
    }

    this.setState({ feedback });
  };

  calculateSimilarity(str1, str2) {
    const distance = this.levenshteinDistance(str1, str2);
    return 1 - distance / Math.max(str1.length, str2.length);
  }

  levenshteinDistance(a, b) {
    if (!a.length) return b.length;
    if (!b.length) return a.length;

    const matrix = Array.from({ length: a.length + 1 }, () =>
        Array(b.length + 1).fill(0)
    );

    for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
    for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        matrix[i][j] = Math.min(
            matrix[i - 1][j] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j - 1] + cost
        );
      }
    }

    return matrix[a.length][b.length];
  }

  nextQuestion = () => {
    this.setState((prevState) => {
      const levelQuestions = prevState.questions[prevState.language]?.[prevState.level] || [];
      const nextIndex = prevState.currentQuestionIndex + 1;

      if (nextIndex < levelQuestions.length) {
        return {
          currentQuestionIndex: nextIndex,
          userSpeech: '',
          feedback: ''
        };
      }
      return null;
    });
  };

  prevQuestion = () => {
    this.setState((prevState) => {
      if (prevState.currentQuestionIndex > 0) {
        return {
          currentQuestionIndex: prevState.currentQuestionIndex - 1,
          userSpeech: '',
          feedback: ''
        };
      }
      return null;
    });
  };

  speakCorrectAnswer = () => {
    const { level, currentQuestionIndex, questions, language } = this.state;

    if (!questions[language] || !questions[language][level]) {
      console.error("No questions available for the selected language and level");
      this.setState({
        feedback: "No questions available for current selection"
      });
      return;
    }

    if (currentQuestionIndex >= questions[language][level].length) {
      console.error("Invalid question index");
      this.setState({
        feedback: "Invalid question index"
      });
      return;
    }

    const text = questions[language][level][currentQuestionIndex].answer;

    if (!window.speechSynthesis) {
      this.setState({
        feedback: "Text-to-speech not supported in your browser"
      });
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;

    const voices = window.speechSynthesis.getVoices();
    const selectedVoice = voices.find(voice => voice.lang === language) ||
        voices.find(voice => voice.lang.startsWith(language.split('-')[0]));

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.onerror = (event) => {
      console.error("Speech synthesis error:", event.error);
      this.setState({
        feedback: `Error in speech synthesis: ${event.error}`
      });
    };

    window.speechSynthesis.speak(utterance);
  };

  handlePracticeConversation = (event) => {
    this.setState({
      practiceConvo: event.target.value,
      correctedText: '',
      practiceFeedback: ''
    });
  };

  render() {
    const {
      level,
      currentQuestionIndex,
      questions,
      feedback,
      userSpeech,
      practiceConvo,
      isListening,
      correctedText,
      language,
      practiceFeedback,
      languages,
      recognitionSupported,
      micPermissionGranted
    } = this.state;

    const levelQuestions = questions[language]?.[level] || [];
    const currentQuestion = levelQuestions[currentQuestionIndex];

    if (!currentQuestion) {
      return (
          <div className="speech-container">
            <div className="speech-card error-message">
              No questions available for the selected language and difficulty level.
            </div>
          </div>
      );
    }

    return (
        <div className="speech-container">
          <div className="speech-card">
            <h3 className="speech-question">{currentQuestion.question}</h3>

            {!recognitionSupported && (
                <div className="browser-support-warning">
                  <img src="./security-warning.png" alt="Microphone" className="alert-icon"/> Your browser doesn't
                  support speech recognition. Please use Chrome or Edge.
                </div>
            )}

            {isListening && (
                <div className="listening-status">
                  <span className="listening-indicator"></span>
                  Listening... Say "{this.stopCommands[language]}" to stop or double tap microphone button
                </div>
            )}

            {!micPermissionGranted && recognitionSupported && (
                <div className="mic-permission-warning">
                  <img src="./security-warning.png" alt="Microphone" className="alert-icon"/> Microphone access is required
                  for speech recognition.
                </div>
            )}

            <div className="select-container">
            <select
                  onChange={this.changeLevel}
                  value={level}
                  className="speech-select"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="difficult">Difficult</option>
              </select>

              <select
                  onChange={this.changeLanguage}
                  value={language}
                  className="language-select"
              >
                {Object.entries(languages).map(([code, name]) => (
                    <option key={code} value={code}>{name}</option>
                ))}
              </select>
            </div>

            <div className="speech-button-container">
              <button
                  onClick={this.prevQuestion}
                  className="speech-button"
                  disabled={currentQuestionIndex === 0}
              >
                <img src="./left-arrow.png" alt="Previous" className="button-icon" /> Previous Question
              </button>

              <button
                  onClick={this.handleDoubleTap}
                  className={`speech-button ${isListening ? 'listening' : ''}`}
                  disabled={isListening || !recognitionSupported}
              >
                <img src="./speaking.png" alt="Microphone" className="button-icon" />
                {isListening ? 'Listening... (Double tap to stop)' : 'Speak'}
              </button>

              <button
                  onClick={this.speakCorrectAnswer}
                  className="speech-button"
              >
                <img src="./volume.png" alt="Volume" className="button-icon" /> Hear Answer
              </button>

              <button
                  onClick={this.nextQuestion}
                  className="speech-button"
                  disabled={currentQuestionIndex >= levelQuestions.length - 1}
              >
                Next Question <img src="./right-arrow.png" alt="Next" className="button-icon" />
              </button>
            </div>

            {(userSpeech || feedback) && (
                <div className="speech-result">
                  {userSpeech && (
                      <p className="user-speech">
                        <strong>You said:</strong> {userSpeech}
                      </p>
                  )}
                  {feedback && (
                      <p className="feedback-message">
                        <strong>Feedback:</strong> {feedback}
                      </p>
                  )}
                </div>
            )}

            <div className="practice-section">
              <h4 className="practice-section-title">Practice Conversation</h4>

              <textarea
                  value={practiceConvo}
                  onChange={this.handlePracticeConversation}
                  placeholder="Type your practice sentence here..."
                  className="practice-textarea"
                  rows="4"
              />

              <div className="grammar-check-buttons">
                <button
                    onClick={this.checkGrammar}
                    className="check-grammar-button"
                    disabled={!practiceConvo.trim()}
                >
                  <img src="./correct.png" alt="Volume" className="button-icon" /> Check Grammar
                </button>

                {correctedText && (
                    <button
                        onClick={this.applyCorrection}
                        className="apply-correction-button"
                    >
                      <img src="./check-mark.png" alt="Volume" className="tick-icon"/>  Apply Correction
                    </button>
                )}
              </div>

              {practiceFeedback && (
                  <div className={`practice-feedback ${correctedText ? 'has-corrections' : ''}`}>
                    <h5>Feedback:</h5>
                    {practiceFeedback.split('\n\n').map((paragraph, i) => (
                        <p key={i} className={i === 0 ? 'feedback-summary' : 'feedback-detail'}>
                          {paragraph}
                        </p>
                    ))}
                  </div>
              )}

              {correctedText && (
                  <div className="grammar-results">
                    <h5>Suggested Correction:</h5>
                    <div className="corrected-text-container">
                      <p className="corrected-text">{correctedText}</p>
                    </div>
                  </div>
              )}
            </div>
          </div>
        </div>
    );
  }
}

export default Speech;