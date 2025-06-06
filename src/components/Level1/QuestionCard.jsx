import '@/css/LevelOne.css';

const QuestionCard = ({ question, options, onAnswer }) => (
    <div className="level-one-question-card">
        <p className="level-one-question-text">{question}</p>
        <div className="level-one-options-list">
            {options.map((option, index) => (
                <button
                    key={index}
                    onClick={() => onAnswer(option)}
                    className="level-one-option-button"
                >
                    {option}
                </button>
            ))}
        </div>
    </div>
);

export default QuestionCard;
