import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authUser } from "../slice/userSlice";
import { useNavigate } from "react-router-dom";

export default function ({ SpecificComponent, option, adminRoute = null }) {
  // null     =>  아무나 출입이 가능한 페이지
  // true     =>  로그인한 유저만 출입이 가능한 페이지
  // false    =>  로그인한 유저는 출입 불가능한 페이지

  function AuthenticationCheck() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
      const fetchAuth = async () => {
        const response = await dispatch(authUser());
        console.log(response);
        console.log("isAuth:", response.payload.isAuth);
        console.log("option:", option);
        if (!response.payload.isAuth) {
          if (!option) {
            if (option == null) {
              navigate("/register");
            } else {
              navigate("/login");
            }
            // 로그인 하지 않은 상태
          }
        } else {
          if (adminRoute && !response.payload.isAdmin) {
            navigate("/");
          } else {
            if (option === false) {
              navigate("/");
              //  로그인한 상태
            }
          }
        }
      };

      fetchAuth();
    }, []);

    return <SpecificComponent />;
  }

  return <AuthenticationCheck />;
}
