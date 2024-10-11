import React, { useState } from "react";
import Axios from "axios";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../slice/userSlice.js";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 로그인 속성
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  // 에러메시지
  const [ErrMsg, setErrMsg] = useState("");

  // 핸들러
  const onEmailHandler = (event) => {
    setEmail(event.target.value);
    setErrMsg("");
  };
  const onPasswordHandler = (event) => {
    setPassword(event.target.value);
    setErrMsg("");
  };

  // 로그인 실행
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setErrMsg("");
    const body = {
      email: Email,
      password: Password,
    };

    try {
      const result = await dispatch(loginUser(body)); //로그인하려는 사용자 정보 전달
      //console.log(result);
      if (result.meta.requestStatus === "fulfilled") {
        navigate("/"); // 메인으로 이동
      } else {
        console.error("로그인 실패:", result.error.message);
        setErrMsg(result.payload.message); // 성공 시 result 업데이트
      }
    } catch (error) {
      console.error("로그인 중 오류 발생: " + error);
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
        <label htmlFor="password"> Password</label>
        <input
          type="password"
          id="password"
          value={Password}
          onChange={onPasswordHandler}
        ></input>
        <br />
        <button>Login</button>
        {ErrMsg ? <p style={{ color: "red" }}>로그인 실패: {ErrMsg}</p> : ""}
        {/* 에러 메시지 표시 */}
      </form>
    </div>
  );
}

export default LoginPage;
