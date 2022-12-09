import "./QuizNode.css";

function QuizNode(props) {
  const src = props.src;

  return (
    <button
      className={"quizNode " + src.type}
      id={"node" + src.id}
      onClick={props.onClick}
    >
      <div className="indexNode">
        <p>{props.index}</p>
      </div>
    </button>
  );
}

export default QuizNode;
