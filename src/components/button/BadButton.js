import "./Button.css";
import { Link } from "react-router-dom";

function BadButton(props) {
  return (
    <div>
      <Link to={props.link}>
        <button type={props.type} className="badButton" onClick={props.onClick}>
          {props.value}
        </button>
      </Link>
    </div>
  );
}
export default BadButton;
