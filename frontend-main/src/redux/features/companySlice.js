import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CompanyService from "../../services/CompanyService";

const initialState = {
  companyName: "",
  message: "Initial message",
};

export const addCompany = createAsyncThunk(
  "companies/addCompany",
  async (payload) => {
    return await CompanyService.addCompany(
      payload.companyName,
      payload.companyEmailAddress,
      payload.streetName,
      payload.houseNumber,
      payload.postcode,
      payload.city,
      payload.country
    );
  }
);

export const verifyCompany = createAsyncThunk(
  "company/verifyCompany",
  async (payload) => {
    return await CompanyService.verifyCompany(payload.email);
  }
);

export const createCompanyAndUser = createAsyncThunk(
  "company/createCompanyAndUser",
  async (payload) => {
    return await CompanyService.createCompanyAndUser(payload);
  }
);

export const companySlice = createSlice({
  name: "company",
  initialState,
  extraReducers: {
    [addCompany.pending]: (state) => {
      state.message = "pending";
    },
    [addCompany.fulfilled]: (state, { payload }) => {
      state.companyName = "Company added";
      state.message = payload.message;
    },
    [addCompany.rejected]: (state) => {
      state.message = "rejected";
    },
    [verifyCompany.pending]: (state) => {
      state.message = "pending";
    },

    [verifyCompany.fulfilled]: (state, { payload }) => {
      state.companyName = "Company added";
      state.message = payload.message;
    },
    [verifyCompany.rejected]: (state) => {
      state.message = "rejected";
    },
  },
});

export default companySlice.reducer;
