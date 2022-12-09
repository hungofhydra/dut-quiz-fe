import './Taking.css';
import Header from '../components/Header';
import Question from '../components/takingexam/Question';
import BadButton from '../components/button/BadButton';
import WellButton from '../components/button/WellButton';
import WarningButton from '../components/button/WarningButton';
import QuizNode from '../components/takingexam/QuizNode';
import Timer from '../components/takingexam/Timer';
import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import loadingIcon from '../components/avatar/menuicon/loadingIcon.gif';
import APIs from '../test/APIs';
import allExams from '../test/test';
import Countdown from 'react-countdown';
import ResultAnounce from '../components/takingexam/ResultAnounce';

function TakingExam() {
  const warningMessage = [
    '- Chọn đáp án đúng nhất ở các câu hỏi trắc nghiệm. Các câu yêu cầu chọn nhiều đáp án, có ô chọn hình vuông thì phải chọn hết tất cả các đáp án đúng mới được tính điểm.',

    '- Tuyệt đối không được click chuột ra khỏi khu vực làm bài trong quá trình làm bài thi. Nếu vi phạm quá 3 lần, bài thi sẽ dừng lại ngay lập tức.',
    '- Nếu trong quá trình làm bài xảy ra sự cố về mạng. Hãy đăng nhập lại, hệ thống vẫn sự lưu trữ quá trình làm bài.',
    '- Có thể click vào ô câu hỏi bên trên để lướt nhanh đến câu hỏi muốn làm',
  ];
  const params = useParams();
  const examID = params.examID;
  const exam = JSON.parse(localStorage.getItem('exams')).find(
    (exam) => exam.id === examID
  );
  const [questions, setQuestion] = useState([]);

  //fetch api lay bo cau hoi
  const getQuestions = () => {
    console.log('fetching...');
    const responseOptions = {
      method: 'GET',
      headers: {
        ...APIs.getExam.headers,
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };

    fetch(APIs.getExam.link + examID, responseOptions)
      .then((res) => res.json())
      .then((data) => {
        console.log('done Fetching');
        if (data.success === 'true') {
          const dataQuestions = data.exam.questions;
          let allQuestions = [];
          dataQuestions.forEach((question) => {
            let answerArray = [];
            // console.log(question);
            question.choices.forEach((choice) => {
              const answer = {
                state: choice.isTrue,
                content: choice.choiceTitle,
                id: choice._id,
              };
              answerArray.push(answer);
            });
            const studentQuestion = {
              id: question._id,
              type: question.type,
              title: question.questionTitle,
              answers: answerArray,
            };

            allQuestions.push(studentQuestion);
          });
          localStorage.setItem('questions', JSON.stringify(allQuestions));
          return allQuestions;
        } else return 'error';
      })
      .then((allquestions) => {
        setQuestion(allquestions);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getQuestions();
  }, []);

  // const questions = JSON.parse(localStorage.getItem("examQuestion"));

  let countNode = 0;
  let countQuest = 0;
  let countFault = useRef(0);

  const [submit, setSubmit] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const submission = useRef([]);
  // const [allDone, setAllDone] = useState(false);
  const [resultAn, setResultAn] = useState(false);
  const [rsProps, serRsProps] = useState({
    title: '',
    score: 0,
    timeTaken: 0,
  });

  function preventBlurWin() {
    countFault.current++;
    setShowWarning(true);
  }

  useEffect(() => {
    window.addEventListener('blur', preventBlurWin);

    return () => {
      window.removeEventListener('blur', preventBlurWin);
    };
  }, []);

  useEffect(() => {
    const logo = document.getElementById('logo');
    const preventLogoClick = (e) => {
      e.preventDefault();
    };
    logo.addEventListener('click', (e) => {
      preventLogoClick(e);
    });
    return () => {
      logo.removeEventListener('click', (e) => {
        preventLogoClick(e);
      });
    };
  }, []);

  function TimeOUt(minutesLeft) {
    localStorage.setItem('minutesLeft', minutesLeft);
    if (minutesLeft === 0 && confirm === false) {
      SubmitHandler();
    }
  }
  function RecordAnswers(ansId, quesId) {
    const record = {
      quesId: quesId,
      ansId: ansId,
    };
    if (
      submission.current.some((_record) => _record.quesId === record.quesId) ===
      true
    ) {
      ///thay the
      submission.current.map((_record) => {
        if (_record.quesId === record.quesId) _record.ansId = record.ansId;
        return _record;
      });
    } else {
      submission.current.push(record);
    }
  }
  function SubmitHandler() {
    //mở trang loading
    setConfirm(true);
    setShowWarning(false);
    setSubmit(false);
    const mnLeft = JSON.parse(localStorage.getItem('minutesLeft')) / 60;

    document.getElementById('logo').removeEventListener('click', () => {});

    //

    //Chấm bài.

    const answerPoint = 10 / countNode;
    const questionSet = JSON.parse(localStorage.getItem('questions'));
    let _score = 0;

    submission.current.forEach((_record) => {
      const theQuestion = questionSet.find(
        (question) => question.id === _record.quesId
      );
      const theAnswer = theQuestion.answers.find(
        (answer) => answer.id === _record.ansId
      );
      if (theAnswer.state === true) _score += answerPoint;
      console.log('questions: ' + theQuestion.id + ' ' + theAnswer.state);
    });

    //Gửi bài lên server

    const inputRsOptions = {
      method: 'POST',
      headers: {
        ...APIs.inputExamScore.headers,
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify({
        examId: exam.id,
        score: _score.toFixed(2),
      }),
    };
    console.log(inputRsOptions);
    fetch(APIs.inputExamScore.link, inputRsOptions)
      .then((rs) => rs.json())
      .then((data) => {
        if (data.success === 'true') {
          console.log('success');
          //xoa exams và questions trong localstorage
          localStorage.setItem('exams', '');
          localStorage.setItem('questions', '');
          ///chuyen trang
          if (mnLeft === 0) {
            //tra ve trang home
            window.location.pathname = '/student';
          } else {
            //tra ve trang xem diem
            // const rsprops = {
            //   title: exam.title,
            //   score: _score.toFixed(2),
            //   timeTaken: exam.time - mnLeft,
            // };
            // serRsProps(rsprops);
            // setResultAn(true);
            window.location.pathname = '/student/results';
          }
        } else {
          setConfirm(false);
          console.log(data.message);
        }
      });
  }

  if (resultAn === false) {
    return (
      <div className="takingExam">
        <div className="contain">
          <div className="title">
            <span>{exam.title}</span>
          </div>
          <div className="nottitle">
            <div className="testManaging">
              <div className="questionNodes">
                {questions.map((question, index) => {
                  return (
                    <QuizNode
                      src={question}
                      index={++countNode}
                      key={question.id + 'node'}
                      onClick={() => {
                        document
                          .getElementById(
                            questions[index === 0 ? index : index - 1].id
                          )
                          .scrollIntoView({
                            behavior: 'smooth',
                            block: 'start',
                            inline: 'nearest',
                          });
                      }}
                    />
                  );
                })}
              </div>
              <div className="warning">
                <p id="faultCount">{'Số lần vi phạm: ' + countFault.current}</p>
                <div id="warningMessage">
                  {warningMessage.map((mess) => {
                    return <p key={warningMessage.indexOf(mess)}>{mess}</p>;
                  })}
                </div>
              </div>
            </div>
            <div className="testContain">
              <div className="infor">
                <div id="timer">
                  {!confirm ? (
                    <Timer time={exam.time} timeout={TimeOUt} />
                  ) : (
                    '00:00:00'
                  )}
                </div>
                <div id="subject">
                  <p>{'Học phần: ' + exam.subject}</p>
                </div>
                <div id="time">
                  <p>{'Thời gian: ' + exam.time + ' phút'}</p>
                </div>
              </div>
              <div className="testField">
                {questions.map((question) => {
                  return (
                    <Question
                      src={question}
                      index={++countQuest}
                      key={question.id}
                      recordAction={RecordAnswers}
                    />
                  );
                })}
              </div>

              <div className="submitBtn">
                <BadButton
                  value="Nộp bài"
                  onClick={() => setSubmit((prev) => !prev)}
                />
              </div>
            </div>
          </div>
        </div>

        <div id="left"></div>
        <div id="right"></div>
        <div id="top"></div>
        <div id="bottom"></div>
        <div
          id="confirm"
          style={
            !submit
              ? { visibility: 'hidden', transition: 0.25 }
              : { visibility: 'visible', transition: 0.25 }
          }
        >
          <div className="confirmMessage">
            <p>
              Bạn đã chắc chắn muốn nộp bài? Nếu bấm nút nộp bài sẽ không thể
              chỉnh sửa được nữa. Hãy chắc chắn bạn đã làm hết khả năng của
              mình.
            </p>
            <div className="confirmBtn">
              <WarningButton
                value="Chờ chút kiểm tra lại tí!"
                onClick={() => setSubmit((prev) => !prev)}
              />
              <WellButton value="Nộp luôn!" onClick={SubmitHandler} />
            </div>
          </div>
        </div>

        <div
          id="warn"
          style={
            !showWarning
              ? { visibility: 'hidden', transition: 0.25 }
              : { visibility: 'visible', transition: 0.25 }
          }
        >
          <div className="confirmMessage">
            <p>
              {`Bạn đã vi phạm ${countFault.current} lần, nếu vi phạm thêm ${
                3 - countFault.current
              }
            lần nữa bài thi của bạn sẽ được kết thúc ngay lập tức`}
            </p>
            <WarningButton
              value="Đã hiểu"
              onClick={() => setShowWarning(false)}
            />
          </div>
        </div>

        <div
          id="loading"
          style={
            !confirm
              ? { visibility: 'hidden', transition: 0.25 }
              : { visibility: 'visible', transition: 0.25 }
          }
        >
          <div
            id="loadingIcon"
            style={{ backgroundImage: `url(${loadingIcon})` }}
          ></div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <ResultAnounce theProps={rsProps} />
      </div>
    );
  }
}

export default TakingExam;
