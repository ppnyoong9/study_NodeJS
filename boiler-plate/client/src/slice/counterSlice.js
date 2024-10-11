import { createSlice } from '@reduxjs/toolkit'
// Slice 예시 참고하려고 가져옴

// state의 초기값을 설정
const initialState = {
  value: 0,
}

export const counterSlice = createSlice({
  name: 'counter', // 액션 타입의 prefix
  initialState,
  reducers: { // 상태를 변경하는 reducer 함수 정의
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer