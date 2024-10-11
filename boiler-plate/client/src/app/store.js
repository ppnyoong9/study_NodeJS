import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../slice/counterSlice.js'
import userReducer from '../slice/userSlice.js'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
  },
})