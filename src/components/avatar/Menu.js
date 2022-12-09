import "./Avatar.css";
import MenuItems from "./MenuItems";
import listOutline from "./menuicon/listofexam.gif";
import result from "./menuicon/result.gif";
import logout from "./menuicon/logout.gif";

const menuItems = [
  {
    icon: listOutline,
    title: "Danh sách bài thi",
    link: "/student/list",
  },
  {
    icon: result,
    title: "Kết quả",
    link: "/student/results",
  },
  {
    icon: logout,
    title: "Đăng xuất",
    link: "/",
  },
];

function Menu() {
  return (
    <div className="MenuProfile">
      <MenuItems
        icon={menuItems[0].icon}
        title={menuItems[0].title}
        link={menuItems[0].link}
      />
      <MenuItems
        icon={menuItems[1].icon}
        title={menuItems[1].title}
        link={menuItems[1].link}
      />
      <MenuItems
        icon={menuItems[2].icon}
        title={menuItems[2].title}
        link={menuItems[2].link}
        onClick={() => {
          localStorage.setItem("token", "");
          localStorage.setItem("loginInfor", "");
          localStorage.setItem("scores", "");
        }}
      />
    </div>
  );
}

export default Menu;
