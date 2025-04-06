import React, { useState, useEffect } from "react";
import "./LessonPage.css";

const lessonsData = [
  {
    id: "lesson1",
    title: "Introduction to Percentages",
    videoUrl: "https://www.youtube.com/embed/kDFLcCOS7aw?si=n-9ozVXwYW_6Ya12",
    quiz: [
      {
        question: "What is 15% of 200?",
        options: ["20", "30", "40", "50"],
        answer: "30",
      },
      {
        question: "50% of 80 is?",
        options: ["30", "35", "40", "45"],
        answer: "40",
      },
    ],
  },
  {
    id: "lesson2",
    title: "Speed and Distance Basics",
    videoUrl: "https://www.youtube.com/embed/EGqpLug-sDk?si=zTzEkvH0ybpZQUzV",
    quiz: [
      {
        question: "A train travels 300 km in 5 hours. What is its speed?",
        options: ["50 km/h", "60 km/h", "70 km/h", "80 km/h"],
        answer: "60 km/h",
      },
    ],
  },
  {
    id: "lesson3",
    title: "Basic English Greetings",
    videoUrl: "https://www.youtube.com/embed/fI8EsEXS59w?si=oA7nWDlSVMfoIh7B",
    quiz: [
      {
        question: "How do you say 'Hello' in a formal way?",
        options: ["Hey", "Hi", "Good morning", "Yo"],
        answer: "Good morning",
      },
      {
        question: "What is the correct response to 'How are you?'",
        options: [
          "I'm fine, thank you.",
          "I don't know.",
          "What do you want?",
          "Yes, please.",
        ],
        answer: "I'm fine, thank you.",
      },
    ],
  },
  {
    id: "lesson4",
    title: "Spanish: Common Phrases",
    videoUrl: "https://www.youtube.com/embed/DAp_v7EH9AA?si=yEqgXupolte2BqNz",
    quiz: [
      {
        question: "How do you say 'Thank you' in Spanish?",
        options: ["Hola", "Gracias", "Por favor", "Adiós"],
        answer: "Gracias",
      },
      {
        question: "What does 'Buenos días' mean?",
        options: [
          "Good evening",
          "Good morning",
          "Good night",
          "See you later",
        ],
        answer: "Good morning",
      },
    ],
  },
  {
    id: "lesson5",
    title: "French: Introducing Yourself",
    videoUrl: "https://www.youtube.com/embed/_4N46dVx9nE?si=t1NczhDfzmw7pgLN",
    quiz: [
      {
        question: "How do you say 'My name is' in French?",
        options: ["Je suis", "Je m'appelle", "Tu es", "Il est"],
        answer: "Je m'appelle",
      },
      {
        question: "What is the French word for 'Thank you'?",
        options: ["Merci", "Bonjour", "Oui", "Non"],
        answer: "Merci",
      },
    ],
  },
  {
    id: "lesson6",
    title: "German: Basic Vocabulary",
    videoUrl: "https://www.youtube.com/embed/7T2kr_Vtgw8?si=3ggb4Khdc18RlWKT",
    quiz: [
      {
        question: "How do you say 'Yes' in German?",
        options: ["Ja", "Nein", "Bitte", "Danke"],
        answer: "Ja",
      },
      {
        question: "What does 'Guten Abend' mean?",
        options: ["Good morning", "Good night", "Good evening", "Goodbye"],
        answer: "Good evening",
      },
    ],
  },
  {
    id: "lesson7",
    title: "Italian: Essential Phrases",
    videoUrl: "https://www.youtube.com/embed/5ex2C-SMwxI?si=OgR1-JDQSXsC3IzT",
    quiz: [
      {
        question: "How do you say 'Goodbye' in Italian?",
        options: ["Ciao", "Arrivederci", "Grazie", "Buongiorno"],
        answer: "Arrivederci",
      },
      {
        question: "What is the Italian word for 'Please'?",
        options: ["Per favore", "Grazie", "Buonasera", "Prego"],
        answer: "Per favore",
      },
    ],
  },
  {
    id: "lesson8",
    title: "Japanese: Greetings & Politeness",
    videoUrl: "https://www.youtube.com/embed/Tclq0Y7h4sE?si=OFtdEbHiReRD3w08",
    quiz: [
      {
        question: "How do you say 'Hello' in Japanese?",
        options: ["こんにちは (Konnichiwa)", "ありがとう (Arigato)", "さようなら (Sayonara)", "おはよう (Ohayou)"],
        answer: "こんにちは (Konnichiwa)",
      },
      {
        question: "What is the Japanese word for 'Thank you'?",
        options: ["すみません (Sumimasen)", "ありがとう (Arigato)", "ごめんなさい (Gomen nasai)", "こんばんは (Konbanwa)"],
        answer: "ありがとう (Arigato)",
      },
    ],
  },
  {
    id: "lesson9",
    title: "Chinese (Mandarin): Basic Expressions",
    videoUrl: "https://www.youtube.com/embed/oqSof_8euUg?si=BsWsUmSU84mMGUbl",
    quiz: [
      {
        question: "How do you say 'Hello' in Mandarin?",
        options: ["你好 (Nǐ hǎo)", "谢谢 (Xièxiè)", "再见 (Zàijiàn)", "请 (Qǐng)"],
        answer: "你好 (Nǐ hǎo)",
      },
      {
        question: "What does '谢谢' mean?",
        options: ["Hello", "Goodbye", "Thank you", "Please"],
        answer: "Thank you",
      },
    ],
  },
  {
    id: "lesson10",
    title: "Hindi: Everyday Words",
    videoUrl: "https://www.youtube.com/embed/gHBJcPd46Do?si=VXfhZqY4SoT3Mt0C",
    quiz: [
      {
        question: "How do you say 'Welcome' in Hindi?",
        options: ["नमस्ते (Namaste)", "धन्यवाद (Dhanyavad)", "स्वागत है (Swagat hai)", "अलविदा (Alvida)"],
        answer: "स्वागत है (Swagat hai)",
      },
      {
        question: "What is the Hindi word for 'Goodbye'?",
        options: ["अलविदा (Alvida)", "नमस्ते (Namaste)", "शुभ रात्रि (Shubh Ratri)", "स्वागत है (Swagat hai)"],
        answer: "अलविदा (Alvida)",
      },
    ],
  },
  {
    id: "lesson11",
    title: "English: Advanced Vocabulary",
    videoUrl: "https://www.youtube.com/embed/sEmv9kM_COA?si=dQDMjDCqgCSK_-0j",
    quiz: [
      {
        question: "What is a synonym for 'happy'?",
        options: ["Elated", "Sad", "Angry", "Bored"],
        answer: "Elated",
      },
      {
        question: "Which word means 'to look at something quickly'?",
        options: ["Gaze", "Glance", "Stare", "Peek"],
        answer: "Glance",
      },
    ],
  },
  {
    id: "lesson12",
    title: "Spanish: Conversation Starters",
    videoUrl: "https://www.youtube.com/embed/Xo5Y7AHMy20?si=fp8R0maEvoPbXRwy",
    quiz: [
      {
        question: "How do you say 'Where are you from?' in Spanish?",
        options: ["¿Dónde estás?", "¿Cómo te llamas?", "¿De dónde eres?", "¿Qué hora es?"],
        answer: "¿De dónde eres?",
      },
      {
        question: "What is the Spanish phrase for 'See you later'?",
        options: ["Hasta luego", "Adiós", "Nos vemos", "Buenas noches"],
        answer: "Hasta luego",
      },
    ],
  }
];


const LessonPage = () => {
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState(new Set());
  const [points, setPoints] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizFeedback, setQuizFeedback] = useState({});

  // Load progress from sessionStorage on mount
  useEffect(() => {
    const storedProgress = JSON.parse(sessionStorage.getItem("lessonProgress"));
    if (storedProgress) {
      setCompletedLessons(new Set(storedProgress.completedLessons));
      setPoints(storedProgress.points);
    }
  }, []);
  useEffect(() => {
    resetQuiz();
  }, [currentLessonIndex]);

  // Save progress to sessionStorage
  const saveProgress = (newCompletedLessons, newPoints) => {
    const progressData = {
      completedLessons: Array.from(newCompletedLessons),
      points: newPoints,
    };

    // Optional: local session storage
    sessionStorage.setItem("lessonProgress", JSON.stringify(progressData));

    // ✅ Send to backend with credentials
    fetch("http://localhost:5000/api/lessons/progress", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(progressData),
      credentials: "include", // ✅ THIS IS THE KEY LINE
    }).catch((error) => {
      console.error("Failed to save progress to server:", error);
    });
  };

  const handleAnswerClick = (questionIndex, selected) => {
    if (selectedAnswers[questionIndex]) return;

    const updatedAnswers = { ...selectedAnswers, [questionIndex]: selected };
    setSelectedAnswers(updatedAnswers);

    const correctAnswer = lessonsData[currentLessonIndex].quiz[questionIndex].answer;
    const isCorrect = selected === correctAnswer;

    setQuizFeedback((prevFeedback) => ({
      ...prevFeedback,
      [questionIndex]: isCorrect ? "Correct! ✅" : `Incorrect ❌ (Correct: ${correctAnswer})`,
    }));

    if (isCorrect) {
      setPoints((prevPoints) => prevPoints + 5);
    }
  };


  const goToNextLesson = () => {
    const currentLessonId = lessonsData[currentLessonIndex].id;
    setCompletedLessons((prevCompletedLessons) => {
      const updatedCompletedLessons = new Set(prevCompletedLessons);
      updatedCompletedLessons.add(currentLessonId);
      saveProgress(updatedCompletedLessons, points);
      return updatedCompletedLessons;
    });

    if (currentLessonIndex < lessonsData.length - 1) {
      setCurrentLessonIndex((prev) => prev + 1);
    }
    resetQuiz();
  };

  const goToPreviousLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex((prev) => prev - 1);
    }
    resetQuiz();
  };

  const resetQuiz = () => {
    setSelectedAnswers({});
    setQuizFeedback({});
  };

  const resetProgress = () => {
    setCompletedLessons(new Set());
    setPoints(0);
    sessionStorage.removeItem("lessonProgress");

    // ✅ Clear progress on the server with credentials included
    fetch("http://localhost:5000/api/lessons/progress", {
      method: "DELETE",
      credentials: "include", // <-- Important!
    }).catch((error) => {
      console.error("Failed to reset progress on server:", error);
    });
  };



  return (
      <div className="lesson-page">
        <div className="lesson-container">
          {/* Sidebar Navigation */}
          <div className="sidebar">
            <h2>Lesson <br></br>Outline</h2>
            {lessonsData.map((lesson, index) => (
                <div
                    key={lesson.id}
                    className={`lesson-item ${completedLessons.has(lesson.id) ? "completed" : ""}`}
                    onClick={() => {
                      setCurrentLessonIndex(index);
                      resetQuiz();
                    }}
                >
                  {lesson.title}
                </div>
            ))}
          </div>

          {/* Lesson Content */}
          <div className="lesson-content">
            <h2>{lessonsData[currentLessonIndex].title}</h2>
            <div className="video-container">
              <iframe
                  width="100%"
                  height="315"
                  src={lessonsData[currentLessonIndex].videoUrl}
                  title="Lesson Video"
                  frameBorder="0"
                  allowFullScreen
              ></iframe>
            </div>

            {/* Quiz Section */}
            <div className="quiz-section">
              <h3>Quiz</h3>
              {lessonsData[currentLessonIndex].quiz.map((q, index) => (
                  <div key={index} className="quiz-question">
                    <p>{q.question}</p>
                    {q.options.map((option, optIndex) => (
                        <div
                            key={optIndex}
                            className={`quiz-option ${selectedAnswers[index] === option ? "selected" : ""}`}
                            onClick={() => handleAnswerClick(index, option)}
                        >
                          {option}
                        </div>
                    ))}
                    <p className={`quiz-feedback ${quizFeedback[index]?.includes("Correct") ? "correct" : "incorrect"}`}>
                      {quizFeedback[index]}
                    </p>
                  </div>
              ))}
            </div>

            {/* Progress Dashboard */}
            <div className="progress-dashboard">
              <h4>Progress Dashboard</h4>
              <p>Points Earned: {points}</p>
              <button onClick={resetProgress} className="reset-button">Reset Progress</button>
            </div>

            {/* Navigation Buttons */}
            <div className="lesson-navigation">
              <div className="nav-button-container">
                <button
                    onClick={goToPreviousLesson}
                    className="nav-button prev-button"
                    disabled={currentLessonIndex === 0}
                >
                  Previous
                </button>
              </div>
              <div className="nav-button-container">
                <button
                    onClick={goToNextLesson}
                    className="nav-button next-button"
                    disabled={currentLessonIndex === lessonsData.length - 1}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default LessonPage;
