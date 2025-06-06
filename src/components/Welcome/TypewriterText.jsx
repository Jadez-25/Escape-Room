import { Typewriter } from 'react-simple-typewriter';

const TypewriterText = () => (
    <Typewriter
        /*words={['The clock is ticking. Will you escape in time?']}*/
        words={['Will you break out in time - or break down under pressure?']}
        loop={false}
        cursor
        cursorStyle="|"
        typeSpeed={40}
        deleteSpeed={0}
        delaySpeed={1000}
    />
);

export default TypewriterText;
