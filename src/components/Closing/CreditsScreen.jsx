import React, { useEffect, useRef } from 'react';
import '@/css/CreditsScreen.css';
import Confetti from 'react-confetti';

const groupedCredits = [
  {
    category: 'Development Team',
    roles: [
      { role: 'Developer', names: ['Jada Cropper'] },
      { role: 'Creative Direction', names: ['Dwayne Lee Fook', 'Evrol Mark', 'Jada Cropper', 'Tsevi Rajkumar'] },
      { role: 'Brainstorming', names: ['Everyone'] },
    ],
  },
  {
    category: 'Content & Design',
    roles: [
      { role: 'Question Design', names: ['Jada Cropper', 'Kenrick Pierre', 'Tsevi Rajkumar'] },
    ],
  },
  {
    category: 'Media & Audio',
    roles: [
      { role: 'Video Editing', names: ['Evrol Mark', 'Tsevi Rajkumar'] },
      { role: 'Soundtrack Selection', names: ['Dwayne Lee Fook', 'Tsevi Rajkumar'] },
      { role: 'Background Photos', names: ['Jada Cropper', 'Tsevi Rajkumar'] },
    ],
  },
  {
    category: 'Testing',
    roles: [
      { role: 'Testers', names: ['Alison Matieriene', 'Dwayne Lee Fook', 'Evrol Mark', 'Jada Cropper', 'Kenrick Pierre', 'Tsevi Rajkumar'] },
    ],
  },
];

const CreditsScreen = ({ onContinue }) => {
  const scrollRef = useRef(null);
  const [windowSize, setWindowSize] = React.useState({ width: 0, height: 0 });

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });

    const duration = 50000; // 50 seconds for full scroll
    const timer = setTimeout(() => {
      if (onContinue) onContinue();
    }, duration);

    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, [onContinue]);

  return (
    <div className="credits-container">
      <Confetti
        width={windowSize.width}
        height={windowSize.height}
        numberOfPieces={200}
        recycle={true}
        gravity={0.3}
      />
      <div className="credits-roll" ref={scrollRef}>
        <h2>🎮 Created by the ICT Department</h2>
        <p className="intro-thanks">
          This game was proudly created by the ICT Department — Alison Matieriene, Dwayne Lee Fook, Evrol Mark, Jada Cropper, Kenrick Pierre, Mahadeo Basdeo
          and Tsevi Rajkumar. We had a lot of fun bringing this project to life and hope you enjoyed playing it just as much as we enjoyed making it! Our goal was to make 
          learning about workplace safety and wellness both enjoyable and meaningful. We truly believe that safety starts with awareness, and we hope this game has 
          helped you build that mindset. Thank you for being part of this experience. We’re excited to see how you apply what you’ve 
          learned to create a safer, healthier workplace every day.
        </p>

        <h3>Team Contributions</h3>
        {groupedCredits.map(({ category, roles }, idx) => (
          <div key={idx} className="credit-category">
            <h4>{category}</h4>
            {roles.map(({ role, names }, i) => (
              <div key={i} className="credit-block">
                <strong>{role}</strong>
                <p>{names.join(', ')}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
      <button className="credits-skip-btn" onClick={onContinue}>▶ Skip to Certificate</button>
    </div>
  );
};

export default CreditsScreen;
