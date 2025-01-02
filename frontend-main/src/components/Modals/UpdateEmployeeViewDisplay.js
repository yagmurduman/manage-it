import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch } from "react-redux";
import { forgot } from "../../redux/features/userSlice";
import EmployeeService from "../../services/EmployeeService";

export default function UpdateEmployeeViewDisplay({
  handleClose,
  employeeData,
  requeryEmployees,
  setRequeryEmployees,
}) {
  const [id, setId] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstNameOri, setFirstNameOri] = useState("");
  const [lastNameOri, setLastNameOri] = useState("");
  const [usernameOri, setUsernameOri] = useState("");
  const [emailOri, setEmailOri] = useState("");
  const [disableUpdate, setDisableUpdate] = useState(true);

  let dispatch = useDispatch();

  useEffect(() => {
    setId(employeeData._id);
    setFirstName(employeeData.first_name);
    setLastName(employeeData.last_name);
    setUsername(employeeData.username);
    setEmail(employeeData.email);
    setFirstNameOri(employeeData.first_name);
    setLastNameOri(employeeData.last_name);
    setUsernameOri(employeeData.username);
    setEmailOri(employeeData.email);
  }, []);

  useEffect(() => {
    if (
      first_name !== firstNameOri ||
      last_name !== lastNameOri ||
      username !== usernameOri ||
      email !== emailOri
    )
      setDisableUpdate(false);
    else {
      setDisableUpdate(true);
    }
  }, [first_name, last_name, username, email]);

  const handleSave = async () => {
    await EmployeeService.update_a_user(id, {
      first_name,
      last_name,
      email,
      username,
    });
    alert("Employee Information has been updated!");
    handleClose(false);
    setRequeryEmployees(requeryEmployees + 1);
  };

  const handlePasswordReset = () => {
    dispatch(forgot({ email }));
    alert("The employee will receive a password reset E-Mail");
    handleClose(false);
  };

  const handleDelete = async () => {
    let confirmation = window.confirm(
      "Are you sure you want to delete this employee?"
    );
    if (confirmation) {
      await EmployeeService.delete_a_user(id);
      handleClose(false);
      setRequeryEmployees(requeryEmployees + 1);
    }
  };
  return (
    <div>
      <Dialog
        open
        onClose={() => {
          handleClose(false);
        }}
      >
        <DialogTitle>Edit employee's information</DialogTitle>
        <DialogContent className="space-y-3">
          <DialogContentText className="mb-1">
            Use this form to edit your employee's information
          </DialogContentText>
          <TextField
            fullWidth
            placeholder="Jane"
            helperText="First Name"
            value={first_name}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
          <TextField
            variant="filled"
            fullWidth
            placeholder="Doe"
            helperText="Last Name"
            value={last_name}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
          <TextField
            variant="filled"
            fullWidth
            helperText="Username"
            placeholder="JaneDoe"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <TextField
            fullWidth
            helperText="E-Mail"
            placeholder="jane@doe.com"
            value={email}
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
          <Button onClick={handlePasswordReset}>Reset Password</Button>
          <Button
            color="error"
            onClick={handleDelete}
            disabled={employeeData.rights === "Administrator" ? true : false}
          >
            Delete User
          </Button>
          <Button disabled={disableUpdate} onClick={handleSave}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
