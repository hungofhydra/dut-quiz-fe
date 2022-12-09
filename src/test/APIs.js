//SIGN IN:

const APIs = {
  signUP: {
    link: "https://exam-site-api.herokuapp.com/api/v1/auth/signup/",
    headers: {
      "Postman-Token": "<calculated when request is sent>",
      "Content-Type": "application/json",
      "Content-Length": "<calculated when request is sent>",
      Host: "<calculated when request is sent>",
      "User-Agent": "PostmanRuntime/7.29.2",
      Accept: "*/*",
      "Accept-Encoding": "gzip, deflate, br",
      Connection: "keep-alive",
    },
    errors: [
      "Duplicate value entered for username field, please choose another value",

      "Duplicate value entered for mssv field, please choose another value",
    ],
  },
  signIN: {
    link: "https://exam-site-api.herokuapp.com/api/v1/auth/signin/",
    headers: {
      "Postman-Token": "<calculated when request is sent>",
      "Content-Type": "application/json",
      "Content-Length": "<calculated when request is sent>",
      Host: "<calculated when request is sent>",
      "User-Agent": "PostmanRuntime/7.29.2",
      Accept: "*/*",
      "Accept-Encoding": "gzip, deflate, br",
      Connection: "keep-alive",
    },
    errors: [
      "Please provide username and password",
      "Password is incorrect",
      "User not found",
    ],
  },
  getAllExams: {
    link: "https://exam-site-api.herokuapp.com/api/v1/exam/",
    headers: {
      "Postman-Token": "<calculated when request is sent>",
      Host: "<calculated when request is sent>",
      "User-Agent": "PostmanRuntime/7.29.2",
      Accept: "*/*",
      "Accept-Encoding": "gzip, deflate, br",
      Connection: "keep-alive",
    },
  },
  getExam: {
    link: "https://exam-site-api.herokuapp.com/api/v1/exam/", //+examID
    headers: {
      // Authorization: "Bearer " +token
      "Postman-Token": "<calculated when request is sent>",
      Host: "<calculated when request is sent>",
      "User-Agent": "PostmanRuntime/7.29.2",
      Accept: "*/*",
      "Accept-Encoding": "gzip, deflate, br",
      Connection: "keep-alive",
    },
  },
  getStudentInfor: {
    link: "https://exam-site-api.herokuapp.com/api/v1/student/", //+studentID
    headers: {
      "Postman-Token": "<calculated when request is sent>",
      Host: "<calculated when request is sent>",
      "User-Agent": "PostmanRuntime/7.29.2",
      Accept: "*/*",
      "Accept-Encoding": "gzip, deflate, br",
      Connection: "keep-alive",
    },
  },
  inputExamScore: {
    link: "https://exam-site-api.herokuapp.com/api/v1/exam/score/",
    headers: {
      "Postman-Token": "<calculated when request is sent>",
      "Content-Type": "application/json",
      "Content-Length": "<calculated when request is sent>",
      Host: "<calculated when request is sent>",
      "User-Agent": "PostmanRuntime/7.29.2",
      Accept: "*/*",
      "Accept-Encoding": "gzip, deflate, br",
      Connection: "keep-alive",
    },
  },
};

export default APIs;
