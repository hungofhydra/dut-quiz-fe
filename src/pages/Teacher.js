import { Outlet } from "react-router-dom";
import "./Teacher.css";
import Header from "../components/Header";

function Teacher() {
  return (
    <div className="teacher">
      <Outlet />
      <Header type="teacher" />
    </div>
  );
}

export default Teacher;
