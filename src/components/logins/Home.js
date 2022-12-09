import './Home.css';
import { Outlet } from 'react-router-dom';
import loadingIcon from '../avatar/menuicon/loadingIcon.gif';
import { useState } from 'react';
function Home() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="login_page">
      <div className="login_title">
        <span id="namepage">HỆ THỐNG THI TRẮC NGHIỆM TRỰC TUYẾN</span>
        <span id="author">
          KHOA CÔNG NGHỆ THÔNG TIN - TRƯỜNG ĐẠI HỌC BÁCH KHOA - ĐẠI HỌC ĐÀ NẴNG
        </span>
      </div>
      <div className="login_part">
        <div id="logo"></div>
        <Outlet context={[loading, setLoading]} />
      </div>
      <div
        id="loadingLogin"
        style={
          !loading
            ? { visibility: 'hidden', transition: 0.25 }
            : { visibility: 'visible', transition: 0.25 }
        }
      >
        <div
          id="loadingIconLogin"
          style={{ backgroundImage: `url(${loadingIcon})` }}
        ></div>
      </div>
    </div>
  );
}

export default Home;
