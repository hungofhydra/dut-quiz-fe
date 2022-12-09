import './Home.css';
import WellButton from '../button/WellButton';
import BadButton from '../button/BadButton';
import WarningButton from '../button/WarningButton';
import { useEffect, useRef, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import APIs from '../../test/APIs';

function SignUp() {
  const [studentNameError, setStudentNameError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [studentIDError, setStudentIDError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useOutletContext();
  const responseMessage = APIs.signUP.errors;

  const [errors, setError] = useState({
    studentname: '',
    studentID: '',
    username: '',
    studentPassword: '',
    studentPassConfirm: '',
  });
  let resObj = useRef();

  //Ham validate:
  const Validating = (inputs) => {
    let validator = 0;
    if (inputs.studentname === '') {
      setStudentNameError(true);
      setError((prev) => {
        let newEr = { ...prev };
        newEr.studentname = 'Vui lòng nhập họ và tên';
        return newEr;
      });
      validator = 1;
    }
    if (inputs.studentID === '') {
      setStudentIDError(true);
      setError((prev) => {
        let newEr = { ...prev };
        newEr.studentID = 'Vui lòng nhập mã số sinh viên';
        return newEr;
      });
      validator = 1;
    }
    if (inputs.usernameSignUp === '') {
      setUsernameError(true);
      setError((prev) => {
        let newEr = { ...prev };
        newEr.username = 'Vui lòng nhập tên đăng nhập';
        return newEr;
      });
      validator = 1;
    }
    if (inputs.passwordSignUp === '') {
      setPasswordError(true);
      setError((prev) => {
        let newEr = { ...prev };
        newEr.studentPassword = 'Vui lòng nhập mật khẩu của bạn';
        return newEr;
      });
      validator = 1;
    } else {
      if (inputs.passwordConfirm === '') {
        setPasswordError(true);
        setError((prev) => {
          let newEr = { ...prev };
          newEr.studentPassConfirm = 'Vui lòng xác nhận mật khẩu của bạn';
          return newEr;
        });
        validator = 1;
      } else {
        if (inputs.passwordConfirm !== inputs.passwordSignUp) {
          setPasswordError(true);
          setError((prev) => {
            let newEr = { ...prev };
            newEr.studentPassConfirm = 'Xác nhận mật khẩu không đúng';
            return newEr;
          });
          validator = 1;
        }
      }
    }

    return validator;
  };

  const CheckExistence = (obj) => {
    if (obj.success === 'false') {
      if (obj.message === responseMessage[0]) {
        // loi username ton tai
        setUsernameError(true);
        setError((prev) => {
          let newEr = { ...prev };
          newEr.username = 'Tên đăng nhập này đã tồn tại';
          return newEr;
        });
        return 1;
      } else if (obj.message === responseMessage[1]) {
        //loi MSSV ton tai
        setStudentIDError(true);
        setError((prev) => {
          let newEr = { ...prev };
          newEr.studentID = 'Mã số sinh viên này đã tồn tại';
          return newEr;
        });
        return 1;
      }
    }
    return 0;
  };

  //Xuly submit

  const SignUpHandler = () => {
    setStudentNameError(false);
    setUsernameError(false);
    setPasswordError(false);
    setStudentIDError(false);
    setSuccess(false);
    setError((prev) => {
      let restore = {
        studentname: '',
        studentID: '',
        username: '',
        studentPassword: '',
        studentPassConfirm: '',
      };
      return restore;
    });

    const inputs = {
      studentname: document.getElementById('studentname').value,
      studentID: document.getElementById('studentID').value,
      usernameSignUp: document.getElementById('usernameSignUp').value,
      passwordSignUp: document.getElementById('passwordSignUp').value,
      passwordConfirm: document.getElementById('passwordConfirm').value,
    };
    if (Validating(inputs) === 0) {
      setLoading(true);
      const responeOptions = {
        method: 'POST',
        headers: APIs.signUP.headers,
        body: JSON.stringify({
          username: inputs.usernameSignUp,
          password: inputs.passwordSignUp,
          fullName: inputs.studentname,
          class: 'Student',
          department: 'CNTT',
          mssv: inputs.studentID,
        }),
      };

      fetch(APIs.signUP.link, responeOptions)
        .then((response) => response.json())
        .then((data) => {
          setLoading(false);
          resObj.current = data;
          console.log(resObj.current);
          return CheckExistence(resObj.current);
        })
        .then((checked) => {
          if (checked === 0) {
            setSuccess(true);
          }
        });
    }
  };

  //xu ly su kien ban phim
  const blurInputs = (e, nextID) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      if (nextID !== '_') {
        document.getElementById(nextID).focus();
      } else {
        e.target.blur();
        SignUpHandler();
      }
    }
  };

  useEffect(() => {
    const studentname = document.getElementById('studentname');
    const studentID = document.getElementById('studentID');
    const usernameSignUp = document.getElementById('usernameSignUp');
    const passwordSignUp = document.getElementById('passwordSignUp');
    const passwordConfirm = document.getElementById('passwordConfirm');

    studentname.addEventListener('keydown', (e) => {
      blurInputs(e, 'studentID');
    });

    studentID.addEventListener('keydown', (e) => {
      blurInputs(e, 'usernameSignUp');
    });

    usernameSignUp.addEventListener('keydown', (e) => {
      blurInputs(e, 'passwordSignUp');
    });

    passwordSignUp.addEventListener('keydown', (e) => {
      blurInputs(e, 'passwordConfirm');
    });

    passwordConfirm.addEventListener('keydown', (e) => {
      blurInputs(e, '_');
    });

    return () => {
      studentname.removeEventListener('keydown', (e) => {
        blurInputs(e, 'studentID');
      });

      studentID.removeEventListener('keydown', (e) => {
        blurInputs(e, 'usernameSignUp');
      });

      usernameSignUp.removeEventListener('keydown', (e) => {
        blurInputs(e, 'passwordSignUp');
      });

      passwordSignUp.removeEventListener('keydown', (e) => {
        blurInputs(e, 'passwordConfirm');
      });

      passwordConfirm.removeEventListener('keydown', (e) => {
        blurInputs(e, '_');
      });
    };
  }, []);

  return (
    <div className="signup">
      <form id="signup">
        <div className="_input">
          <div className={studentNameError ? 'text_input Error' : 'text_input'}>
            <input
              id="studentname"
              type="text"
              className="input_field"
              placeholder=" "
              required
            ></input>
            <label
              htmlFor="studentname"
              id="studentname_lable"
              className="input_lable"
            >
              Họ và tên
            </label>
          </div>
          {studentNameError && (
            <p className="errorMessage">{errors.studentname}</p>
          )}
          <div className={studentIDError ? 'text_input Error' : 'text_input'}>
            <input
              id="studentID"
              type="text"
              className="input_field"
              placeholder=" "
              required
            ></input>
            <label
              htmlFor="studentID"
              id="username_lable"
              className="input_lable"
            >
              Mã số sinh viên
            </label>
          </div>
          {studentIDError && <p className="errorMessage">{errors.studentID}</p>}
          <div className={usernameError ? 'text_input Error' : 'text_input'}>
            <input
              id="usernameSignUp"
              type="text"
              className="input_field"
              placeholder=" "
              required
            ></input>
            <label
              htmlFor="usernameSignUp"
              id="username_lable"
              className="input_lable"
            >
              Tên đăng nhập
            </label>
          </div>
          {usernameError && <p className="errorMessage">{errors.username}</p>}
          <div className={passwordError ? 'text_input Error' : 'text_input'}>
            <input
              id="passwordSignUp"
              type="password"
              className="input_field"
              placeholder=" "
              required
            ></input>
            <label
              htmlFor="passwordSignUp"
              id="password_lable"
              className="input_lable"
            >
              Mật khẩu
            </label>
          </div>
          {passwordError && errors.studentPassword !== '' && (
            <p className="errorMessage">{errors.studentPassword}</p>
          )}
          <div className={passwordError ? 'text_input Error' : 'text_input'}>
            <input
              id="passwordConfirm"
              type="password"
              className="input_field"
              placeholder=" "
              required
            ></input>
            <label
              htmlFor="passwordConfirm"
              id="passConfirm_lable"
              className="input_lable"
            >
              Xác nhận lại mật khẩu
            </label>
          </div>
          {passwordError && errors.studentPassConfir !== '' && (
            <p className="errorMessage">{errors.studentPassConfirm}</p>
          )}
        </div>
        {success && (
          <p className="successAnnouce">Đăng ký tài khoản thành công</p>
        )}
        <div className="Loginbutton">
          <WellButton link="/" value="Đã có tài khoản" />
          <WarningButton value="Đăng ký" onClick={SignUpHandler} />
        </div>
      </form>
    </div>
  );
}
export default SignUp;
