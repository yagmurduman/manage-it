import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import BacklogService from "../../services/BacklogService";

export default function EditBacklogItemModal({
  handleClose,
  backlogItem,
  requeryBacklog,
  setRequeryBacklog,
}) {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [due_date, setDueDate] = useState("");
  const [titleOri, setTitleOri] = useState("");
  const [descriptionOri, setDescriptionOri] = useState("");
  const [priorityOri, setPriorityOri] = useState("");
  const [due_dateOri, setDueDateOri] = useState("");
  const [disableUpdate, setDisableUpdate] = useState(true);

  useEffect(() => {
    setId(backlogItem._id);
    setTitle(backlogItem.title);
    setDescription(backlogItem.description);
    setPriority(backlogItem.priority);
    setDueDate(backlogItem.due_date);
    setTitleOri(backlogItem.title);
    setDescriptionOri(backlogItem.description);
    setPriorityOri(backlogItem.priority);
    setDueDateOri(backlogItem.due_date);
  }, []);

  useEffect(() => {
    if (
      title !== titleOri ||
      description !== descriptionOri ||
      priority !== priorityOri ||
      due_date !== due_dateOri
    )
      setDisableUpdate(false);
    else {
      setDisableUpdate(true);
    }
  }, [title, description, priority, due_date]);

  const handleSave = async () => {
    await BacklogService.updateBacklogItem(backlogItem._id, {
      title,
      description,
      priority,
      due_date,
    });
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
  return (
    <div>
      <Dialog
        open
        onClose={() => {
          handleClose(false);
        }}
      >
        <DialogTitle>Edit Backlog Item</DialogTitle>
        <DialogContent className="space-y-3">
          <DialogContentText>
            Please fill the following fields to update a the backlog item.
          </DialogContentText>
          <TextField
            fullWidth
            placeholder="Give your backlog item a title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            helperText="Title"
          />
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
          <TextField
            select
            label="Select Priority"
            className="w-36"
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
          <div className="flex">
            <TextField
              label="Due Date"
              type="date"
              sx={{ width: 250 }}
              InputLabelProps={{
                shrink: true,
              }}
              value={due_date}
              onChange={(e) => setDueDate(e.target.value)}
            />
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
          <Button onClick={handleSave} disabled={disableUpdate ? true : false}>
            Apply Changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
