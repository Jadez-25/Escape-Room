const QuestionCard = ({ question, onAnswer }) => {
    return (
    <div className="level-four-question-card">
      <h2>{question.prompt}</h2>
      {question.options.map((option, index) => (
        <button
          key={index}
          className="level-four-answer-btn"
          onClick={() => onAnswer(option === question.answer)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default QuestionCard;
