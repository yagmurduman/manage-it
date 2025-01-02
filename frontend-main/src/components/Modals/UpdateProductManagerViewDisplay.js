import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";


export default function UpdateProductManagerViewDisplay({ handleClose }) {


  const handleSave = () => {
    alert("Employee Added!");
  };



  return (
    <div>
      <Dialog
        open
        onClose={() => {
          handleClose(false);
        }}
      >
        <DialogTitle>Edit product manager information</DialogTitle>
        <DialogContent className="space-y-3">
          <DialogContentText>
            Click on the field you want to edit and make your changes
          </DialogContentText>
          <TextField
            label="First Name"
            variant="filled"
            fullWidth
            placeholder="Jane"
          />
          <TextField
            label="Last Name"
            variant="filled"
            fullWidth
            placeholder="Doe"
          />
          <TextField
            label="Username"
            variant="filled"
            fullWidth
            placeholder="janedoe"
          />
            <TextField
            label="Email"
            variant="filled"
            fullWidth
            placeholder="janedoe@gmail.com"
          />
          <TextField
            label="Password"
            variant="filled"
            fullWidth
            placeholder="*******"
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
          <Button onClick={handleSave}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
