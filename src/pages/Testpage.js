import "../index.css";
import { useState, useEffect, useRef } from "react";
import APIs from "../test/APIs";
import ResultAnounce from "../components/takingexam/ResultAnounce";

function Testpage() {
  //#region  test api exam
  // const [_exams, setExams] = useState([]);
  // const [content, setContent] = useState();

  // const getAllExam = () => {
  //   let allExams = [];
  //   const responseOptions = {
  //     method: "GET",
  //     headers: APIs.getAllExams.headers,
  //   };
  //   console.log("fetching...");
  //   fetch(APIs.getAllExams.link, responseOptions)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.success === "true") {
  //         data.exams.forEach((exam) => {
  //           let date = new Date(exam.startDate);
  //           let examDate =
  //             date.getHours() +
  //             "h" +
  //             date.getMinutes() +
  //             " ngày " +
  //             date.getDate() +
  //             "/" +
  //             date.getMonth() +
  //             "/" +
  //             date.getFullYear();
  //           let examElement = {
  //             id: exam._id,
  //             subject: "Ngôn Ngữ Lập trình",
  //             title: exam.title,
  //             time: exam.duration,
  //             date: examDate,
  //             length: exam.numberOfQuestion,
  //           };

  //           allExams.push(examElement);
  //           console.log("done");
  //           setExams((prev) => {
  //             return allExams;
  //           });
  //         });
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // const getExams = (id) => {
  //   const responseOptions = {
  //     method: "GET",
  //     headers: {
  //       ...APIs.getExam.headers,
  //       Authorization: "Bearer " + localStorage.getItem("token"),
  //     },
  //   };
  //   console.log(responseOptions);
  //   fetch(APIs.getExam.link + id, responseOptions)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       setContent(JSON.stringify(data));
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // useEffect(() => {
  //   getAllExam();
  // }, []);

  // return (
  //   <div className="testpage" style={{ padding: 20 }}>
  //     {_exams.map((exam) => {
  //       return (
  //         <div key={exam.id}>
  //           <button
  //             style={{ margin: 5, padding: 5 }}
  //             onClick={() => getExams(exam.id)}
  //           >
  //             {exam.id}
  //           </button>
  //         </div>
  //       );
  //     })}
  //     <div
  //       className="view"
  //       style={{ width: 500, height: 100, border: "1px solid black" }}
  //     >
  //       <p>{content}</p>
  //     </div>
  //   </div>
  // );

  //#endregion
  const props = {
    title: "THI GIỮA KỲ HỌC PHẦN NGÔN NGỮ LẬP TRÌNH HỌC KỲ I 2022-2023",
    score: 8,
    timeTaken: 20.6,
  };
  return <ResultAnounce theProps={props} />;
}

export default Testpage;
