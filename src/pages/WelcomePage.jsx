import { useState, useRef, useEffect } from 'react';
import '@/css/WelcomePage.css';
import IntroVideo from '@/components/Welcome/IntroVideo';
import WelcomeForm from '@/components/Welcome/WelcomeForm';

const WelcomePage = ({ onStart }) => {
    const [showForm, setShowForm] = useState(false);
    const [playerName, setPlayerName] = useState("");
    const [department, setDepartment] = useState("");
    const [isVideoLoading, setIsVideoLoading] = useState(true);
    const videoRef = useRef(null);
    const audioRef = useRef(null);

    const startAudioLoop = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();

            const handleTimeUpdate = () => {
                if (audioRef.current.currentTime >= 30) {
                    audioRef.current.currentTime = 0;
                }
            };

            audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
            audioRef.current._handleTimeUpdate = handleTimeUpdate;
        }
    };

    const handleVideoEnd = () => {
        setShowForm(true);
        startAudioLoop();
    };

    const handleStart = () => {
        if (playerName.trim() && department) {
            startAudioLoop();
            onStart(playerName, department);
        } else {
            alert("Please enter your name and select a department.");
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
            />

            <div className="welcome-page-video-overlay" />
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

            <audio ref={audioRef} src="/audio/intro.mp3" preload="auto" />
        </div>
    );
};

export default WelcomePage;
