import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";


export default function AddProductViewDisplay({ handleClose }) {

  {/* assignee list items*/ }
  const [checked, setChecked] = React.useState([1]);


  const handleSave = () => {
    alert("Product Manager Added!");
  };



  return (
    <div>
      <Dialog
        open
        onClose={() => {
          handleClose(false);
        }}
      >
        <DialogTitle>Enter the product manager information</DialogTitle>
        <DialogContent className="space-y-3">
          <DialogContentText>
            After the submission of the form the product manager will be able to login to the system with respected username and password.
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
          <Button onClick={handleSave}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}