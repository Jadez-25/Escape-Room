const IntroVideo = ({ videoRef, isVideoLoading, handleVideoEnd, showForm, muted }) => {
    return (
        <>
            {isVideoLoading && (
                <div className="welcome-page-loading-overlay">
                    <p className="welcome-page-loading-text">Loading intro...</p>
                </div>
            )}
            <video
                ref={videoRef}
                className={`welcome-page-video-background ${showForm ? 'welcome-page-fade-video' : ''}`}
                autoPlay
                muted={muted}
                playsInline
                onEnded={handleVideoEnd}
                controls={false}
            >
                <source src="/video/intro.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </>
    );
};

export default IntroVideo;
