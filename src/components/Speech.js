import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Speech.css';

export class Speech extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      level: 'easy',
      currentQuestionIndex: 0,
      userSpeech: '',
      feedback: '',
      correctedText: '', // Add this line
      practiceConvo: '',
      isListening: false,
      language: 'en-US', // Default language
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
            { question: 'Dites : "J’aime lire des livres sur l’histoire."', answer: 'J’aime lire des livres sur l’histoire.' },
            { question: 'Prononcez : "L’intelligence artificielle est fascinante."', answer: 'L’intelligence artificielle est fascinante.' },
          ],
          difficult: [
            { question: 'Dites : "Un chasseur sachant chasser sait chasser sans son chien."', answer: 'Un chasseur sachant chasser sait chasser sans son chien.' },
            { question: 'Prononcez : "Les chaussettes de l’archiduchesse sont-elles sèches, archi-sèches?"', answer: 'Les chaussettes de l’archiduchesse sont-elles sèches, archi-sèches?' },
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

    this.recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    this.recognition.continuous = false;
    this.recognition.lang = this.state.language;

    this.recognition.onresult = (event) => {
      const userSpeech = event.results[0][0].transcript.trim();
      this.setState({ userSpeech, isListening: false }, this.provideFeedback);
    };

    this.recognition.onend = () => {
      this.setState({ isListening: false });
    };
  }

  startSpeechRecognition = () => {
    if (!this.state.isListening) {
      this.recognition.lang = this.state.language; // Ensure the selected language is set
      this.setState({ feedback: '', isListening: true }, () => {
        this.recognition.start();
      });
    }
  };


  changeLanguage = (event) => {
    const newLanguage = event.target.value;
    this.recognition.lang = newLanguage;
    this.setState({ language: newLanguage, currentQuestionIndex: 0, userSpeech: '', feedback: '' });
  };

  checkGrammar = async () => {
    const { practiceConvo } = this.state;
    const response = await fetch('https://api.languagetool.org/v2/check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ text: practiceConvo, language: 'en-US' }),
    });
    const data = await response.json();

    let correctedText = practiceConvo;
    data.matches.forEach(match => {
      correctedText = correctedText.replace(match.context.text.substring(match.offset, match.offset + match.length), match.replacements[0]?.value || '');
    });

    this.setState({ correctedText });
  };

  changeLevel = (event) => {
    this.setState({ level: event.target.value, currentQuestionIndex: 0, userSpeech: '', feedback: '' });
  };

  provideFeedback = () => {
    const { userSpeech, questions, level, language, currentQuestionIndex } = this.state;

    const correctAnswer = questions[language]?.[level]?.[currentQuestionIndex]?.answer?.toLowerCase() || "";

    if (!correctAnswer) {
      this.setState({ feedback: "Error: No question found for this language and level." });
      return;
    }

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

  nextQuestion = () => {
    this.setState((prevState) => {
      const levelQuestions = prevState.questions[prevState.language]?.[prevState.level] || [];
      const nextIndex = prevState.currentQuestionIndex + 1;

      if (nextIndex < levelQuestions.length) {
        return { currentQuestionIndex: nextIndex, userSpeech: '', feedback: '' };
      }
      return null;
    });
  };

  prevQuestion = () => {
    this.setState((prevState) => {
      if (prevState.currentQuestionIndex > 0) {
        return { currentQuestionIndex: prevState.currentQuestionIndex - 1, userSpeech: '', feedback: '' };
      }
      return null;
    });
  };


  calculateSimilarity(str1, str2) {
    const distance = this.levenshteinDistance(str1, str2);
    return 1 - distance / Math.max(str1.length, str2.length);
  }

  levenshteinDistance(a, b) {
    const matrix = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));
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

  speakCorrectAnswer = () => {
    const { level, currentQuestionIndex, questions, language } = this.state;

    if (!questions[language] || !questions[language][level]) {
      console.error("Error: No questions available for the selected language and difficulty level.");
      return;
    }

    if (currentQuestionIndex >= questions[language][level].length) {
      console.error("Error: Invalid question index.");
      return;
    }

    const text = questions[language][level][currentQuestionIndex].answer;

    // Ensure speech synthesis is stopped before starting a new one
    window.speechSynthesis.cancel();

    const voices = window.speechSynthesis.getVoices();

    // Find a voice that matches the selected language
    let selectedVoice = voices.find(voice => voice.lang === language);

    if (!selectedVoice) {
      console.warn(`No exact match for language ${language}. Using default voice.`);
      selectedVoice = voices.find(voice => voice.lang.startsWith(language.split("-")[0])) || voices[0];
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = selectedVoice;
    utterance.lang = language;

    utterance.onerror = (event) => {
      console.error("Speech synthesis error:", event.error);
    };

    // Delay speaking slightly to ensure voices are loaded
    if (voices.length === 0) {
      setTimeout(() => window.speechSynthesis.speak(utterance), 100);
    } else {
      window.speechSynthesis.speak(utterance);
    }
  };



  handlePracticeConversation = (event) => {
    this.setState({ practiceConvo: event.target.value });
  };

  render() {
    const { level, currentQuestionIndex, questions, feedback, userSpeech, practiceConvo, isListening, correctedText, language } = this.state;

    // Check if the language exists in the questions object
    const languageQuestions = questions[language] || {};
    // Check if the selected level exists in the language-specific questions
    const levelQuestions = questions[language]?.[level] || []; // Ensure it's an array

    // Handle cases where there are no questions for the selected language/level
    if (levelQuestions.length === 0) {
      return <div>Error: No questions available for the selected language and difficulty level.</div>;
    }

    // Ensure currentQuestionIndex is within valid range
    if (currentQuestionIndex >= levelQuestions.length || currentQuestionIndex < 0) {
      return <div>Error: Invalid question index.</div>;
    }

    const currentQuestion = levelQuestions[currentQuestionIndex];
    return (
        <div className="speech-container">
          <div className="speech-card">
            <h3 className="speech-question">{currentQuestion.question}</h3>
            <div className="select-container">
              <select onChange={this.changeLevel} value={level} className="speech-select">
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="difficult">Difficult</option>
              </select>
              <select onChange={this.changeLanguage} value={this.state.language} className="language-select">
                {Object.entries(this.state.languages).map(([code, name]) => (
                    <option key={code} value={code}>{name}</option>
                ))}
              </select>
            </div>

            <div className="speech-button-container">
              <button onClick={this.prevQuestion} className="speech-button" disabled={currentQuestionIndex === 0}>
                <img src="./left-arrow.png" alt="Previous"/> Previous Question
              </button>
              <button
                  onClick={this.startSpeechRecognition}
                  className={`speech-button ${isListening ? 'listening' : ''}`}
                  disabled={isListening}
              >
                <img src="./microphone.png" alt="Microphone"/> {isListening ? 'Listening...' : 'Start Speaking'}
              </button>
              <button onClick={this.speakCorrectAnswer} className="speech-button">
                <img src="./volume.png" alt="Volume"/> Correct Pronunciation
              </button>
              <button onClick={this.nextQuestion} className="speech-button"
                      disabled={currentQuestionIndex >= levelQuestions.length - 1}
              >
                Next Question <img src="./right-arrow.png" alt="Next"/>
              </button>
            </div>
            {userSpeech && (
                <div className="speech-result">
                  <p><strong>Your Speech:</strong> {userSpeech}</p>
                  <p><strong>Feedback:</strong> {feedback}</p>
                </div>
            )}
            <div className="practice-section">
              <h4 className="practice-title">Practice Conversation:</h4>
              <textarea
                  value={practiceConvo}
                  onChange={this.handlePracticeConversation}
                  placeholder="Type your practice sentence here..."
                  className="practice-textarea"
              />
              <button onClick={this.checkGrammar} className="speech-button">Submit</button>
              {correctedText && (
                  <div className="grammar-output">
                    <h4>Corrected Text:</h4>
                    <p>{correctedText}</p>
                  </div>
              )}

            </div>
          </div>
        </div>
    );
  }
}

export default Speech;
