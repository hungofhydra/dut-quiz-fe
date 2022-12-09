import "./Button.css";
import { Link } from "react-router-dom";

function WellButton(props) {
  return (
    <div>
      <Link to={props.link}>
        <button
          type={props.type}
          className="wellButton"
          onClick={props.onClick}
        >
          {props.value}
        </button>
      </Link>
    </div>
  );
}
export default WellButton;
