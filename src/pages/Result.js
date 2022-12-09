import { useEffect, useState } from "react";
import "./Result.css";
import APIs from "../test/APIs";
import Score from "../components/scores/Score";

function Result() {
  const scores = JSON.parse(localStorage.getItem("scores"));
  const [scoreList, setScoreList] = useState([]);

  const getAllExam = () => {
    let allScore = [];
    const responseOptions = {
      method: "GET",
      headers: APIs.getAllExams.headers,
    };
    fetch(APIs.getAllExams.link, responseOptions)
      .then((res) => res.json())
      .then((data) => {
        if (data.success === "true") {
          scores.forEach((score) => {
            const _exam = data.exams.find((exam) => exam._id === score.examId);
            const scoreElement = {
              id: score._id,
              title: _exam.title,
              examId: score.examId,
              score: score.score,
            };

            allScore.push(scoreElement);
          });
          setScoreList((prev) => allScore);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllExam();
  }, []);

  return (
    <div className="studentResult">
      <div className="header"></div>
      <div className="contain">
        <div className="all">
          <h2>Kết quả thi của bạn</h2>
          {scoreList.map((score) => {
            return <Score key={score.id} score={score} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Result;
