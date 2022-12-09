import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/logins/Home";
import ExamList from "./pages/ExamList";
import Login from "./components/logins/login";
import ForgotPass from "./components/logins/forgotPass";
import SignUp from "./components/logins/SignUp";
import Student from "./pages/Student";
import Result from "./pages/Result";
import TakingExam from "./pages/Taking";
import Teacher from "./pages/Teacher";
import Testpage from "./pages/Testpage";
import { useEffect } from "react";
import GetTest from "./pages/GetTest";

function App() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (
      window.location.pathname === "/" &&
      (token !== "" || token === undefined)
    ) {
      window.location.pathname = "/student";
    }
  }, []);
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />}>
            <Route index element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/reset-password" element={<ForgotPass />} />
          </Route>
          <Route path="/student" element={<Student />}>
            <Route index element={<ExamList />} />
            <Route path="list" element={<ExamList />} />
            <Route path="results" element={<Result />} />
            <Route path="getTest" element={<GetTest />}>
              <Route path=":examID" element={<TakingExam />} />
            </Route>
          </Route>

          <Route path="/teacher" element={<Teacher />} />
          <Route path="/test" element={<Testpage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
