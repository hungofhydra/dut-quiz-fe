import "./Score.css";

function Score(props) {
  const score = props.score;
  return (
    <div className="scoreContain">
      <div className="left">
        <div className="examID">{"examId= " + score.examId}</div>
        <div className="title">{score.title}</div>
      </div>
      <div className="right">
        <div
          className={
            Number(score.score) >= 8
              ? "_score good"
              : Number(score.score) >= 6
              ? "_score"
              : "_score bad"
          }
        >
          {score.score}
        </div>
      </div>
    </div>
  );
}
export default Score;
