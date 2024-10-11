import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as fetchUser from "../api/fetchUser.js";

// 데이터 가져오기
export const loginUser = createAsyncThunk(
  "user/login",
  async (body, { rejectWithValue }) => {
    try {
      const response = await fetchUser.userLoginAction(body);
      if (response.loginSuccess) {
        return response; // 로그인 성공 시 응답 데이터 반환
      } else {
        return rejectWithValue(response);
      }
    } catch (error) {
      return rejectWithValue(error.response.data || "로그인 오류");
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/register",
  async (body, { rejectWithValue }) => {
    try {
      const response = await fetchUser.userRegisterAction(body);
      if (response.success) {
        return response;
      } else {
        throw new Error("회원가입 실패"); // 서버에서 실패했을 때 예외 발생
      }
    } catch (error) {
      throw error;
    }
  }
);

export const authUser = createAsyncThunk("user/auth", async () => {
  try {
    const response = await fetchUser.userAuth();
    return response
  } catch (error) {
    throw error;
  }
});

// state의 초기값을 설정
const initialState = {
  user: null,
  register: null,
  userData: null,
};

export const userSlice = createSlice({
  name: "user", // 액션 타입의 prefix
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.register = action.payload;
      })
      .addCase(authUser.fulfilled, (state, action) => {
        state.userData = action.payload; // 사용자 정보 저장
      });
  },
});

export const { login } = userSlice.actions;

export default userSlice.reducer;
