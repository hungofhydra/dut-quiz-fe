import { useState, useEffect, useRef } from "react";
import "./Avatar.css";
import Menu from "./Menu";

function Avatar() {
  const [isOpen, setIsOpen] = useState(false);
  const btnRef = useRef();
  const user = JSON.parse(localStorage.getItem("loginInfor"));
  useEffect(() => {
    const closeMenu = (e) => {
      if (e.path[1] !== btnRef.current) {
        setIsOpen(false);
      }
    };
    document.body.addEventListener("click", closeMenu);
    return () => document.body.removeEventListener("click", closeMenu);
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.lordicon.com/fudrjiwc.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    const lordAvatar = document.createElement("lord-icon");
    lordAvatar.trigger = "hover";
    lordAvatar.src = "https://cdn.lordicon.com/zthozvfn.json";
    lordAvatar.style = "width:100%; height:100%; background-repeat: no-repeat";
    document.getElementById("imageAvatar").appendChild(lordAvatar);
  }, []);

  return (
    <div
      className={"profile" + (isOpen ? " active" : "")}
      onClick={() => {
        setIsOpen((prev) => !prev);
      }}
    >
      <div className="num1">
        <div className="infor">
          <span id="name">{user.fullName}</span>
          <span id="studentid">
            {user.MSSV === "None" ? "teacher" : user.MSSV}
          </span>
        </div>
        <div className="avatar">
          <div className="image" id="imageAvatar" ref={btnRef}></div>
        </div>
      </div>

      <div className="Menu" id="profileMenu">
        <Menu />
      </div>
    </div>
  );
}

export default Avatar;
