import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import projectService from "../../services/ProjectService";

const initialState = {
  projects: [],
  selected_project: "",
  project_data: "",
  is_PM: false,
  message: "",
};

export const get_projects = createAsyncThunk(
  "projects/get_projects",
  async () => {
    return await projectService.get_projects();
  }
);

//read project edits
export const read_a_project = createAsyncThunk(
  "projects/read_a_project",
  async (project_id) => {
    return await projectService.read_a_project(project_id);
  }
);

export const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    select_project: (state, action) => {
      console.log(action.payload);
      state.selected_project = action.payload.selected_project;
      state.is_PM = !state.is_PM;
    },
  },
  extraReducers: {
    [get_projects.pending]: (state) => {
      state.message = "pending";
    },
    [get_projects.fulfilled]: (state, { payload }) => {
      state.projects = payload;
      state.message = "fulfilled";
    },
    [get_projects.rejected]: (state) => {
      state.message = "rejected";
    },

    [read_a_project.pending]: (state) => {
      state.message = "pending";
    },
    [read_a_project.fulfilled]: (state, { payload }) => {
      state.project_data = payload;
      state.message = "fulfilled";
    },
    [read_a_project.rejected]: (state) => {
      state.message = "rejected";
    },
  },
});

export const { select_project } = projectSlice.actions;

export default projectSlice.reducer;
