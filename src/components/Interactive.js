import React, { Component } from 'react';

export class LessonPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLessonIndex: 0,
      completedLessons: [],
      points: 0,
      lessons: [
        {
          title: 'Introduction to Percentages',
          videoUrl: 'https://www.example.com/percentages',
          quiz: [
            {
              question: 'What is 15% of 200?',
              options: ['20', '30', '40', '50'],
              answer: '30',
            },
          ],
        },
        {
          title: 'Speed and Distance Basics',
          videoUrl: 'https://www.example.com/speed-distance',
          quiz: [
            {
              question: 'A train travels 300 km in 5 hours. What is its speed?',
              options: ['50 km/h', '60 km/h', '70 km/h', '80 km/h'],
              answer: '60 km/h',
            },
          ],
        },
      ],
      selectedAnswer: '',
      quizFeedback: '',
    };
  }

  handleAnswerClick = (selectedAnswer) => {
    const { currentLessonIndex, lessons, points, completedLessons } = this.state;
    const correctAnswer = lessons[currentLessonIndex].quiz[0].answer;

    if (!completedLessons.includes(currentLessonIndex)) {
      this.setState({
        points: selectedAnswer === correctAnswer ? points + 10 : points,
        completedLessons: [...completedLessons, currentLessonIndex],
      });
    }

    this.setState({
      selectedAnswer,
      quizFeedback: selectedAnswer === correctAnswer ? 'Correct! ✅' : 'Incorrect ❌',
    });
  };

  goToNextLesson = () => {
    this.setState((prevState) => ({
      currentLessonIndex: (prevState.currentLessonIndex + 1) % prevState.lessons.length,
      selectedAnswer: '',
      quizFeedback: '',
    }));
  };

  goToPreviousLesson = () => {
    this.setState((prevState) => ({
      currentLessonIndex:
        (prevState.currentLessonIndex - 1 + prevState.lessons.length) % prevState.lessons.length,
      selectedAnswer: '',
      quizFeedback: '',
    }));
  };

  render() {
    const { currentLessonIndex, lessons, selectedAnswer, quizFeedback, points } = this.state;
    const currentLesson = lessons[currentLessonIndex];

    return (
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F9F9F9' }}>
        {/* Sidebar Navigation */}
        <div style={{ width: '250px', backgroundColor: '#C06500', color: '#FFFFFF', padding: '20px' }}>
          <h2>Lesson Outline</h2>
          {lessons.map((lesson, index) => (
            <div key={index} style={{ margin: '10px 0', cursor: 'pointer' }}>
              {lesson.title}
            </div>
          ))}
        </div>

        {/* Lesson Content */}
        <div style={{ flex: 1, padding: '20px' }}>
          <h2>{currentLesson.title}</h2>
          <iframe
            width="100%"
            height="315"
            src={currentLesson.videoUrl}
            title="Lesson Video"
            frameBorder="0"
            allowFullScreen
          ></iframe>

          {/* Quiz Section */}
          <div style={{ marginTop: '20px' }}>
            <h3>Quiz</h3>
            <p>{currentLesson.quiz[0].question}</p>
            {currentLesson.quiz[0].options.map((option, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: selectedAnswer === option ? '#FFEFD5' : '#F5F5F5',
                  padding: '10px',
                  borderRadius: '5px',
                  marginBottom: '10px',
                  cursor: 'pointer',
                }}
                onClick={() => this.handleAnswerClick(option)}
              >
                {option}
              </div>
            ))}
            <p style={{ color: quizFeedback === 'Correct! ✅' ? 'green' : 'red' }}>{quizFeedback}</p>
          </div>

          {/* Progress Tracking */}
          <div style={{ marginTop: '20px', backgroundColor: '#FFEFD5', padding: '10px', borderRadius: '5px' }}>
            <h4>Progress Dashboard</h4>
            <p>Points Earned: {points}</p>
          </div>

          {/* Navigation Buttons */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
            <button
              onClick={this.goToPreviousLesson}
              style={{ backgroundColor: '#C06500', color: '#FFFFFF', padding: '10px 20px', borderRadius: '5px' }}
            >
              Previous
            </button>
            <button
              onClick={this.goToNextLesson}
              style={{ backgroundColor: '#C06500', color: '#FFFFFF', padding: '10px 20px', borderRadius: '5px' }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default LessonPage;