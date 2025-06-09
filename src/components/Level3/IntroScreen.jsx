import '@/css/LevelThree.css';

const IntroScreen = ({ glitch, showMessage, showPills, handleSkipIntro, handlePillClick }) => (
    <>
        <div className="glitch-title">
            <span className="typing">Information Technology Safety</span>
        </div>

        {glitch && (
            <div className="matrix-skip-container">
                <button className="matrix-skip-button" onClick={handleSkipIntro}>
                    Skip Intro Briefing
                </button>
            </div>
        )}

        {showMessage && (
            <div className="matrix-message float-in">
                Enter the matrix of cyber threats. Choose your reality.
            </div>
        )}

        {showPills && (
            <div className="pill-container float-in-delayed">
                <div className="pill-section">
                    <div className="pill-description">
                        <h2>Red Pill – Phishing Emails</h2>
                        <p>
                            Take the red pill… and uncover the tricks behind fake emails and digital deception.
                            You’ll face urgent scams, spoofed senders, and shady links designed to fool even the sharpest minds.
                            Can you outsmart the phishers before they hook you?
                        </p>
                    </div>
                    <div className="pill red" onClick={() => handlePillClick('red')}>Red Pill</div>
                </div>

                <div className="pill-section">
                    <div className="pill-description">
                        <h2>Blue Pill – Password Security</h2>
                        <p>
                            Take the blue pill… and test the strength of your digital defenses.
                            From brute-force attacks to password pitfalls, you’ll explore how one weak habit can bring it all down.
                            Will your secrets stay safe, or will the system crack your code?
                        </p>
                    </div>
                    <div className="pill blue" onClick={() => handlePillClick('blue')}>Blue Pill</div>
                </div>
            </div>
        )}
    </>
);

export default IntroScreen;
