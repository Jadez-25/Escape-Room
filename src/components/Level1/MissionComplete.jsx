import ethanImage from '@/assets/imgs/ethan-hunt.png';
import '@/css/LevelOne.css';

const MissionComplete = ({ correctCount, onComplete, onRestart, showNextLevelButton }) => (
    <div className="level-one-mission-complete">
        <img src={ethanImage} alt="Ethan Hunt" className="level-one-briefing-image" />
        <h2 className="level-one-mission-title">✅ Mission Accomplished</h2>
        <p>You successfully restored operational focus and prevented burnout.</p>
        <p>Prepare to deploy to the next challenge.</p>
        <p>
            You answered <strong>{correctCount}</strong> questions correctly.
        </p>
        <div className="level-one-button-group">
            {showNextLevelButton && (
                <button className="level-one-next-level-button" onClick={onComplete}>
                    Proceed to Next Level
                </button>
            )}
            <button className="level-one-restart-button" onClick={onRestart}>Restart Mission</button>
        </div>
    </div>
);

export default MissionComplete;
