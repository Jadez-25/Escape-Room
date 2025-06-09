import React, { useState } from 'react';
import WelcomePage from '@/pages/WelcomePage';
import LevelOne from '@/pages/LevelOne';
import LevelTwo from '@/pages/LevelTwo';
import LevelThree from '@/pages/LevelThree';
import LevelFour from '@/pages/LevelFour';
import EndGame from '@/pages/EndGame';
import GameTimer from '@/components/GameTimer';

const GameFlow = () => {
  const [currentStage, setCurrentStage] = useState('welcome');
  const [playerData, setPlayerData] = useState({ name: '', department: '' });
  const [totalScore, setTotalScore] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const handleStart = (name, department) => {
    setPlayerData({ name, department });
    setTotalScore(0); // Reset score when restarting
    setStartTime(new Date()); // Start timer
    setCurrentStage('level1');
  };

  const handleLevelOneComplete = (score) => {
    setTotalScore(prev => prev + score);
    setCurrentStage('level2');
  };

  const handleLevelTwoComplete = (score) => {
    setTotalScore(prev => prev + score);
    setCurrentStage('level3');
  };

  const handleLevelThreeComplete = (score) => {
    setTotalScore(prev => prev + score);
    setCurrentStage('level4');
  };

  const handleLevelFourComplete = (score) => {
    setTotalScore(prev => prev + score);
    setEndTime(new Date()); // Stop timer
    setCurrentStage('end');
  };

  const handleReset = () => {
    setCurrentStage('welcome');
    setPlayerData({ name: '', department: '' });
    setTotalScore(0);
    setStartTime(null);
    setEndTime(null);
  };

  const getDuration = () => {
    if (!startTime || !endTime) return '';

    const durationMs = endTime - startTime;
    const minutes = Math.floor(durationMs / 60000);
    const seconds = Math.floor((durationMs % 60000) / 1000);
    return `${minutes}mins ${seconds}sec`;
  };

  return (
    <>
      {currentStage !== 'end' && (
        <GameTimer startTime={startTime} endTime={endTime} />
      )}
      {currentStage === 'welcome' && (
        <WelcomePage onStart={handleStart} />
      )}
      {currentStage === 'level1' && (
        <LevelOne onReset={handleReset} onComplete={handleLevelOneComplete} />
      )}
      {currentStage === 'level2' && (
        <LevelTwo onLevelComplete={handleLevelTwoComplete} />
      )}
      {currentStage === 'level3' && (
        <LevelThree onComplete={handleLevelThreeComplete} />
      )}
      {currentStage === 'level4' && (
        <LevelFour onComplete={handleLevelFourComplete} />
      )}
      {currentStage === 'end' && (
        <EndGame
          user={playerData}
          totalScore={totalScore}
          duration={getDuration()}
          onReset={handleReset}
        />
      )}
    </>
  );
};

export default GameFlow;
