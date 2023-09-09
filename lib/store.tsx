import {userData} from "./auth";
import {createSlice, configureStore} from "@reduxjs/toolkit";

export type userType = null | userData;

const userSlice = createSlice({
  name: "authentification",
  initialState: {
    isUser: false,
    isPassword: true,
    user: null as userType,
  },
  reducers: {
    setIsUerAction(state, action) {
      state.isUser = action.payload as boolean;
    },
    setIsPasswordAction(state, action) {
      state.isPassword = action.payload;
    },
    updateUserAction(state, action) {
      state.user = action.payload as userType;
    },
    deleteUserAction(state) {
      state.user = null;
      state.isUser = false;
    },
  },
});

export const {
  setIsUerAction,
  setIsPasswordAction,
  updateUserAction,
  deleteUserAction,
} = userSlice.actions;

export const userStore = configureStore({
  reducer: userSlice.reducer,
});
