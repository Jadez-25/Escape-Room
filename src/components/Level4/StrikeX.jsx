import React, { useEffect, useState } from 'react';
import '@/css/LevelFour.css';

const StrikeX = ({ trigger }) => {
   const [show, setShow] = useState(false);

  useEffect(() => {
    if (trigger) {
      setShow(true);
      const timer = setTimeout(() => setShow(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [trigger]);

  return show ? <div className="strike-x">X</div> : null;
}

export default StrikeX;
