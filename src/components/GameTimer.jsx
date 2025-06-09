import React, { useEffect, useState } from 'react';

const GameTimer = ({ startTime, endTime }) => {
    const [elapsed, setElapsed] = useState('0mins 0sec');

    useEffect(() => {
        const calculateElapsed = () => {
            const end = endTime || new Date();
            const diffMs = end - startTime;
            const minutes = Math.floor(diffMs / 60000);
            const seconds = Math.floor((diffMs % 60000) / 1000);
            return `${minutes}mins ${seconds}sec`;
        };

        if (!startTime) return;

        setElapsed(calculateElapsed());

        if (endTime) return; // Freeze the timer once ended

        const interval = setInterval(() => {
            setElapsed(calculateElapsed());
        }, 1000);

        return () => clearInterval(interval);
    }, [startTime, endTime]);

    if (!startTime) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 10,
            right: 10,
            backgroundColor: 'rgba(0,0,0,0.6)',
            color: '#fff',
            padding: '6px 12px',
            borderRadius: '8px',
            fontWeight: 'bold',
            fontSize: '1rem',
            zIndex: 1000
        }}>
            ⏱: {elapsed}
        </div>
    );
};

export default GameTimer;
