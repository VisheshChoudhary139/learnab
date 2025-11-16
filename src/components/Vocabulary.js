import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Vocabulary.css';

export class Vocabulary extends Component {
    static propTypes = {
        goBack: PropTypes.func.isRequired
    };

    state = {
        language: 'en', // Default language

        // Translations for both English and Spanish
        translations: {
            en: {
                crosswordGrid: [
                    ["T", "R", "A", "V", "E", "L", null, null, null, null],
                    [null, "A", null, "O", "C", "E", "A", "N", null, null],
                    ["H", "I", "S", "T", "O", "R", "Y", null, null, null],
                    [null, "R", null, "A", null, null, "T", null, null, null],
                    ["F", "L", "I", "G", "H", "T", null, null, null, null],
                    [null, "C", null, "R", null, null, "U", "N", "C", null],
                    ["M", "O", "U", "N", "T", "A", "I", "N", null, null],
                    ["A", null, "G", null, "T", null, "I", null, null, null],
                    ["R", "I", "V", "E", "R", null, null, "R", null, null],
                    ["K", "E", "Y", null, "W", "O", "R", "D", null, null]
                ],
                hints: [
                    "1. A method of movement or going somewhere",
                    "2. Large body of salt water",
                    "3. Study of past events",
                    "4. A means of flying",
                    "5. High landform",
                    "6. Flowing water body",
                    "7. Important term or phrase"
                ],
                hangmanWords: [
                    { word: "PLANET", clue: "A celestial body orbiting a star" },
                    { word: "PYTHON", clue: "A popular programming language" },
                    { word: "BRIDGE", clue: "Structure that connects two places" }
                ]
            },
            es: {
                crosswordGrid: [
                    ["V", "I", "A", "J", "E", null, null, null, null, null,null],
                    [null, "A", null, "O", "C", "E", "A", "N", "O", null, null],
                    ["H", "I", "S", "T", "O", "R", "I", "A", null, null, null],
                    [null, "R", null, "A", null, null, "T", null, null, null,null],
                    ["V", "U", "E", "L", "O", null, null, null, null, null,null],
                    [null, "C", null, "R", null, null, "U", "N", "C", null,null],
                    ["M", "O", "N", "T", "A", "Ñ", "A", null, null, null,null],
                    ["A", null, "G", null, "T", null, "I", null, null, null,null],
                    ["R", "Í", "O", null, null, "R", null, null, null,null,null],
                    ["C", "L", "A", "V", "E", null, null, null, null, null,null]
                ],
                hints: [
                    "1. Un método de movimiento o viaje",
                    "2. Gran cuerpo de agua salada",
                    "3. Estudio de eventos pasados",
                    "4. Un medio de volar",
                    "5. Formación de tierra alta",
                    "6. Cuerpo de agua en movimiento",
                    "7. Término o frase importante"
                ],
                hangmanWords: [
                    { word: "PLANETA", clue: "Un cuerpo celeste que orbita una estrella" },
                    { word: "PYTHON", clue: "Un lenguaje de programación popular" },
                    { word: "PUENTE", clue: "Estructura que conecta dos lugares" }
                ]
            }
        },

        // Default values (English)
        crosswordGrid: [
            ["T", "R", "A", "V", "E", "L", null, null, null, null],
            [null, "A", null, "O", "C", "E", "A", "N", null, null],
            ["H", "I", "S", "T", "O", "R", "Y", null, null, null],
            [null, "R", null, "A", null, null, "T", null, null, null],
            ["F", "L", "I", "G", "H", "T", null, null, null, null],
            [null, "C", null, "R", null, null, "U", "N", "C", null],
            ["M", "O", "U", "N", "T", "A", "I", "N", null, null],
            ["A", null, "G", null, "T", null, "I", null, null, null],
            ["R", "I", "V", "E", "R", null, null, "R", null, null],
            ["K", "E", "Y", null, "W", "O", "R", "D", null, null]
        ],
        userGrid: Array(10).fill(Array(10).fill("")), // Empty grid for user input
        hints: [
            "1. A method of movement or going somewhere",
            "2. Large body of salt water",
            "3. Study of past events",
            "4. A means of flying",
            "5. High landform",
            "6. Flowing water body",
            "7. Important term or phrase"
        ],
        hangmanWords: [
            { word: "PLANET", clue: "A celestial body orbiting a star" },
            { word: "PYTHON", clue: "A popular programming language" },
            { word: "BRIDGE", clue: "Structure that connects two places" }
        ],

        // Game state variables
        currentWordIndex: 0,
        guessedLetters: [],
        remainingAttempts: 6,
        rhymeWords: [],
        currentPlayer: 1,
        player1Word: "",
        player2Word: "",
        gameOver: false,
        winner: null
    };


    handleChange = (row, col, event) => {
        const value = event.target.value.toUpperCase();
        if (value.length > 1) return;

        this.setState((prevState) => {
            const newUserGrid = prevState.userGrid.map(row => [...row]);
            newUserGrid[row][col] = value;
            return { userGrid: newUserGrid };
        });
    };

    toggleLanguage = () => {
        this.setState(prevState => {
            const newLang = prevState.language === 'en' ? 'es' : 'en';
            return {
                language: newLang,
                crosswordGrid: prevState.translations[newLang].crosswordGrid,
                hints: prevState.translations[newLang].hints,
                hangmanWords: prevState.translations[newLang].hangmanWords
            };
        });
    };

    resetGrid = () => {
        this.setState({
            userGrid: this.state.userGrid.map(row => row.map(() => ""))
        });
    };
    handleReadAloud = () => {
        const text = "Vocabulary Games: Expand your word knowledge with Cross words";
        const speech = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(speech);
    };
    handleRhymeSubmit = (player) => {
        const { rhymeWords, player1Word, player2Word, currentPlayer } = this.state;
        const newWord = player === 1 ? player1Word.trim() : player2Word.trim();

        if (!newWord) return; // Prevent empty submission

        if (rhymeWords.length === 0) {
            // First word can be anything
            this.setState({
                rhymeWords: [newWord],
                currentPlayer: currentPlayer === 1 ? 2 : 1,
                player1Word: "",
                player2Word: ""
            });
            return;
        }

        const lastWord = rhymeWords[rhymeWords.length - 1];

        if (this.doWordsRhyme(lastWord, newWord)) {
            this.setState((prevState) => ({
                rhymeWords: [...prevState.rhymeWords, newWord],
                currentPlayer: prevState.currentPlayer === 1 ? 2 : 1, // Switch player turn
                player1Word: "",
                player2Word: ""
            }));
        } else {
            this.setState({ gameOver: true, winner: player === 1 ? "Player 2" : "Player 1" });
        }
    };


    doWordsRhyme = (word1, word2) => {
        const getRhymePart = (word) => {
            const vowels = "aeiou";
            let lastVowelIndex = -1;
            for (let i = word.length - 1; i >= 0; i--) {
                if (vowels.includes(word[i])) {
                    lastVowelIndex = i;
                    break;
                }
            }
            return lastVowelIndex !== -1 ? word.slice(lastVowelIndex) : word;
        };

        return getRhymePart(word1.toLowerCase()) === getRhymePart(word2.toLowerCase());
    };

    restartRhymeGame = () => {
        this.setState({
            rhymeWords: [],
            currentPlayer: 1,
            player1Word: "",
            player2Word: "",
            gameOver: false,
            winner: null
        });
    };


    handleGuess = (letter) => {
        this.setState((prevState) => {
            const { currentWordIndex, hangmanWords, guessedLetters, remainingAttempts } = prevState;
            if (remainingAttempts === 0) return prevState; // Stop game at 0 attempts

            const word = hangmanWords[currentWordIndex].word;
            const newGuessedLetters = [...guessedLetters, letter];

            return {
                guessedLetters: newGuessedLetters,
                remainingAttempts: word.includes(letter) ? remainingAttempts : remainingAttempts - 1
            };
        });
    };

    revealHangmanAnswer = () => {
        this.setState((prevState) => ({
            guessedLetters: prevState.hangmanWords[prevState.currentWordIndex].word.split("")
        }));
    };

    restartHangman = () => {
        this.setState((prevState) => ({
            currentWordIndex: (prevState.currentWordIndex + 1) % prevState.hangmanWords.length,
            guessedLetters: [],
            remainingAttempts: 6
        }));
    };

    checkAnswers = () => {
        const { crosswordGrid, userGrid } = this.state;
        return JSON.stringify(crosswordGrid) === JSON.stringify(userGrid);
    };

    revealAnswers = () => {
        this.setState({ userGrid: this.state.crosswordGrid.map(row => row.map(cell => (cell !== null ? cell : ""))) });
    };

    render() {
        return (
            <div className="vocabulary-container">
                <div className="container mt-4">
                    <button className="back-button" onClick={this.props.goBack}><img src="./preview.png"
                                                                                     alt="Next"/> Back
                    </button>
                    <div className="text-center mb-5">
                        <h1 className="vocabulary-title">Vocabulary Builder</h1>
                        <p className="vocabulary-description">Expand your word power through engaging games and
                            activities.</p>
                        <button
                            onClick={this.handleReadAloud}
                            className="read-aloud-button"
                            aria-label="Read Description Aloud"
                        >
                            <img src="./megaphone.png"/> Read Aloud
                        </button>
                    </div>

                    <div className="crossword-section">

                        <h2 className="crossword-title">
                            {this.state.language === 'en' ? "Crossword Puzzle" : "Crucigrama"}
                            <img src="./jigsaw.png" alt="Next"/>
                        </h2>

                        <p className="crossword-description">
                            {this.state.language === 'en'
                                ? "Fill in the blanks to complete the words!"
                                : "¡Rellena los espacios en blanco para completar las palabras!"}
                        </p>
                        <div className="language-toggle">
                            <button onClick={this.toggleLanguage}>
                                {this.state.language === 'en' ? 'Español' : 'English'}
                            </button>
                        </div>
                        <div className="crossword-container">
                            <div className="crossword-hints">
                                <h3>{this.state.language === 'en' ? "Hints:" : "Pistas:"}</h3>
                                <ul>
                                    {this.state.hints.map((hint, index) => (
                                        <li key={index}>{hint}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="crossword-grid">
                                {this.state.userGrid.map((row, rowIndex) => (
                                    <div key={rowIndex} className="crossword-row">
                                        {row.map((cell, colIndex) => (
                                            this.state.crosswordGrid[rowIndex][colIndex] === null ? (
                                                <div key={colIndex} className="solid-block"></div>
                                            ) : (
                                                <input
                                                    key={colIndex}
                                                    type="text"
                                                    maxLength="1"
                                                    className="crossword-cell"
                                                    value={cell}
                                                    onChange={(event) => this.handleChange(rowIndex, colIndex, event)}
                                                />
                                            )
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="button-group">
                            <button className="check-button"
                                    onClick={() => alert(this.checkAnswers()
                                        ? (this.state.language === 'en' ? "Correct! 🎉" : "¡Correcto! 🎉")
                                        : (this.state.language === 'en' ? "Try again! ❌" : "¡Intenta de nuevo! ❌"))}>
                                {this.state.language === 'en' ? "Check Answers" : "Verificar Respuestas"}
                            </button>

                            <button className="show-answers-button" onClick={this.revealAnswers}>
                                {this.state.language === 'en' ? "Show Answers" : "Mostrar Respuestas"}
                            </button>

                            <button className="reset-buttonn" onClick={this.resetGrid}>
                                {this.state.language === 'en' ? "Reset" : "Reiniciar"}
                            </button>
                        </div>
                    </div>

                    <div className="hangman-section">

                        <h2 className="hangman-title">
                            {this.state.language === 'en' ? "Hangman with Clues" : "Ahorcado con pistas"}
                            <img src="./hangman.png" alt="Hangman"/>
                        </h2>
                        <div className="language-toggle">
                            <button onClick={this.toggleLanguage}>
                                {this.state.language === 'en' ? 'Español' : 'English'}
                            </button>
                        </div>
                        <p className="hangman-clue">
                            {this.state.language === 'en' ? "Clue:" : "Pista:"}
                            {this.state.hangmanWords[this.state.currentWordIndex].clue}
                        </p>

                        <div className="hangman-word">
                            {this.state.hangmanWords[this.state.currentWordIndex].word.split("").map((letter, index) => (
                                <span key={index} className="letter-box">
                {this.state.guessedLetters.includes(letter) ? letter : "_"}
            </span>
                            ))}
                        </div>

                        <div className="hangman-letters">
                            {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
                                <button
                                    key={letter}
                                    onClick={() => this.handleGuess(letter)}
                                    disabled={this.state.guessedLetters.includes(letter)}
                                    className="letter-button"
                                >
                                    {letter}
                                </button>
                            ))}
                        </div>

                        <p className="hangman-attempts">
                            {this.state.language === 'en' ? "Remaining Attempts:" : "Intentos restantes:"}
                            {this.state.remainingAttempts}
                        </p>

                        <div className="hangman-button-group">
                            <button className="restart-hangman" onClick={this.restartHangman}>
                                {this.state.language === 'en' ? "Next Word" : "Siguiente Palabra"}
                            </button>
                            <button className="show-answer-button" onClick={this.revealHangmanAnswer}>
                                {this.state.language === 'en' ? "Show Answer" : "Mostrar Respuesta"}
                            </button>
                        </div>
                    </div>

                    <div className="rhyme-battle-section">
                        <h2 className="rhyme-title">Rhyme Battle <img src="./poetry.png" alt="Rhyme"/></h2>
                        <p className="rhyme-instructions">Players take turns entering rhyming words. If a player enters
                            an incorrect word, the other wins!</p>

                        {!this.state.gameOver ? (
                            <>
                                <div className="rhyme-history">
                                    <h3>Words Used:</h3>
                                    <ul>
                                        {this.state.rhymeWords.map((word, index) => (
                                            <li key={index}>{word}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="rhyme-inputs">
                                    <div className="player-section">
                                        <h3>Player 1</h3>
                                        <input
                                            type="text"
                                            placeholder="Enter a rhyming word"
                                            value={this.state.player1Word}
                                            onChange={(e) => this.setState({player1Word: e.target.value})}
                                            className="rhyme-textbox"
                                            disabled={this.state.currentPlayer !== 1}
                                        />
                                        <button
                                            onClick={() => this.handleRhymeSubmit(1)}
                                            className="rhyme-submit-button"
                                            disabled={this.state.currentPlayer !== 1}
                                        >
                                            Submit
                                        </button>
                                    </div>

                                    <div className="player-section">
                                        <h3>Player 2</h3>
                                        <input
                                            type="text"
                                            placeholder="Enter a rhyming word"
                                            value={this.state.player2Word}
                                            onChange={(e) => this.setState({player2Word: e.target.value})}
                                            className="rhyme-textbox"
                                            disabled={this.state.currentPlayer !== 2}
                                        />
                                        <button
                                            onClick={() => this.handleRhymeSubmit(2)}
                                            className="rhyme-submit-button"
                                            disabled={this.state.currentPlayer !== 2}
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="rhyme-winner">
                                <h2>🎉 {this.state.winner} Wins! 🎉</h2>
                                <button onClick={this.restartRhymeGame} className="restart-button">Play Again</button>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        );
    }
}

export default Vocabulary;
