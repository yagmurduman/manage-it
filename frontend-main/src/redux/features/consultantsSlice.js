import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import consultantService from "../../services/ConsultantService";

const initialState = {
  consultants: [],
  message: "",
};

export const get_consultants = createAsyncThunk(
  "consultants/get_consultants",
  async () => {
    console.log("getConsultants Slice");
    return await consultantService.get_consultants();
  }
);

export const consultantSlice = createSlice({
  name: "consultants",
  initialState,
  extraReducers: {
    [get_consultants.pending]: (state) => {
      console.log('Pending')
      state.message = "pending";
    },
    [get_consultants.fulfilled]: (state, { payload }) => { 
      console.log('Fullfilled')
      console.log(payload)
      state.consultants = payload;
      state.message = payload.message;
    },
    [get_consultants.rejected]: (state) => {
      console.log('Rejected')
      state.message = "rejected";
    },
  }
});

export default consultantSlice.reducer;