import { createSlice } from "@reduxjs/toolkit";

const isLogin = () => {
  let login = localStorage.getItem("ACCESS_TOKEN");
  if (login === null) {
    return false;
  } else {
    return true;
  }
};

const initialState = {
  isLogin: isLogin(),
  token: localStorage.getItem("ACCESS_TOKEN"),
  userInfo: localStorage.getItem("USER_DATA") != null ? JSON.parse(localStorage.getItem("USER_DATA")) : {},
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setLoginInfo(state, action) {
      const info = action.payload;
      localStorage.setItem("USER_DATA", JSON.stringify(info.userInfo));
      localStorage.setItem("ACCESS_TOKEN", info.token);
      state.userInfo = info.userInfo;
      state.token = info.token;
      state.isLogin = true;
    },

    logout(state) {
      localStorage.removeItem("ACCESS_TOKEN");
      localStorage.removeItem("USER_DATA");
      state.token = null;
      state.userInfo = [];
      state.isLogin = false;
    },
  },
});

export const userAction = userSlice.actions;
export default userSlice.reducer;
