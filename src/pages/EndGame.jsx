import React, { useRef, useState, useEffect } from 'react';
import FinaleScreen from '@/components/Closing/FinaleScreen';
import CreditsScreen from '@/components/Closing/CreditsScreen';
import Certificate from '@/components/Closing/Certificate';

const EndGame = ({ user, totalScore, duration, onReset }) => {
  const audioRef = useRef(null);
  const [stage, setStage] = useState('finale'); // 'finale', 'credits', 'certificate'

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.2;
      audioRef.current.loop = true;
      audioRef.current.play().catch(() => { });
    }
  }, []);

  const goToNextStage = () => {
    if (stage === 'finale') setStage('credits');
    else if (stage === 'credits') setStage('certificate');
    else if (stage === 'certificate') {
      // maybe go back to main menu or restart
    }
  };

  return (
    <div>
      <audio ref={audioRef} src="/audio/outro.mp3" />

      {stage === 'finale' && <FinaleScreen onContinue={goToNextStage} />}
      {stage === 'credits' && <CreditsScreen onContinue={goToNextStage} />}
      {stage === 'certificate' && (
        <Certificate
          name={user.name}
          department={user.department}
          score={totalScore}
          duration={duration}
          onContinue={goToNextStage}
        />
      )}
    </div>
  );
};

export default EndGame;
