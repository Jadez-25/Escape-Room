import '@/css/LevelOne.css';

const EnergyBar = ({ percent }) => {
    let energyColor = "red";
    if (percent >= 70) {
        energyColor = "green";
    } else if (percent >= 40) {
        energyColor = "yellow";
    }

    return (
        <div className="level-one-energy-bar" aria-label="Energy level">
            <div className={`level-one-energy-fill ${energyColor}`} style={{ width: `${percent}%` }}>
                <span className="level-one-energy-label">{Math.round(percent)}%</span>
            </div>
        </div>
    );
};

export default EnergyBar;
