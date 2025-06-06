import React, { useState } from 'react';
import WelcomePage from '@/pages/WelcomePage';
import LevelOne from '@/pages/LevelOne';
import LevelTwo from '@/pages/LevelTwo';
import LevelThree from '@/pages/LevelThree';
import LevelFour from '@/pages/LevelFour';
import EndGame from '@/pages/EndGame';

const GameFlow = () => {
  const [currentStage, setCurrentStage] = useState('welcome');
  const [playerData, setPlayerData] = useState({ name: '', department: '' });
  const [totalScore, setTotalScore] = useState(0);
  const [levelFourScore, setLevelFourScore] = useState(0);

  const handleStart = (name, department) => {
    setPlayerData({ name, department });
    setTotalScore(0); // Reset score when restarting
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
    setLevelFourScore(score);
    setTotalScore(prev => prev + score);
    setCurrentStage('end');
  };

  const handleReset = () => {
    setCurrentStage('welcome');
    setPlayerData({ name: '', department: '' });
    setTotalScore(0);
    setLevelFourScore(0);
  };

  return (
    <>
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
          onReset={handleReset}
        />
      )}
    </>
  );
};

export default GameFlow;
