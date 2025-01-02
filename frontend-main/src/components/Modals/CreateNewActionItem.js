import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Autocomplete from "@mui/material/Autocomplete";
import EmployeeService from "../../services/EmployeeService";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useSelector } from "react-redux";
import ActionItemService from "../../services/ActionItemService";

export default function CreateNewActionItemModal({
  handleClose,
  backlog_item_id,
  requeryBacklog,
  setRequeryBacklog,
}) {
  {
    /* assignee list items*/
  }
  const [checked, setChecked] = React.useState([1]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  {
    /* date picker information*/
  }
  const [value, setValue] = React.useState(null);
  const [allEmployees, setAllEmployees] = React.useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [comments, setComments] = React.useState("");
  const [status, setStatus] = React.useState("Not Started");
  const [due_date, setDueDate] = useState("");
  const [start_date, setStartDate] = useState("");
  const [assigned_employees, setAssignedEmployees] = React.useState([]);

  const project = useSelector((state) => state.project);
  const backlog = useSelector((state) => state.backlog);
  const user = useSelector((state) => state.user);

  const handleSave = async () => {
    if (!title) {
      alert("Please enter a title for your action item!");
      return;
    }
    await ActionItemService.createProjectActionItem({
      title,
      description,
      priority,
      comments,
      status,
      due_date,
      start_date,
      assignees: assigned_employees.map((employee) => employee._id),
      project: project.selected_project,
      backlog_item: backlog_item_id,
    });
    alert("A new action item has been created!");
    setRequeryBacklog(requeryBacklog + 1);
    handleClose(false);
  };

  const priorities = [
    {
      value: "1",
      label: "High",
    },
    {
      value: "2",
      label: "Medium",
    },
    {
      value: "3",
      label: "Low",
    },
  ];

  const statusList = [
    {
      value: "Not Started",
    },
    {
      value: "In Progress",
    },
    {
      value: "Completed",
    },
    {
      value: "Deferred",
    },
  ];

  //should be get project employees
  useEffect(() => {
    EmployeeService.get_company_employees().then((data) => {
      setAllEmployees(data);
    });
  }, []);

  return (
    <div>
      <Dialog
        open
        onClose={() => {
          handleClose(false);
        }}
      >
        <DialogTitle>Create Action Item</DialogTitle>
        <DialogContent className="space-y-3">
          <DialogContentText>
            Please fill the following fields to create a new action item.
          </DialogContentText>
          <TextField
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
            label="Title"
            fullWidth
            placeholder="Give your backlog item a title"
          />
          <TextField
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
            multiline
            rows={3}
            label="Description"
            placeholder="Use this field to describe your backlog item"
            fullWidth
          />
          <TextField
            select
            label="Select Priority"
            value={priority}
            onChange={(event) => {
              setPriority(event.target.value);
            }}
            helperText="Please select the item priority"
          >
            {priorities.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            multiline
            rows={3}
            label="Comments"
            placeholder="Use this field to add additional info"
            fullWidth
            value={comments}
            onChange={(event) => {
              setComments(event.target.value);
            }}
          />

          <TextField
            select
            label="Select Status"
            value={status}
            onChange={(event) => {
              setStatus(event.target.value);
            }}
            helperText="Please select the item status"
          >
            {statusList.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>

          <div className="flex">
            <div className="mb-6 w-full">
              <TextField
                id="due-date"
                label="Action Item due Date"
                type="date"
                sx={{ width: 250 }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={due_date}
                onChange={(event) => {
                  setDueDate(event.target.value);
                }}
              />
            </div>
          </div>
          <div className="flex">
            <div className="mb-6 w-full">
              <TextField
                id="start-date"
                label="Action Item start Date"
                type="date"
                sx={{ width: 250 }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={start_date}
                onChange={(event) => {
                  setStartDate(event.target.value);
                }}
              />
            </div>
          </div>
          <div className="mb-6 w-full">
            <InputLabel className="mb-0">Assigned Employees</InputLabel>
            <Autocomplete
              multiple
              options={allEmployees}
              value={allEmployees.filter((employee) => {
                return assigned_employees.some(
                  (assigned_employee) => assigned_employee._id === employee._id
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
          <TextField
            label="Created By"
            disabled
            fullWidth
            placeholder="Please enter the name of the owner"
            value={user.first_name}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose(false);
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleSave}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
