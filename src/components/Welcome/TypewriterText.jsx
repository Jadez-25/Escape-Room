import { Typewriter } from 'react-simple-typewriter';

const TypewriterText = () => (
    <Typewriter
        words={['Will you escape in time or break down under pressure?']}
        loop={false}
        cursor
        cursorStyle="|"
        typeSpeed={40}
        deleteSpeed={0}
        delaySpeed={1000}
    />
);

export default TypewriterText;
