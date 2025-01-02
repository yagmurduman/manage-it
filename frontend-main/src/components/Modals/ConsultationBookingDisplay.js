import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import PaymentService from "../../services/PaymentService";

export default function ConsultationBookingDisplay({
  handleClose,
  availability,
  consultant_id,
}) {
  const [selectedTime, setSelectedTime] = React.useState("");
  const [selectedDate, setSelectedDate] = React.useState("");

  const times = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
  ];

  const project = useSelector((state) => state.project);

  const handlePayment = async () => {
    console.log("innn");
    let link = await PaymentService.book_consultant({
      consultant_id,
      project_id: project.selected_project,
      date: selectedDate,
      time: selectedTime,
    });
    window.location.href = link.url;
  };

  const isDisabled = (time) => {
    console.log(time);
    let is_available = availability.filter(
      (item) => item.date === selectedDate && item.time === time
    )[0]?.is_free;
    if (is_available) return false;
    return true;
  };

  return (
    <div>
      <Dialog
        open
        onClose={() => {
          handleClose(false);
        }}
      >
        <DialogTitle style={{ display: "flex", justifyContent: "center" }}>
          Pick the Date and Time for Your Booking
        </DialogTitle>
        <DialogContent className="space-y-3">
          <DialogContentText
            style={{ display: "flex", justifyContent: "center" }}
          >
            Check below for the consultant's availability.
          </DialogContentText>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <TextField
              id="start-date"
              label="Booking Date"
              type="date"
              sx={{ width: 250 }}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => {
                setSelectedDate(e.target.value);
              }}
              error={selectedDate === ""}
              helperText={selectedDate === "" ? "Please select a date" : ""}
            />
          </div>
          <DialogContentText
            style={{ display: "flex", justifyContent: "center", mt: 2 }}
          >
            Choose the starting time for your appointment.
          </DialogContentText>
          <DialogContentText
            style={{ display: "flex", justifyContent: "center", mt: 1, mb: 2 }}
          >
            Appointments are booked for&nbsp;<b>one hour</b>.
          </DialogContentText>
          <div className="grid grid-cols-3 gap-3">
            {times.map((time) => {
              return (
                <Button
                  disabled={isDisabled(time)}
                  variant={
                    selectedTime === time && !isDisabled(selectedTime)
                      ? "contained"
                      : "outlined"
                  }
                  key={time}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </Button>
              );
            })}
          </div>
        </DialogContent>
        <DialogActions>
          <div class="flex">
            <Button
              onClick={() => {
                handleClose(false);
              }}
            >
              Cancel
            </Button>
          </div>
          <div class="flex">
            <Button
              disabled={
                !selectedDate || !selectedTime || isDisabled(selectedTime)
              }
              onClick={handlePayment}
            >
              Book now
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}
