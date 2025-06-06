import ethanImage from '@/assets/imgs/ethan-hunt.png';
import '@/css/LevelOne.css';

const BriefingCard = ({ briefingEnded, onAccept, onDecline }) => (
    <div className="level-one-briefing-card">
        <img src={ethanImage} alt="Ethan Hunt" className="level-one-briefing-image" />
        <h2 className="level-one-briefing-title">📝 Mission Briefing</h2>
        <p className="level-one-briefing-text">
            Agent, your team’s energy reserves are dangerously low. Your mission, should you
            choose to accept it, is to identify the wellness practices that restore focus,
            reduce stress, and help you survive another high-stakes day at HQ. You’ve got the
            following targets, make the right call.
        </p>
        <div className={`level-one-button-group ${briefingEnded ? "fade-in" : "hidden"}`}>
            <button className="level-one-option-button" onClick={onAccept}>Accept Mission</button>
            <button className="level-one-decline" onClick={onDecline}>Decline Mission</button>
        </div>
    </div>
);

export default BriefingCard;
