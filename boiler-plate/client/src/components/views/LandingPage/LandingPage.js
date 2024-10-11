import React, { useEffect } from "react";
import * as fetchUser from "../../../api/fetchUser.js";
import { useNavigate } from "react-router-dom";
/* import axios from "axios"; */

function LandingPage() {
  /*   useEffect(() => {
    axios.get("/api/hello").then((response) => console.log(response.data));
  }, []);

  */
  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await fetchUser.userLogoutAction();
    console.log("로그아웃완료", response);
    navigate("/login");
  };

  const style = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100vh",
  };

  return (
    <div style={style}>
      <div>
        <h2>시작페이지</h2>
      </div>
      <div>
        <button onClick={handleLogout}>로그아웃</button>
      </div>
    </div>
  );
}

export default LandingPage;
