import { useEffect, useState, useRef } from "react";
import '@/css/LevelOne.css';
import BriefingCard from "@/components/Level1/BriefingCard";
import MissionFailed from "@/components/Level1/MissionFailed";
import MissionComplete from "@/components/Level1/MissionComplete";
import LivesDisplay from "@/components/Level1/LivesDisplay";
import EnergyBar from "@/components/Level1/EnergyBar";
import QuestionCard from "@/components/Level1/QuestionCard";
import { LEVELONEQUESTIONS } from "@/constants/level1-questions";

const MAX_LIVES = 3;
const FEEDBACK_ANIMATION_DURATION = 600;
const QUESTION_LIMIT = 6;

const LevelOne = ({ onReset, onComplete }) => {
    const briefingAudioRef = useRef(new Audio("/audio/mission-briefing.mp3"));
    const successAudioRef = useRef(new Audio("/audio/mission-accomplish.mp3"));
    const failedAudioRef = useRef(new Audio("/audio/mission-failed.mp3"));
    const bgMusicRef = useRef(new Audio("/audio/level-1.mp3"));

    const [accepted, setAccepted] = useState(false);
    const [declined, setDeclined] = useState(false);
    const [briefingEnded, setBriefingEnded] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [lives, setLives] = useState(MAX_LIVES);
    const [correctCount, setCorrectCount] = useState(0);
    const [feedbackClass, setFeedbackClass] = useState("");
    const [missionComplete, setMissionComplete] = useState(false);
    const [missionFailed, setMissionFailed] = useState(false);
    const [showNextLevelButton, setShowNextLevelButton] = useState(false);
    const [shuffledQuestions, setShuffledQuestions] = useState([]);

    const shuffleAndPickQuestions = () => {
        const shuffled = [...LEVELONEQUESTIONS].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, QUESTION_LIMIT);
    };

    useEffect(() => {
        const selectedQuestions = shuffleAndPickQuestions();
        setShuffledQuestions(selectedQuestions);

        const briefingAudio = briefingAudioRef.current;
        const bgMusic = bgMusicRef.current;

        const handleBriefingEnd = () => {
            setBriefingEnded(true);
            bgMusic.muted = false;
            bgMusic.play();
        };

        briefingAudio.muted = false;
        briefingAudio.play();
        briefingAudio.addEventListener("ended", handleBriefingEnd);
        bgMusic.loop = true;
        bgMusic.muted = true;

        return () => {
            briefingAudio.removeEventListener("ended", handleBriefingEnd);
        };
    }, []);

    useEffect(() => {
        const successAudio = successAudioRef.current;
        const failedAudio = failedAudioRef.current;
        const bgMusic = bgMusicRef.current;

        if (missionComplete) {
            bgMusic.pause();
            successAudio.muted = false;
            successAudio.play();
            successAudio.onended = () => {
                setShowNextLevelButton(true);
            };
        }
        if (missionFailed) {
            bgMusic.pause();
            failedAudio.muted = false;
            failedAudio.play();
        }
    }, [missionComplete, missionFailed]);

    const handleAccept = () => {
        setAccepted(true);
    };

    const handleDecline = () => {
        setDeclined(true);
        const bgMusic = bgMusicRef.current;
        bgMusic.pause();
        bgMusic.currentTime = 0;
        setTimeout(() => {
            onReset();
        }, 2000);
    };

    const handleAnswer = (selected) => {
        const correct = shuffledQuestions[currentQuestion].answer;
        const isCorrect = selected === correct;

        if (!isCorrect) {
            setFeedbackClass("level-one-incorrect-feedback");
        }

        if (isCorrect) {
            setCorrectCount((prev) => prev + 1);
        } else {
            setLives((prev) => {
                const newLives = prev - 1;
                if (newLives <= 0) {
                    setMissionFailed(true);
                    bgMusicRef.current.pause();
                }
                return newLives;
            });
        }

        setTimeout(() => {
            setFeedbackClass("");
            if (currentQuestion + 1 === shuffledQuestions.length) {
                setMissionComplete(true);
            } else {
                setCurrentQuestion(currentQuestion + 1);
            }
        }, FEEDBACK_ANIMATION_DURATION);
    };

    const handleComplete = () => {
        const levelOneScore = correctCount * 5;
        onComplete(levelOneScore); // Send score up to GameFlow
    };

    const handleRestart = () => {
        setAccepted(false);
        setDeclined(false);
        setBriefingEnded(false);
        setCurrentQuestion(0);
        setLives(MAX_LIVES);
        setCorrectCount(0);
        setMissionComplete(false);
        setMissionFailed(false);
        setShowNextLevelButton(false);
        setShuffledQuestions(shuffleAndPickQuestions());

        const briefingAudio = briefingAudioRef.current;
        const bgMusic = bgMusicRef.current;
        const failedAudio = failedAudioRef.current;

        failedAudio.pause();
        failedAudio.currentTime = 0;

        briefingAudio.currentTime = 0;
        briefingAudio.muted = false;
        briefingAudio.play();

        bgMusic.pause();
        bgMusic.currentTime = 0;

        briefingAudio.onended = () => {
            setBriefingEnded(true);
            bgMusic.muted = false;
            bgMusic.play();
        };
    };

    const energy = (correctCount / shuffledQuestions.length) * 100;

    return (
        <div className={`level-one-mission-container ${feedbackClass}`}>
            {!accepted && !declined && (
                <BriefingCard
                    briefingEnded={briefingEnded}
                    onAccept={handleAccept}
                    onDecline={handleDecline}
                />
            )}

            {declined && (
                <div className="level-one-decline-message" aria-label="Mission declined message">
                    Mission declined. Game over.
                </div>
            )}

            {missionFailed && <MissionFailed onRestart={handleRestart} />}

            {accepted && !missionComplete && !missionFailed && (
                <>
                    <LivesDisplay lives={lives} />
                    <EnergyBar percent={energy} />
                    <h3 className="level-one-question-title">Mission Energize</h3>
                    <QuestionCard
                        question={shuffledQuestions[currentQuestion].question}
                        options={shuffledQuestions[currentQuestion].options}
                        onAnswer={handleAnswer}
                    />
                </>
            )}

            {missionComplete && !missionFailed && (
                <MissionComplete
                    correctCount={correctCount}
                    showNextLevelButton={showNextLevelButton}
                    onRestart={handleRestart}
                    onComplete={handleComplete}
                />
            )}
        </div>
    );
};

export default LevelOne;
