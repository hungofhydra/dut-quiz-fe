import './Home.css';
import WellButton from '../button/WellButton';
import BadButton from '../button/BadButton';
import WarningButton from '../button/WarningButton';
import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import APIs from '../../test/APIs';

function Login() {
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [error0, setError0] = useState(false);
  const [error1, setError1] = useState(false);
  const [error2, setError2] = useState(false);
  const [loading, setLoading] = useOutletContext();
  let _object = useRef();

  const errors = APIs.signIN.errors;

  const Validating = (obj) => {
    if (obj.success === 'false') {
      switch (obj.message) {
        case errors[0]:
          setError0(true);
          setPasswordError(true);
          setUsernameError(true);
          return 1;
        case errors[1]:
          setError1(true);
          setPasswordError(true);
          return 1;
        case errors[2]:
          setError2(true);
          setUsernameError(true);
          return 1;
        default:
          return 1;
      }
    }
    return 0;
  };

  const SubmitHandler = () => {
    setError0(false);
    setError1(false);
    setError2(false);
    setLoading(true);
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const responseOptions = {
      method: 'POST',
      headers: APIs.signIN.headers,
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    };

    fetch(APIs.signIN.link, responseOptions)
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        _object.current = data;
        return Validating(_object.current);
      })
      .then((validator) => {
        if (validator === 0) {
          localStorage.setItem('token', _object.current.token);
          localStorage.setItem(
            'loginInfor',
            JSON.stringify({
              _id: _object.current.studentResult._id,
              fullName: _object.current.studentResult.fullName,
              MSSV: _object.current.studentResult.mssv,
              roles: _object.current.studentResult.roles[0],
              examsScore: _object.current.s,
            })
          );
          window.location.pathname = '/student';
        }
      })
      .catch((error) => {
        console.log('ERROR!');
        console.log(error);
        setLoading(false);
        setError0(true);
      });
  };
  const blurUsername = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      document.getElementById('password').focus();
    }
  };
  const blurPassword = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      SubmitHandler();
    }
  };
  useEffect(() => {
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    usernameInput.addEventListener('keydown', (e) => {
      blurUsername(e);
    });

    passwordInput.addEventListener('keydown', (e) => {
      blurPassword(e);
    });

    usernameInput.addEventListener('focus', (e) => {
      setUsernameError(false);
    });
    passwordInput.addEventListener('focus', (e) => {
      setPasswordError(false);
    });

    return () => {
      usernameInput.removeEventListener('keydown', (e) => {
        blurUsername(e);
      });
      passwordInput.removeEventListener('keydown', (e) => {
        blurPassword(e);
      });
      usernameInput.removeEventListener('focus', (e) => {
        setUsernameError(false);
      });
      passwordInput.removeEventListener('focus', (e) => {
        setPasswordError(false);
      });
    };
  }, []);

  return (
    <div>
      <form id="login">
        <div className="_input">
          <div className={usernameError ? 'text_input Error' : 'text_input'}>
            <input
              id="username"
              type="text"
              className="input_field"
              placeholder=" "
              required
            ></input>
            <label
              htmlFor="username"
              id="username_lable"
              className="input_lable"
            >
              T??n ????ng nh???p
            </label>
          </div>
          {error2 && (
            <p className="errorMessage">T??n ????ng nh???p kh??ng t???n t???i</p>
          )}
          <div className={passwordError ? 'text_input Error' : 'text_input'}>
            <input
              id="password"
              type="password"
              className="input_field"
              placeholder=" "
              required
            ></input>
            <label
              htmlFor="password"
              id="username_lable"
              className="input_lable"
            >
              M???t kh???u
            </label>
          </div>
          {error1 && <p className="errorMessage">M???t kh???u kh??ng ????ng</p>}
          {error0 && <p className="errorMessage">Vui l??ng nh???p th??ng tin</p>}
        </div>
        <Link to="reset-password" id="passforget">
          Qu??n m???t kh???u? Nh???n v??o ????y
        </Link>
        <div className="Loginbutton">
          <WarningButton link="/signUp" value="????ng k??" />
          <WellButton value="????ng nh???p" onClick={SubmitHandler} />
        </div>
      </form>
    </div>
  );
}

export default Login;
