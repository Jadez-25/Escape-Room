import React from 'react';
import '@/css/LevelFour.css';

const Scoreboard = ({ answers, revealed }) => {
  return (
    <div className="scoreboard">
      {answers.map((item, index) => (
        <div key={index} className={`board-slot ${revealed.includes(item.answer) ? 'revealed' : ''}`}>
          {revealed.includes(item.answer) ? (
            <>
              <span className="answer-text">{item.answer}</span>
              <span className="points"> - {item.points}</span>
            </>
          ) : (
            <span className="blank-answer">----</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default Scoreboard;
