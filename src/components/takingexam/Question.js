import "./Question.css";
import { useState } from "react";

function Question(props) {
  let src = props.src;

  let [multipleCheck, setMultipleCheck] = useState([]);
  const checkDoneMultiple = (array) => {
    let theQuestion = document.getElementById(src.id);
    let _check = array.length !== 0;
    theQuestion.classList.toggle("done", _check);
    let node = document.getElementById("node" + src.id);
    node.classList.toggle("done", theQuestion.classList.contains("done"));
  };

  function MultipleCheckHandler(id) {
    let _check = multipleCheck.includes(id);
    if (_check) {
      let after = multipleCheck.filter((item) => item !== id);
      setMultipleCheck(after);
      checkDoneMultiple(after);
    } else {
      let after = [...multipleCheck, id];
      setMultipleCheck(after);
      checkDoneMultiple(after);
    }
  }

  let [singleCheck, setSingleCheck] = useState("");
  const checkDoneSingle = (id) => {
    let theQuestion = document.getElementById(src.id);
    let _check = id !== "";
    theQuestion.classList.toggle("done", _check);
    let node = document.getElementById("node" + src.id);
    node.classList.toggle("done", theQuestion.classList.contains("done"));
  };
  const recordedSingle = (ansId, QuesId) => {
    props.recordAction(ansId, QuesId);
  };

  function SingleCheckHandler(ansId, QuesId) {
    setSingleCheck(ansId);
    checkDoneSingle(ansId);
    recordedSingle(ansId, QuesId);
  }

  switch (src.type) {
    case "Multiple":
      return (
        <div className="multipleChoiceQuiz">
          <div className="theQuestion" id={src.id}>
            <p>{"Câu " + props.index + ": " + src.title}</p>
          </div>
          <div className="theAnswers">
            {src.answers.map((ans, index) => {
              return (
                <div className="answer" id={ans.id} key={ans.id}>
                  <input
                    type="checkbox"
                    onChange={() => MultipleCheckHandler(ans.id)}
                  />{" "}
                  {ans.content};
                </div>
              );
            })}
          </div>
        </div>
      );
    case "Single":
      return (
        <div className="singleChoiceQuiz">
          <div className="theQuestion" id={src.id}>
            <p>{"Câu " + props.index + ": " + src.title}</p>
          </div>
          <div className="theAnswers">
            {src.answers.map((ans, index) => {
              return (
                <div className="answer" key={ans.id} id={ans.id}>
                  <input
                    type="radio"
                    checked={singleCheck === ans.id}
                    onChange={() => SingleCheckHandler(ans.id, src.id)}
                  />
                  {ans.content}
                </div>
              );
            })}
          </div>
        </div>
      );
    default:
      return <div></div>;
  }
}

export default Question;
