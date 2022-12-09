import "./Button.css";
import { Link } from "react-router-dom";

function WarningButton(props) {
  return (
    <div>
      <Link to={props.link}>
        <button
          type={props.type}
          className="warningButton"
          onClick={props.onClick}
        >
          {props.value}
        </button>
      </Link>
    </div>
  );
}
export default WarningButton;
