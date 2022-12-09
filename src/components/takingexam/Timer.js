import { useState, useEffect, useRef } from 'react';

function Timer(props) {
  const [time, setTime] = useState(props.time * 60);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [second, setSecond] = useState(0);
  const timerID = useRef();

  function sendMinuteLeft(minutes) {
    props.timeout(minutes);
  }

  useEffect(() => {
    setHours(Math.floor(time / 3600));
    setMinutes(Math.floor((time % 3600) / 60));
    setSecond((time % 3600) % 60);
  });

  useEffect(() => {
    timerID.current = setInterval(() => {
      setTime((prev) => {
        sendMinuteLeft(prev - 1);
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timerID);
    };
  }, []);

  return (
    <div>
      <p id={props.id}>
        {(hours < 10 ? '0' + hours : hours) +
          ':' +
          (minutes < 10 ? '0' + minutes : minutes) +
          ':' +
          (second < 10 ? '0' + second : second)}
      </p>
    </div>
  );
}

export default Timer;
