import ethanImage from '@/assets/imgs/ethan-hunt-failed.png';
import '@/css/LevelOne.css';

const MissionFailed = ({ onRestart }) => (
    <div className="level-one-mission-failed">
        <div className="fail-overlay"></div>
        <img src={ethanImage} alt="Ethan Hunt" className="level-one-briefing-image" />
        <h2>💣 Mission Failed</h2>
        <p>You’ve run out of energy and your wellness journey was cut short. Time to recharge and try again!</p>
        <button className="level-one-restart-button" onClick={onRestart}>Restart Mission</button>
    </div>
);

export default MissionFailed;