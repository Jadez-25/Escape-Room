import { motion } from 'framer-motion';
import { DEPARTMENTS } from '@/constants/departments';
import TypewriterText from './TypewriterText';

const WelcomeForm = ({ playerName, setPlayerName, department, setDepartment, handleStart }) => (
    <motion.div
        className="welcome-page-form-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        role="form"
        aria-labelledby="welcome-title"
    >
        <div className="welcome-page-form-content">
            <motion.h1
                id="welcome-title"
                className="welcome-page-title welcome-page-large-title"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                Welcome To<br />
                <span className="welcome-page-saga-title">The Safety Saga</span><br />
                <span className="welcome-page-highlight">Escape Edition</span>
            </motion.h1>
            
            <motion.p
                className="welcome-page-description"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
            >
                Buckle up for a wild adventure through five epic zones!<br />
                Face the frenzy in <strong>Health Havoc</strong>, escape the heat in <strong>Emergency Escapes</strong>,<br />
                zap into <strong>Tech Trouble</strong>, and crush the <strong>Ultimate Showdown</strong>.
            </motion.p>

            <motion.p
                className="welcome-page-typewriter-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
            >
                <TypewriterText />
            </motion.p>

            <div className="welcome-page-input-section">
                <label htmlFor="player-name" className="welcome-page-visually-hidden">Player Name</label>
                <input
                    id="player-name"
                    type="text"
                    placeholder="Enter your name"
                    aria-label="Player Name"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    className="welcome-page-input-field"
                    required
                />

                <label htmlFor="department-select" className="visually-hidden">Department</label>
                <select
                    id="department-select"
                    aria-label="Select Department"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="welcome-page-select-field"
                    required
                >
                    <option value="">Select Department</option>
                    {DEPARTMENTS.map((dept) => (
                        <option key={dept} value={dept}>{dept}</option>
                    ))}
                </select>

                <button
                    onClick={handleStart}
                    disabled={!playerName.trim() || !department}
                    className="welcome-page-start-button"
                    aria-label="Start Game"
                >
                    Start Game
                </button>
            </div>
        </div>
    </motion.div>
);

export default WelcomeForm;
