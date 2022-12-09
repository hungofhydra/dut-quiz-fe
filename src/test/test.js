let questions = [];
let n = 100;
for (let i = 1; i <= n; i++) {
  let trueAns = Math.random() * 4;
  const quest = {
    id: "id" + i,
    type: i % 2 === 0 ? "Single" : "Multiple",
    title:
      "Đây là câu hỏi số " +
      i +
      ", câu hỏi số một ở vị trí số " +
      i +
      " và là câu hỏi thứ " +
      i +
      " của bộ câu hỏi",
    answers: [
      {
        state: trueAns === 0,
        content: "Đây là đáp án 1 của câu hỏi số " + i,
      },
      {
        state: trueAns === 1,
        content: "Đây là đáp án 2 của câu hỏi số " + i,
      },
      {
        state: trueAns === 2,
        content: "Đây là đáp án 3 của câu hỏi số " + i,
      },
      {
        state: trueAns === 3,
        content: "Đây là đáp án 4 của câu hỏi số " + i,
      },
    ],
  };
  questions.push(quest);
}

const questionSet = {
  id: "#set",
  questions: questions,
};

const allExams = [
  {
    id: "#Exam1",
    subject: "Ngôn ngữ lập trình",
    time: 90,
    title: "Bài thi giữa kỳ môn ngôn ngữ lập trình",
    date: "9h00 ngày 22/10/2022",
    set: questionSet,
  },
  {
    id: "#Exam2",
    subject: "Ngôn ngữ lập trình",
    time: 90,
    title: "Bài thi giữa kỳ môn ngôn ngữ lập trình",
    date: "9h00 ngày 22/10/2022",
    set: questionSet,
  },
  {
    id: "#Exam3",
    subject: "Ngôn ngữ lập trình",
    time: 90,
    title: "Bài thi giữa kỳ môn ngôn ngữ lập trình",
    date: "9h00 ngày 22/10/2022",
    set: questionSet,
  },
  {
    id: "#Exam4",
    subject: "Ngôn ngữ lập trình",
    time: 90,
    title: "Bài thi giữa kỳ môn ngôn ngữ lập trình",
    date: "9h00 ngày 22/10/2022",
    set: questionSet,
  },
];

export default allExams;
