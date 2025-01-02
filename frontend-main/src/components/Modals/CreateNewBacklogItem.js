import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import BacklogService from "../../services/BacklogService";
import { useSelector } from "react-redux";

export default function CreateNewBacklogItemModal({
  handleClose,
  requeryBacklog,
  setRequeryBacklog,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [due_date, setDueDate] = useState("");
  const project = useSelector((state) => state.project);

  const handleSave = async () => {
    if (!title) {
      alert("Please enter a title for your backlog item!");
      return;
    }
    await BacklogService.createProjectBacklog({
      title,
      description,
      priority,
      due_date,
      project_id: project.selected_project,
    });
    setRequeryBacklog(requeryBacklog + 1);
    alert("A new backlog item has been created!");
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
  return (
    //remember!!!

    <div>
      <Dialog
        open
        onClose={() => {
          handleClose(false);
        }}
      >
        <DialogTitle>Create Backlog Item</DialogTitle>
        <DialogContent className="space-y-3">
          <DialogContentText>
            Please fill the following fields to create a new backlog item.
          </DialogContentText>
          <TextField
            label="Title"
            variant="filled"
            fullWidth
            placeholder="Give your backlog item a title"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
          <TextField
            multiline
            rows={3}
            label="Description"
            placeholder="Use this field to describe your backlog item"
            fullWidth
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />
          <TextField
            className="w-40"
            select
            label="Select Priority"
            value={priority}
            onChange={(event) => {
              setPriority(event.target.value);
            }}
          >
            {priorities.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <div>
            <div className="mb-6 w-full">
              <TextField
                id="start-date"
                label="Backlog due Date"
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
