import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import InputLabel from "@mui/material/InputLabel";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import Autocomplete from "@mui/material/Autocomplete";
import { useSelector } from "react-redux";
import ActionItemService from "../../services/ActionItemService";
import EmployeeService from "../../services/EmployeeService";

export default function ActionItemViewDisplay({
  handleClose,
  actionItem,
  requeryActionItems,
  setRequeryActionItems,
}) {
  const [allEmployees, setAllEmployees] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const [comments, setComments] = useState("");
  const [due_date, setDueDate] = useState("");
  const [start_date, setStartDate] = useState("");
  const [assigned_employees, setAssignedEmployees] = useState([]);
  const [created_by, setCreatedBy] = useState("");

  const [titleOri, setTitleOri] = useState("");
  const [descriptionOri, setDescriptionOri] = useState("");
  const [priorityOri, setPriorityOri] = useState("");
  const [statusOri, setStatusOri] = useState("");
  const [commentsOri, setCommentsOri] = useState("");
  const [due_dateOri, setDueDateOri] = useState("");
  const [start_dateOri, setStartDateOri] = useState("");
  const [assigned_employeesOri, setAssignedEmployeesOri] = useState([]);
  const [created_byOri, setCreatedByOri] = useState("");
  const [disableUpdate, setDisableUpdate] = useState(true);

  console.log("what is this", actionItem);
  useEffect(() => {
    //setId(actionItem._id);
    setTitle(actionItem.title);
    setDescription(actionItem.description);
    setPriority(actionItem.priority);
    setStatus(actionItem.status);
    setComments(actionItem.comments);
    setDueDate(actionItem.due_date);
    setStartDate(actionItem.start_date);
    setAssignedEmployees(actionItem.assignees);
    setCreatedBy(user.user_id);

    setTitleOri(actionItem.title);
    setDescriptionOri(actionItem.description);
    setPriorityOri(actionItem.priority);
    setStatusOri(actionItem.status);
    setCommentsOri(actionItem.comments);
    setDueDateOri(actionItem.due_date);
    setStartDateOri(actionItem.start_date);
    setAssignedEmployeesOri(actionItem.assignees);
    setCreatedByOri(user.user_id);
  }, []);

  useEffect(() => {
    if (
      title !== titleOri ||
      description !== descriptionOri ||
      priority !== priorityOri ||
      status !== statusOri ||
      comments !== commentsOri ||
      due_date !== due_dateOri ||
      start_date !== start_dateOri ||
      assigned_employees !== assigned_employeesOri
    )
      setDisableUpdate(false);
    else {
      setDisableUpdate(true);
    }
  }, [
    title,
    description,
    priority,
    status,
    comments,
    due_date,
    start_date,
    assigned_employees,
    created_by,
  ]);

  useEffect(() => {
    EmployeeService.get_company_employees().then((data) => {
      setAllEmployees(data);
    });
  }, []);

  console.log("assigned_employees", assigned_employees);
  const handleSave = () => {
    ActionItemService.updateActionItem(actionItem._id, {
      title,
      description,
      priority,
      status,
      comments,
      due_date,
      start_date,
      assignees: assigned_employees.map((employee) => employee._id),
      created_by,
    }).then((_) => {
      setRequeryActionItems(requeryActionItems + 1);
      handleClose(false);
    });
  };

  const handleDelete = async () => {
    let confirmation = window.confirm(
      "Are you sure you want to delete this action item?"
    );
    if (confirmation) {
      await ActionItemService.deleteActionItem(actionItem._id);
      handleClose(false);
      setRequeryActionItems(requeryActionItems + 1);
    }
  };

  const user = useSelector((state) => state.user);

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
      value: "Completed",
    },
    {
      value: "In Progress",
    },
    {
      value: "Deferred",
    },
  ];

  return (
    <div>
      <Dialog
        open
        onClose={() => {
          handleClose(false);
        }}
      >
        <DialogTitle>Action Item</DialogTitle>
        <DialogContent className="space-y-3">
          <DialogContentText>
            To edit this action item enter the necessary information and click
            on update!
          </DialogContentText>
          <TextField
            label="Title"
            fullWidth
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            placeholder="Give your backlog item a title"
          />
          <TextField
            multiline
            rows={3}
            label="Description"
            placeholder="Use this field to describe your backlog item"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            fullWidth
          />
          <TextField
            select
            label="Select Priority"
            helperText="Please select the item priority"
            value={priority}
            onChange={(e) => {
              setPriority(e.target.value);
            }}
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
            value={comments}
            onChange={(e) => {
              setComments(e.target.value);
            }}
            placeholder="Use this field to add additional info"
            fullWidth
          />

          <TextField
            select
            label="Select Status"
            helperText="Please select the item status"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
            }}
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
                value={due_date}
                onChange={(e) => setDueDate(e.target.value)}
                sx={{ width: 250 }}
                InputLabelProps={{
                  shrink: true,
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
                value={start_date}
                onChange={(e) => {
                  setStartDate(e.target.value);
                }}
                sx={{ width: 250 }}
                InputLabelProps={{
                  shrink: true,
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
          <Button onClick={handleSave} disabled={disableUpdate ? true : false}>
            Update
          </Button>

          <Button color="error" onClick={handleDelete}>
            Delete Action Item
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
