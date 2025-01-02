import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import backlogService from "../../services/BacklogService";

const initialState = {
  backlogItems: [],
  message: "",
};

export const getBacklogItems = createAsyncThunk(
  "backlogItems/get",
  async (project_id) => {
    return await backlogService.retrieveProjectBacklogs(project_id);
  }
);

export const backlogSlice = createSlice({
  name: "backlog",
  initialState,
  extraReducers: {
    [getBacklogItems.pending]: (state) => {
      state.message = "pending";
    },
    [getBacklogItems.fulfilled]: (state, { payload }) => {
      state.backlogItems = payload;
      state.message = "fulfilled";
    },
    [getBacklogItems.rejected]: (state) => {
      state.message = "rejected";
    },
  },
});

export default backlogSlice.reducer;
