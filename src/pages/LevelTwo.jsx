import React, { useState, useEffect, useRef } from 'react';
import '@/css/LevelTwo.css';
import { EMERGENCYSCENARIOS } from '@/constants/level2-questions.js';

const SCENARIO_TITLES = {
  towerFire: "Fire Emergency",
  fireExtinguisherScenario: "Fire Extinguisher Training Scenario",
  riddlerPowerGrid: "Electrical Safety Drill"
};

const LevelTwo = ({ onLevelComplete }) => {
  const videoRef = useRef(null);
  const batmanAudioRef = useRef(null);
  const bgMusicRef = useRef(null);
  const effectRef = useRef(null);

  const [phase, setPhase] = useState('intro');
  const [scenarioKey, setScenarioKey] = useState(null);
  const [stepId, setStepId] = useState(1);
  const [score, setScore] = useState(0);
  const [outcome, setOutcome] = useState(null);

  const scenarioKeys = Object.keys(EMERGENCYSCENARIOS);

  useEffect(() => {
    const batmanAudio = new Audio("/audio/batman-theme-song.mp3");
    batmanAudioRef.current = batmanAudio;
    batmanAudio.play();

    const timer = setTimeout(() => {
      if (videoRef.current) videoRef.current.pause();
      batmanAudio.pause();

      const bgMusic = new Audio("/audio/level-2.mp3");
      bgMusic.currentTime = 11;
      bgMusic.loop = true;
      bgMusicRef.current = bgMusic;
      bgMusic.play();

      setPhase('briefing');
    }, 16000);

    return () => {
      clearTimeout(timer);
      batmanAudio.pause();
      bgMusicRef.current?.pause();
    };
  }, []);

  const fadeVolume = (audioRef, targetVolume, duration = 1000) => {
    if (!audioRef?.current) return;

    const audio = audioRef.current;
    const stepTime = 50;
    const steps = duration / stepTime;
    const volumeStep = (targetVolume - audio.volume) / steps;

    let currentStep = 0;
    const fadeInterval = setInterval(() => {
      if (currentStep >= steps) {
        clearInterval(fadeInterval);
        audio.volume = targetVolume;
      } else {
        audio.volume = Math.max(0, Math.min(1, audio.volume + volumeStep));
        currentStep++;
      }
    }, stepTime);
  };

  const startEmergency = () => {
    const randomKey = scenarioKeys[Math.floor(Math.random() * scenarioKeys.length)];
    setScenarioKey(randomKey);
    setStepId(1);
    setPhase('scenario');

    const firstStep = EMERGENCYSCENARIOS[randomKey].find(step => step.id === 1);

    fadeVolume(bgMusicRef, 0.1, 1000);

    if (firstStep.villainSound) {
      const villainAudio = new Audio(firstStep.villainSound);
      villainAudio.play();

      villainAudio.addEventListener('ended', () => {
        fadeVolume(bgMusicRef, 1.0, 1000);
      });
    }

    if (firstStep.soundEffect) {
      const effect = new Audio(firstStep.soundEffect);
      effect.loop = true;
      effect.play();
      effectRef.current = effect;
    }
  };

  const makeChoice = (choice) => {
    const nextStep = EMERGENCYSCENARIOS[scenarioKey].find(step => step.id === choice.nextId);
    if (!nextStep) return;

    // Award 10 points if the next step is not a failure (e.g., not id 99)
    if (choice.nextId !== 99) {
      setScore(prev => prev + 10);
    }

    setStepId(choice.nextId);

    if (nextStep.choices.length === 0) {
      setOutcome(nextStep.text);
      setPhase('outcome');
      if (effectRef.current) {
        effectRef.current.pause();
      }
    }
  };

  const completeLevel = () => {
    onLevelComplete(score); // sends the final score up to GameFlow
  };

  const currentStep = scenarioKey ? EMERGENCYSCENARIOS[scenarioKey].find(step => step.id === stepId) : null;

  return (
    <div className="level-two-container">
      {phase !== 'intro' && <div className="gotham-background" />}

      {phase === 'intro' && (
        <video
          ref={videoRef}
          autoPlay
          muted
          className="gotham-video"
          src="/video/level-two-intro.mp4"
        />
      )}

      {phase === 'briefing' && (
        <div className="level-two-briefing-container">
          <h1 className="gotham-title">Emergency Response Unit</h1>
          <p className="level-two-briefing-text">
            Gotham City is in crisis — but this time, it’s about being ready for real emergencies.
            Commissioner Gordon needs you to lead the charge in emergency response planning. Face a series of high-stakes
            scenarios, make smart calls, and learn how to respond when it counts.
          </p>
          <p className="level-two-briefing-text">
            Think fast. Choose wisely. Save the day.
          </p>
          <button onClick={startEmergency} className="gotham-button">Begin Level</button>
        </div>
      )}

      {phase === 'scenario' && currentStep && (
        <div className="level-two-scenario-container">
          <div className="level-two-scenario-overlay">
            <h2>{SCENARIO_TITLES[scenarioKey]}</h2>
            <p className="level-two-scenario-text">{currentStep.text}</p>

            <div className="level-two-choices-container">
              {currentStep.choices.map((choice, index) => (
                <button
                  key={index}
                  onClick={() => makeChoice(choice)}
                  className="gotham-button level-two-choice-button"
                >
                  {choice.text}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {phase === 'outcome' && (
        <div className="level-two-outcome-container">
          <h2>{outcome}</h2>
          <div className="level-two-score">
            Score: {score}
          </div>

          <button
            onClick={completeLevel}
            className="gotham-button"
          >
            Proceed to Next Level
          </button>
        </div>
      )}
    </div>
  );
};

export default LevelTwo;
