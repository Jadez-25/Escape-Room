import '@/css/LevelOne.css';

const LivesDisplay = ({ lives }) => (
    <div className="level-one-lives-display" aria-label="Lives remaining">
        {[...Array(3)].map((_, i) => (
            <span key={i} className={i < lives ? "level-one-heart full" : "level-one-heart empty"}>
                &#10084;
            </span>
        ))}
    </div>
);

export default LivesDisplay;
