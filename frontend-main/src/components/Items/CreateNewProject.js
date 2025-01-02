import { ConstructionRounded } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import ProjectService from "../../services/ProjectService";
import EmployeeService from "../../services/EmployeeService";
import Autocomplete from "@mui/material/Autocomplete";
import { useNavigate } from "react-router-dom";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const Input = styled("input")({
  display: "none",
});

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function CreateNewProject() {
  const [names, setNames] = React.useState([]);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [start_date, setStartDate] = React.useState("");
  const [end_date, setEndData] = React.useState("");
  const [assigned_employees, setAssignedEmployees] = React.useState([]);
  const [project_managers, setProjectManagers] = React.useState([]);

  const navigate = useNavigate();
  const goToPage = (link) => {
    navigate(link);
  };

  useEffect(() => {
    EmployeeService.get_company_employees().then((data) => {
      setNames(data);
    });
  }, []);

  return (
    <>
      <main className="bg-blueGray-200">
        <div className="min-w-screen min-h-screen flex items-center justify-center px-5 py-5">
          <div className="container px-10 sx-auto">
            <div className="max-w-580-px mx-auto max-w-[50%]">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold mb-2 text-blueGray-700">
                  Create New Project
                </h2>
              </div>
              <div className="container justify-center items-center flex-col mx-auto px-4w-2/4">
                <div className="mb-6 w-full">
                  <TextField
                    label="Title"
                    fullWidth
                    placeholder="Give your project a title"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="mb-6 w-full">
                  <TextField
                    multiline
                    rows={3}
                    label="Description"
                    placeholder="Use this field to describe your project"
                    fullWidth
                    onChange={(e) => setDescription(e.target.value)}
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
                    onChange={(e) => setStartDate(e.target.value)}
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
                    onChange={(e) => setEndData(e.target.value)}
                  />
                </div>
                <div className="w-full">
                  <InputLabel className="mb-0">Assigned Employees</InputLabel>
                  <Autocomplete
                    multiple
                    options={names}
                    onChange={(_, vals) => {
                      setAssignedEmployees(vals.map((val) => val._id));
                    }}
                    getOptionLabel={(employee) =>
                      `${employee.username}: ${employee.first_name} ${employee.last_name}`
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="standard"
                        label="Assign employees to this new project"
                        placeholder="Employee Names"
                      />
                    )}
                  />
                </div>
                <div className="mt-6 mb-6 w-full">
                  <InputLabel className="mb-0">Project Managers</InputLabel>
                  <Autocomplete
                    multiple
                    options={names}
                    onChange={(_, vals) => {
                      setProjectManagers(vals.map((val) => val._id));
                    }}
                    getOptionLabel={(employee) =>
                      `${employee.username}: ${employee.first_name} ${employee.last_name}`
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="standard"
                        label="Assign employees to this new project"
                        placeholder="Employee Names"
                      />
                    )}
                  />
                </div>
                <Divider></Divider>
                <div className="flex flex-wrap -mx-4 mb-6 items-center justify-between"></div>
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={async () => {
                      if (!title) {
                        alert("Pleasea enter a title for your project");
                        return;
                      }
                      let project = await ProjectService.create_a_project({
                        title,
                        description,
                        start_date,
                        end_date,
                        assigned_employees,
                        project_managers,
                      });
                      goToPage(`/pay/${project.project_id}`);
                    }}
                  >
                    Submit
                  </Button>
                  <Link to="/">
                    <Button variant="outlined" color="secondary">
                      Cancel
                    </Button>
                  </Link>
                </Stack>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
