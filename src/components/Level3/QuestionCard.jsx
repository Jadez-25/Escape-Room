import '@/css/LevelThree.css';

const QuestionCard = ({ question, selectedAnswer, lives, onAnswer }) => (
    <div className="level-three-question-card">
        <div className="level-three-lives-counter">Lives Remaining: {lives}</div>
        <p className="level-three-question-text">{question.question}</p>
        <div className="level-three-options-list">
            {question.options.map((option, index) => (
                <button
                    key={index}
                    onClick={() => onAnswer(option)}
                    className={`level-three-option-button ${selectedAnswer === option ? 'selected' : ''}`}
                >
                    {option}
                </button>
            ))}
        </div>
    </div>
);

export default QuestionCard;
