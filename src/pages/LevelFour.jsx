import React, { useState, useEffect, useRef } from 'react';
import { LEVELFOURQUESTIONS } from '@/constants/level4-questions';
import Scoreboard from '@/components/Level4/Scoreboard';
import StrikeX from '@/components/Level4/StrikeX';
import '@/css/LevelFour.css';
import backgroundAudioFile from '/audio/level-4.mp3';
import dingAudioFile from '/audio/ding.mp3';
import strikeAudioFile from '/audio/strike.mp3';

const LevelFour = ({ onComplete }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [revealed, setRevealed] = useState([]);
    const [score, setScore] = useState(0);
    const [strikeTrigger, setStrikeTrigger] = useState(false);
    const [showIntro, setShowIntro] = useState(true);
    const [shuffledQuestions, setShuffledQuestions] = useState([]);

    const backgroundAudio = useRef(null);
    const dingAudio = useRef(null);
    const strikeAudio = useRef(null);

    useEffect(() => {
        const shuffled = [...LEVELFOURQUESTIONS]
            .sort(() => 0.5 - Math.random())
            .slice(0, 6);
        setShuffledQuestions(shuffled);

        if (backgroundAudio.current) {
            backgroundAudio.current.volume = 0.1;
            backgroundAudio.current.loop = true;
            backgroundAudio.current.play().catch((e) =>
                console.warn('Audio autoplay blocked:', e)
            );
        }

        const timer = setTimeout(() => {
            setShowIntro(false);
        }, 4000);

        return () => clearTimeout(timer);
    }, []);

    // Handle completion and transition to EndGame
    useEffect(() => {
        if (!showIntro && currentIndex >= shuffledQuestions.length) {
            onComplete?.(score); // Trigger transition with final score
        }
    }, [currentIndex, showIntro, shuffledQuestions.length, onComplete, score]);

    const handleGuess = (option) => {
        const currentQuestion = shuffledQuestions[currentIndex];
        const match = currentQuestion.answers.find(
            (ans) => ans.answer.toLowerCase() === option.toLowerCase()
        );

        if (match) {
            if (!revealed.includes(match.answer)) {
                setRevealed([...revealed, match.answer]);
                setScore(score + match.points);
                if (dingAudio.current) dingAudio.current.play();
            }
        } else {
            setStrikeTrigger(true);
            if (strikeAudio.current) {
                strikeAudio.current.currentTime = 1;
                strikeAudio.current.play();
            }
        }

        setTimeout(() => {
            setCurrentIndex((prev) =>
                prev + 1 < shuffledQuestions.length ? prev + 1 : prev + 1
            );
            setRevealed([]);
            setStrikeTrigger(false);
        }, 1200);
    };

    const currentQuestion = shuffledQuestions[currentIndex];

    return (
        <div className="game-show-container">
            <audio ref={backgroundAudio} src={backgroundAudioFile} />
            <audio ref={dingAudio} src={dingAudioFile} />
            <audio ref={strikeAudio} src={strikeAudioFile} />

            {showIntro ? (
                <div className="level-four-intro-screen enhanced-intro">
                    <div className="spotlight-overlay" />
                    <div className="level-four-intro-content">
                        <h1 className="game-logo">The Safety Showdown</h1>
                        <p className="tagline">
                            The lights are on, the pressure is real <br />Welcome to The Safety Showdown!
                        </p>
                    </div>
                </div>
            ) : currentIndex >= shuffledQuestions.length ? (
                null // Let EndGame component handle the final message
            ) : (
                <div className="level-four-question-background fade-in">
                    <div className="round-display">Round {currentIndex + 1}</div>
                    <div className="score-top">Score: {score}</div>
                    <div className="level-four-question-section">
                        <div className="feud-board">
                            <div className="feud-header">We Asked 100 Employees...</div>
                            <div className="feud-question">{currentQuestion.prompt}</div>
                        </div>
                        <Scoreboard
                            answers={currentQuestion.answers}
                            revealed={revealed}
                        />
                    </div>
                    <div className="level-four-options-container">
                        {currentQuestion.options.map((option, index) => (
                            <button
                                key={index}
                                className="level-four-option-button"
                                onClick={() => handleGuess(option)}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                    <StrikeX trigger={strikeTrigger} />
                </div>
            )}
        </div>
    );
};

export default LevelFour;
