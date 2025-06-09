import React, { useState, useEffect, useRef } from 'react';
import '@/css/LevelThree.css';
import { PHISHINGQUESTIONS, PASSWORDQUESTIONS } from '@/constants/level3-questions';
import IntroScreen from '@/components/Level3/IntroScreen';
import QuestionCard from '@/components/Level3/QuestionCard';
import CompletionScreen from '@/components/Level3/CompletionScreen';

const shuffleArray = (array, count) => [...array].sort(() => 0.5 - Math.random()).slice(0, count);

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
                bgAudio?.play();
                setGlitch(false);
            }, 2000);
        };

        introAudio?.addEventListener('ended', handleIntroEnd);
        return () => introAudio?.removeEventListener('ended', handleIntroEnd);
    }, []);

    const handlePillClick = (color) => {
        const source = color === 'red' ? PHISHINGQUESTIONS : PASSWORDQUESTIONS;
        setSelectedPill(color);
        document.body.classList.add('zoom-effect');
        setTimeout(() => document.body.classList.remove('zoom-effect'), 1000);

        setQuestions(shuffleArray(source, 5));
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setLives(3);
        setLevelComplete(false);
    };

    const restartLevel = () => {
        const introAudio = introAudioRef.current;
        const bgAudio = bgAudioRef.current;

        // Stop and reset background audio
        if (bgAudio) {
            bgAudio.pause();
            bgAudio.currentTime = 0;
        }

        // Reset and play intro audio
        if (introAudio) {
            introAudio.pause(); // ensure it's fully stopped
            introAudio.currentTime = 0;
            introAudio.play(); // restart
        }

        // Reset all state
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
        const correct = questions[currentQuestionIndex].correct;
        setSelectedAnswer(option);
        if (option === correct) {
            setScore(prev => prev + 20);
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

    const handleSkipIntro = () => {
        introAudioRef.current?.pause();
        setShowMessage(true);
        setShowPills(true);
        setGlitch(false);
        bgAudioRef.current?.play();
    };

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className={`matrix-container ${glitch ? 'glitch' : ''}`}>
            <audio ref={introAudioRef} autoPlay src="/audio/matrix-intro.mp3" />
            <audio ref={bgAudioRef} loop src="/audio/level-3.mp3" />

            {!selectedPill ? (
                <IntroScreen
                    glitch={glitch}
                    showMessage={showMessage}
                    showPills={showPills}
                    handleSkipIntro={handleSkipIntro}
                    handlePillClick={handlePillClick}
                />
            ) : (
                <>
                    <video className="level-three-background-video" autoPlay loop muted>
                        <source src="/video/level-three.mp4" type="video/mp4" />
                    </video>
                    <div className="level-three-video-overlay" />

                    <div className="level-three-questions-container">
                        <h2>{selectedPill === 'red' ? 'Phishing Email Questions' : 'Password Security Questions'}</h2>

                        {!levelComplete && currentQuestion && (
                            <QuestionCard
                                question={currentQuestion}
                                selectedAnswer={selectedAnswer}
                                lives={lives}
                                onAnswer={onAnswer}
                            />
                        )}

                        {levelComplete && (
                            <CompletionScreen
                                lives={lives}
                                score={score}
                                onRestart={restartLevel}
                                onComplete={() => onComplete(score)}
                            />
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default LevelThree;
