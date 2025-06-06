import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import '@/css/FinaleScreen.css';

const FinaleScreen = ({ onContinue }) => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="finale-screen">
      <Confetti
        width={windowSize.width}
        height={windowSize.height}
        numberOfPieces={200}
        recycle={true}  // This makes the confetti fall continuously
        gravity={0.3}
      />

      <h1>🎉 Congratulations, Champion! 🎉</h1>
      <p className="message">
        You’ve conquered the Safety Saga: Escape Edition!
      </p>
      <p>
        🧠 You cracked the code. <br />
        🛡️ You dodged the dangers. <br />
        🔍 You uncovered the secrets to a safer, healthier workplace.
      </p>
      <p>
        Your journey sharpened your mind, strengthened your habits, and elevated your awareness. <br />
        You are now a certified <strong>Workplace Wellness Warrior</strong>! 💪
      </p>
      <p>
        🌟 Your reward? Fewer slips, better posture, stronger habits and a head start on lifelong well-being.
      </p>
      <p>
        Until next time... <br />
        <strong>Maintain Safety. Demonstrate Strength. Pursue Excellence.</strong>
      </p>

      <button onClick={onContinue} className="continue-btn">
        ▶ View Credits & Certificate
      </button>
    </div>
  );
};

export default FinaleScreen;
