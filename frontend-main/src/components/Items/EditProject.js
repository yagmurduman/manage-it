import { ConstructionRounded } from "@mui/icons-material";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import ProjectService from "../../services/ProjectService";
import { useEffect } from "react";
import EmployeeService from "../../services/EmployeeService";
import Autocomplete from "@mui/material/Autocomplete";

export default function EditProject() {
  const [allEmployees, setAllEmployees] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [assigned_employees, setAssignedEmployees] = useState([]);
  const [project_managers, setProjectManagers] = useState([]);
  const [projectDataOri, setProjectDataOri] = useState({});

  const project = useSelector((state) => state.project);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const goToPage = (link) => {
    navigate(link);
  };

  const handleSave = async () => {
    await ProjectService.update_a_project(project.selected_project, {
      title,
      description,
      end_date,
      start_date,
      assigned_employees,
      project_managers,
    });
    alert("Project Information has been updated!");
    goToPage("/");
  };

  useEffect(() => {
    ProjectService.read_a_project(project.selected_project).then(
      (projectData) => {
        setTitle(projectData.title);
        setDescription(projectData.description);
        setStartDate(projectData.start_date);
        setEndDate(projectData.end_date);
        setAssignedEmployees(projectData.assigned_employees);
        setProjectManagers(projectData.project_managers);
        setProjectDataOri(projectData);
      }
    );
    EmployeeService.get_company_employees().then((data) => {
      setAllEmployees(data);
    });
  }, [project.selected_project]);

  console.log(allEmployees, assigned_employees);
  return (
    <>
      <main className="bg-blueGray-200">
        <div className="min-w-screen min-h-screen flex items-center justify-center px-5 py-5">
          <div className="container px-10 sx-auto">
            <div className="max-w-580-px mx-auto max-w-[50%]">
              <div className="text-center mb-8">
                <a className="inline-block mx-auto mb-6" href="/">
                  <img src="nigodo-assets/logo-icon-nigodo.svg" alt="" />
                </a>
                <h2 className="text-4xl font-bold mb-2 text-blueGray-700">
                  Edit Project
                </h2>
              </div>

              <div className="container justify-center items-center flex-col mx-auto px-4w-2/4">
                <div className="mb-6 w-full">
                  <TextField
                    fullWidth
                    placeholder="Give your backlog item a title"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                    helperText="Title"
                  />
                </div>
                <div className="mb-6 w-full">
                  <TextField
                    multiline
                    rows={3}
                    placeholder="Use this field to describe your backlog item"
                    fullWidth
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                    helperText="Description"
                  />
                </div>
                <div className="mb-6 w-full">
                  <TextField
                    id="start-date"
                    label="Project Start Date"
                    type="date"
                    sx={{ width: 250 }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={start_date}
                    onChange={(e) => {
                      setStartDate(e.target.value);
                    }}
                  />

                </div>
                <div className="mb-6 w-full">
                  <TextField
                    id="end-date"
                    label="Project End Date"
                    type="date"
                    sx={{ width: 250 }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={end_date}
                    onChange={(e) => {
                      setEndDate(e.target.value);
                    }}
                  />
                </div>

                <div className="mb-6 w-full">
                  <InputLabel className="mb-0">Assigned Employees</InputLabel>
                  <Autocomplete
                    multiple
                    options={allEmployees}
                    value={allEmployees.filter((employee) => {
                      return assigned_employees.some(
                        (assigned_employee) =>
                          assigned_employee._id === employee._id
                      );
                    })}
                    getOptionLabel={(employee) =>
                      `${employee.username}: ${employee.first_name} ${employee.last_name}`
                    }
                    onChange={(_, vals) => {
                      setAssignedEmployees(vals);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="standard"
                        label="Assign employees to this project"
                        placeholder="Employee Names"
                      />
                    )}
                  />
                </div>

                <div>
                  <InputLabel className="mb-0">
                    Assigned Project Manager
                  </InputLabel>
                  <Autocomplete
                    multiple
                    options={allEmployees}
                    value={allEmployees.filter((employee) => {
                      return project_managers.some(
                        (project_manager) =>
                          project_manager._id === employee._id
                      );
                    })}
                    getOptionLabel={(pm) =>
                      `${pm.username}: ${pm.first_name} ${pm.last_name}`
                    }
                    onChange={(_, vals) => {
                      setProjectManagers(vals);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="standard"
                        label="Assign project managers to this project"
                        placeholder="Project Manager Names"
                      />
                    )}
                  />
                </div>

                <Divider></Divider>
                <div className="flex flex-row mx-4 my-6 space-x-5 h-9 items-center justify-between">
                  <Link to="/">
                    <Button variant="outlined" color="error">
                      Cancel
                    </Button>
                  </Link>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleSave}
                    disabled={
                      title !== projectDataOri.title ||
                      description !== projectDataOri.description ||
                      start_date !== projectDataOri.start_date ||
                      end_date !== projectDataOri.end_date ||
                      assigned_employees !==
                        projectDataOri.assigned_employees ||
                      project_managers !== projectDataOri.project_managers
                        ? false
                        : true
                    }
                  >
                    Apply Changes
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
