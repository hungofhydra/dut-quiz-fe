import "./ResultAnounce.css";
import BadButton from "../button/BadButton";
import { useEffect, useState } from "react";
function ResultAnounce(props) {
  const _props = props.theProps;
  const [time, setTime] = useState(_props.timeTaken * 60);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [second, setSecond] = useState(0);

  useEffect(() => {
    //generation thoi gian
    setHours(Math.round(Math.floor(time / 3600)));
    setMinutes(Math.round(Math.floor((time % 3600) / 60)));
    setSecond(Math.round(time % 3600) % 60);
  }, []);

  return (
    <div className="resultAnounce">
      <div className="resultContain">
        <h2>{_props.title}</h2>
        <p className="text">Chúc mừng bạn đã hoàn thành bài thi</p>
        <p className="text">Số điểm của bạn</p>
        <p
          className={
            Number(_props.score) >= 8
              ? "_score good"
              : Number(_props.score) >= 6
              ? "_score"
              : "_score bad"
          }
        >
          {_props.score}
        </p>
        <p className="text">Thời gian làm bài</p>
        <p className="timeDone">
          {(hours < 10 ? "0" + hours : hours) +
            ":" +
            (minutes < 10 ? "0" + minutes : minutes) +
            ":" +
            (second < 10 ? "0" + second : second)}
        </p>
        <BadButton link="/student" type="text" value="Kết thúc" />
      </div>
    </div>
  );
}

export default ResultAnounce;
