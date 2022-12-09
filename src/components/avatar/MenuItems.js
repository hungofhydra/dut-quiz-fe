import "./Avatar.css";
import { Link } from "react-router-dom";

function MenuItems(props) {
  return (
    <Link to={props.link} onClick={props.onClick}>
      <div className="menuItems">
        <div
          className="icon"
          style={{ backgroundImage: `url(${props.icon})` }}
        ></div>
        <div className="title">{props.title}</div>
      </div>
    </Link>
  );
}
export default MenuItems;
