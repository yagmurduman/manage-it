import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import UserService from "../../services/UserService";

const initialState = {
  user_id: "",
  first_name: "",
  username: "",
  email: "",
  company_id: "",
  company_name: "",
  rights: "",
  status: "",
};

export const login = createAsyncThunk("users/login", async (payload) => {
  return await UserService.login(payload.email, payload.password);
});

export const create_registeration_link = createAsyncThunk(
  "users/create_registeration_link",
  async (payload) => {
    return await UserService.create_registeration_link(payload);
  }
);

export const create_user_from_registeration_link = createAsyncThunk(
  "users/create_user_from_registeration_link",
  async (payload) => {
    return await UserService.create_user_from_registeration_link(payload);
  }
);

export const forgot = createAsyncThunk("users/forgot", async (payload) => {
  return await UserService.forgot(payload.email);
});

export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async (payload) => {
    return await UserService.resetPassword(
      payload.email,
      payload.password,
      payload.salt
    );
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      console.log("Logout called");
      UserService.logout();
      Object.keys(state).forEach((i) => (state[i] = ""));
      state = {};
      state.status = "logged out";
    },
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.status = "pending";
    },
    [login.fulfilled]: (state, { payload }) => {
      console.log("payload of fulfilled login", payload);
      state.user_id = payload.user.user_id;
      state.first_name = payload.user.first_name;
      state.username = payload.user.username;
      state.email = payload.user.email;
      state.company_id = payload.user.company_id;
      state.company_name = payload.user.company_name;
      state.rights = payload.user.rights;
      state.status = payload.message;
    },
    [login.rejected]: (state) => {
      state.status = "rejected";
    },
    [forgot.pending]: (state) => {
      state.status = "pending";
    },
    [forgot.fulfilled]: (state, { payload }) => {
      state.status = payload.message;
    },
    [forgot.rejected]: (state) => {
      state.status = "rejected";
    },
    [resetPassword.pending]: (state) => {
      state.status = "pending";
    },
    [resetPassword.fulfilled]: (state, { payload }) => {
      state.status = payload.message;
    },
    [resetPassword.rejected]: (state) => {
      state.status = "rejected";
    },
  },
});

// Action creators are generated for each case reducer function
export const { logout } = userSlice.actions;

export default userSlice.reducer;
