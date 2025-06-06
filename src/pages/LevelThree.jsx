import React, { useState, useEffect, useRef } from 'react';
import '@/css/LevelThree.css';
import { PHISHINGQUESTIONS, PASSWORDQUESTIONS } from '@/constants/level3-questions';

const shuffleArray = (array, count) => {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};

const LevelThree = ({ onComplete }) => {
    const [showMessage, setShowMessage] = useState(false);
    const [showPills, setShowPills] = useState(false);
    const [glitch, setGlitch] = useState(true);
    const [selectedPill, setSelectedPill] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [lives, setLives] = useState(3);
    const [levelComplete, setLevelComplete] = useState(false);
    const [score, setScore] = useState(0);

    const introAudioRef = useRef(null);
    const bgAudioRef = useRef(null);

    useEffect(() => {
        const introAudio = introAudioRef.current;
        const bgAudio = bgAudioRef.current;

        const handleIntroEnd = () => {
            setShowMessage(true);
            setTimeout(() => {
                setShowPills(true);
                bgAudio.play();
                setGlitch(false);
            }, 2000);
        };

        if (introAudio) {
            introAudio.addEventListener('ended', handleIntroEnd);
        }

        return () => {
            if (introAudio) {
                introAudio.removeEventListener('ended', handleIntroEnd);
            }
        };
    }, []);

    const handlePillClick = (color) => {
        setSelectedPill(color);
        document.body.classList.add('zoom-effect');
        setTimeout(() => {
            document.body.classList.remove('zoom-effect');
        }, 1000);

        const source = color === 'red' ? PHISHINGQUESTIONS : PASSWORDQUESTIONS;
        setQuestions(shuffleArray(source, 5));
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setLives(3);
        setLevelComplete(false);
    };

    const restartLevel = () => {
        const introAudio = introAudioRef.current;
        const bgAudio = bgAudioRef.current;

        if (bgAudio) {
            bgAudio.pause();
            bgAudio.currentTime = 0;
        }

        if (introAudio) {
            introAudio.currentTime = 0;
            introAudio.play();
        }

        setSelectedPill(null);
        setQuestions([]);
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setLives(3);
        setScore(0);
        setLevelComplete(false);
        setShowMessage(false);
        setShowPills(false);
        setGlitch(true);
    };

    const onAnswer = (option) => {
        setSelectedAnswer(option);
        const correct = questions[currentQuestionIndex].correct;

        if (option === correct) {
            setScore(prev => prev + 15); // Add 15 points for correct answer
        } else {
            const newLives = lives - 1;
            setLives(newLives);
            if (newLives <= 0) {
                setLevelComplete(true);
                return;
            }
        }

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer(null);
        } else {
            setLevelComplete(true);
        }
    };

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className={`matrix-container ${glitch ? 'glitch' : ''}`}>
            <audio ref={introAudioRef} autoPlay>
                <source src="/audio/matrix-intro.mp3" type="audio/mp3" />
            </audio>

            <audio ref={bgAudioRef} loop>
                <source src="/audio/level-3.mp3" type="audio/mp3" />
            </audio>

            {!selectedPill && (
                <>
                    <div className="glitch-title">
                        <span className="typing">Information Technology Safety</span>
                    </div>

                    {showMessage && (
                        <div className="matrix-message float-in">
                            Enter the matrix of cyber threats. Choose your reality.
                        </div>
                    )}
                </>
            )}

            {showPills && !selectedPill && (
                <div className="pill-container float-in-delayed">
                    <div className="pill-section">
                        <div className="pill-description">
                            <h2>Red Pill – Phishing Emails</h2>
                            <p>
                                Take the red pill… and uncover the tricks behind fake emails and digital deception.
                                You’ll face urgent scams, spoofed senders, and shady links designed to fool even the sharpest minds.
                                Can you outsmart the phishers before they hook you?
                            </p>
                        </div>
                        <div className="pill red" onClick={() => handlePillClick('red')}>Red Pill</div>
                    </div>

                    <div className="pill-section">
                        <div className="pill-description">
                            <h2>Blue Pill – Password Security</h2>
                            <p>
                                Take the blue pill… and test the strength of your digital defenses.
                                From brute-force attacks to password pitfalls, you’ll explore how one weak habit can bring it all down.
                                Will your secrets stay safe, or will the system crack your code?
                            </p>
                        </div>
                        <div className="pill blue" onClick={() => handlePillClick('blue')}>Blue Pill</div>
                    </div>
                </div>
            )}

            {selectedPill && (
                <>
                    <video className="level-three-background-video" autoPlay loop muted>
                        <source src="/video/level-three.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <div className="level-three-video-overlay"></div>

                    <div className="level-three-questions-container">
                        <h2>{selectedPill === 'red' ? 'Phishing Email Questions' : 'Password Security Questions'}</h2>

                        {!levelComplete && currentQuestion && (
                            <div className="level-three-question-card">
                                <div className="level-three-lives-counter">Lives Remaining: {lives}</div>
                                <p className="level-three-question-text">{currentQuestion.question}</p>
                                <div className="level-three-options-list">
                                    {currentQuestion.options.map((option, index) => (
                                        <button
                                            key={index}
                                            onClick={() => onAnswer(option)}
                                            className={`level-three-option-button ${selectedAnswer === option ? 'selected' : ''}`}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {levelComplete && (
                            <div className="level-three-completion-card">
                                {lives > 0 ? (
                                    <>
                                        <h3 className="level-three-success-message">✅ Simulation Complete</h3>
                                        <p className="level-three-success-subtext">You've navigated the matrix of threats. Choose your next move.</p>
                                        <div className="level-three-score">Score: {score}</div>
                                        <div className="level-three-button-group">
                                            <button onClick={() => onComplete(score)}>Proceed to Next Level</button>
                                            <button onClick={restartLevel}>Restart Level</button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <h3 className="level-three-failure-message">💀 Simulation Failed</h3>
                                        <p className="level-three-failure-subtext">You’ve lost all your lives in the matrix. Try again to master the threats.</p>
                                        <div className="level-three-button-group">
                                            <button onClick={restartLevel}>Restart Level</button>
                                        </div>
                                    </>
                                )}
                            </div>
                        )}

                    </div>
                </>
            )}
        </div>
    );
};

export default LevelThree;
