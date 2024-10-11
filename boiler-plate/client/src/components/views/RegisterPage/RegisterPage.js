import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../../slice/userSlice";

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 회원가입 속성
  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  // 에러메시지
  const [ErrMsg, setErrMsg] = useState("");

  // 핸들러
  const onEmailHandler = (e) => {
    setEmail(e.target.value);
    setErrMsg("");
  };
  const onNameHandler = (e) => {
    setName(e.target.value);
    setErrMsg("");
  };
  const onPasswordHandler = (e) => {
    setPassword(e.target.value);
    setErrMsg("");
  };
  const onConfirmPasswordHandler = (e) => {
    setConfirmPassword(e.target.value);
    setErrMsg("");
  };

  // 회원가입 실행
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    // 비밀번호 일치 확인
    if (Password !== ConfirmPassword) {
      setErrMsg("비밀번호와 비밀번호 확인은 같아야합니다.");
      return;
    }

    let body = {
      email: Email,
      name: Name,
      password: Password,
    };
    try {
      const result = await dispatch(registerUser(body));
      console.log(result);
      if (!result.error) {
        // 성공 시 입력 필드 초기화
        setEmail("");
        setName("");
        setPassword("");
        setConfirmPassword("");
        navigate("/login"); // 회원가입 성공하면 로그인 화면으로 이동
      } else {
        console.error("회원가입 실패:", result.error.message);
      }
    } catch (error) {
      console.error("회원가입 중 오류 발생: " + error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmitHandler}
      >
        <label htmlFor="email"> Email</label>
        <input
          type="email"
          id="email"
          value={Email}
          onChange={onEmailHandler}
        ></input>
        <label htmlFor="name"> Name</label>
        <input
          type="text"
          id="name"
          value={Name}
          onChange={onNameHandler}
        ></input>
        <label htmlFor="password"> Password</label>
        <input
          type="password"
          id="password"
          value={Password}
          onChange={onPasswordHandler}
        ></input>
        <label htmlFor="ConfirmPassword"> Confirm Password</label>
        <input
          type="password"
          id="ConfirmPassword"
          value={ConfirmPassword}
          onChange={onConfirmPasswordHandler}
        ></input>
        {ErrMsg ? <p style={{ color: "red" }}>회원가입 실패: {ErrMsg}</p> : ""}
        {/* 에러 메시지 표시 */}
        <br />
        <button>회원 가입</button>
      </form>
    </div>
  );
}

export default RegisterPage;
