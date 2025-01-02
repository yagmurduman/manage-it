import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch } from "react-redux";
import { create_registeration_link } from "../../redux/features/userSlice";

export default function AddEmployeeViewDisplay({ handleClose }) {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const handleSave = () => {
    dispatch(create_registeration_link({ first_name, last_name, email }));
    alert(
      "An E-Mail with the registeration link has been sent to the newly created employee."
    );
    handleClose(false);
  };

  return (
    <div>
      <Dialog
        open
        onClose={() => {
          handleClose(false);
        }}
      >
        <DialogTitle>Add an Employee</DialogTitle>
        <DialogContent className="space-y-3">
          <DialogContentText>
            After submitting this form, the employee will receive an E-Mail with
            an invitation to signup on Manage-IT.
          </DialogContentText>
          <TextField
            label="First Name"
            variant="filled"
            fullWidth
            placeholder="Jane"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
          <TextField
            label="Last Name"
            variant="filled"
            fullWidth
            placeholder="Doe"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
          <TextField
            label="Email"
            variant="filled"
            fullWidth
            placeholder="janedoe@gmail.com"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
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
          <Button onClick={handleSave}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
