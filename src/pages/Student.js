import { Outlet } from "react-router-dom";
import Header from "../components/Header";

function Student() {
  //LayStudentInfo

  return (
    <div className="student">
      <Header type="student" />
      <Outlet />
    </div>
  );
}

export default Student;
