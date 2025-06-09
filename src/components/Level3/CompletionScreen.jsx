import '@/css/LevelThree.css';

const CompletionScreen = ({ lives, score, onRestart, onComplete }) => (
    <div className="level-three-completion-card">
        {lives > 0 ? (
            <>
                <h3 className="level-three-success-message">✅ Simulation Complete</h3>
                <p className="level-three-success-subtext">You've navigated the matrix of threats.</p>
                <div className="level-three-score">Score: {score}</div>
                <div className="level-three-button-group">
                    <button onClick={onComplete}>Proceed to Next Level</button>
                    <button onClick={onRestart}>Restart Level</button>
                </div>
            </>
        ) : (
            <>
                <h3 className="level-three-failure-message">💀 Simulation Failed</h3>
                <p className="level-three-failure-subtext">Try again to master the threats.</p>
                <div className="level-three-button-group">
                    <button onClick={onRestart}>Restart Level</button>
                </div>
            </>
        )}
    </div>
);

export default CompletionScreen;
