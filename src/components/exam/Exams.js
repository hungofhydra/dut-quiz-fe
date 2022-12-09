import { Link } from "react-router-dom";
import "./Exams.css";

function Exams(props) {
  const exam = props.exam;
  return (
    <Link to={"/student/getTest/" + exam.id}>
      <div className="exambox">
        <div className="up">
          <div className="left">
            <span id="subject">{exam.subject}</span>
          </div>
          <div className="right">
            <span id="length">{exam.length + " câu"}</span>
            <span id="time">{exam.time + " phút"}</span>
          </div>
        </div>
        <div className="title">
          <span id="title">{exam.title}</span>
        </div>
        <div className="down">
          <span id="date">{exam.date}</span>
        </div>
      </div>
    </Link>
  );
}

export default Exams;
