import { useState, useRef, useEffect } from 'react';
import '@/css/WelcomePage.css';
import IntroVideo from '@/components/Welcome/IntroVideo';
import WelcomeForm from '@/components/Welcome/WelcomeForm';

const WelcomePage = ({ onStart }) => {
    const [showForm, setShowForm] = useState(false);
    const [playerName, setPlayerName] = useState("");
    const [department, setDepartment] = useState("");
    const [isVideoLoading, setIsVideoLoading] = useState(true);
    const [isMuted, setIsMuted] = useState(true);
    const [hasInteracted, setHasInteracted] = useState(false);
    const [hideUnmute, setHideUnmute] = useState(false);

    const videoRef = useRef(null);
    const audioRef = useRef(null);
    const hasStartedAudio = useRef(false); // Prevent multiple play() calls

    const startAudioLoop = () => {
        if (hasStartedAudio.current || !audioRef.current) return;
        hasStartedAudio.current = true;

        audioRef.current.currentTime = 0;

        // Remove old listener if exists
        if (audioRef.current._handleTimeUpdate) {
            audioRef.current.removeEventListener('timeupdate', audioRef.current._handleTimeUpdate);
        }

        const handleTimeUpdate = () => {
            if (audioRef.current && audioRef.current.currentTime >= 30) {
                audioRef.current.currentTime = 0;
            }
        };

        audioRef.current._handleTimeUpdate = handleTimeUpdate;
        audioRef.current.addEventListener('timeupdate', handleTimeUpdate);

        audioRef.current.play().catch(err => console.warn("Audio play error:", err));
    };

    const handleVideoEnd = () => {
        setShowForm(true);

        if (hasInteracted && audioRef.current) {
            audioRef.current.muted = false;
            startAudioLoop();
        }
    };

    const handleStart = () => {
        if (playerName.trim() && department) {
            startAudioLoop();
            onStart(playerName, department);
        } else {
            alert("Please enter your name and select a department.");
        }
    };

    const handleUnmute = () => {
        setIsMuted(false);
        setHasInteracted(true);

        if (videoRef.current) {
            videoRef.current.muted = false;
            videoRef.current.play();
        }
    };

    useEffect(() => {
        const videoElement = videoRef.current;
        if (!videoElement) return;

        const handleLoadedData = () => setIsVideoLoading(false);
        videoElement.addEventListener('loadeddata', handleLoadedData);

        return () => {
            if (videoElement) {
                videoElement.removeEventListener('loadeddata', handleLoadedData);
            }
        };
    }, []);

    return (
        <div className="welcome-page-fullscreen-container">
            <IntroVideo
                videoRef={videoRef}
                isVideoLoading={isVideoLoading}
                handleVideoEnd={handleVideoEnd}
                showForm={showForm}
                muted={isMuted}
            />

            <div className="welcome-page-video-overlay" />

            {isMuted && !hasInteracted && (
                <button className={`welcome-page-unmute-button ${hideUnmute ? 'hide' : ''}`} onClick={handleUnmute}>
                    {showForm ? "🔊 Click to Enable Sound" : "🔊 Click to Unmute Video"}
                </button>
            )}

            {showForm && (
                <div className="welcome-page-form-overlay">
                    <WelcomeForm
                        playerName={playerName}
                        setPlayerName={setPlayerName}
                        department={department}
                        setDepartment={setDepartment}
                        handleStart={handleStart}
                    />
                </div>
            )}

            <audio ref={audioRef} src="/audio/intro.mp3" preload="auto" muted />
        </div>
    );
};

export default WelcomePage;
