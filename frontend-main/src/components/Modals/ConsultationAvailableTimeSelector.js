import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ConsultantService from "../../services/ConsultantService";

export default function ConsultationAvailableTimeSelector({ handleClose }) {
  {
    /* date picker information*/
  }

  const [tempSlots, setTempSlots] = useState([]);
  const [oriSlots, setOriSlots] = useState([]);
  const [date, setDate] = useState("");

  const handleChange = (_, value) => {
    setTempSlots(value);
  };

  const availability = [
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
  console.log("tempSlots", tempSlots);
  console.log("date", date);

  const handleSave = async () => {
    const slotsArr = [];
    tempSlots.forEach((slot) => {
      slotsArr.push({ date, time: slot, is_free: true });
    });
    oriSlots.forEach((slot) => {
      if (!tempSlots.includes(slot)) {
        slotsArr.push({ date, time: slot, is_free: false });
      }
    });
    await ConsultantService.update_consultant_availability({
      availability: slotsArr,
    });
    alert("Form submitted");
  };

  useEffect(() => {
    setTempSlots([]);
    setOriSlots([]);
    ConsultantService.read_consultant_by_userId().then((consultant) => {
      consultant.availability
        .filter((slot) => slot.is_free && slot.date === date)
        .forEach((slot) => {
          setTempSlots((tempSlots) => [...tempSlots, slot.time]);
          setOriSlots((tempSlots) => [...tempSlots, slot.time]);
        });
    });
  }, [date]);
  return (
    <div>
      <Dialog
        open
        onClose={() => {
          handleClose(false);
        }}
      >
        <DialogTitle style={{ display: "flex", justifyContent: "center" }}>
          Update Your Availability Slots
        </DialogTitle>
        <DialogContent className="space-y-3">
          <DialogContentText
            style={{ display: "flex", justifyContent: "center" }}
          >
            Please select the date and time slots, at which you are available!
          </DialogContentText>
          <div
            className="flex"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <TextField
              id="start-date"
              label="Available Time"
              type="date"
              sx={{ width: 250 }}
              InputLabelProps={{
                shrink: true,
              }}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <DialogContentText
            style={{ display: "flex", justifyContent: "center", mt: 2 }}
          >
            Slots are set by default to&nbsp;<b>one</b>&nbsp;hour
          </DialogContentText>
          <div
            className="flex"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Stack spacing={3} direction="row">
              <ToggleButtonGroup
                value={tempSlots}
                onChange={handleChange}
                aria-label="text formatting"
              >
                {availability.slice(0, 3).map((slot) => (
                  <ToggleButton value={slot} key={slot} aria-label="bold">
                    {slot}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Stack>
          </div>
          <div
            className="flex"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Stack spacing={3} direction="row">
              <ToggleButtonGroup
                value={tempSlots}
                onChange={handleChange}
                aria-label="text formatting"
              >
                {availability.slice(3, 6).map((slot) => (
                  <ToggleButton key={slot} value={slot} aria-label="bold">
                    {slot}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Stack>
          </div>
          <div
            className="flex"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Stack spacing={3} direction="row">
              <ToggleButtonGroup
                value={tempSlots}
                onChange={handleChange}
                aria-label="text formatting"
              >
                {availability.slice(6, 9).map((slot) => (
                  <ToggleButton key={slot} value={slot} aria-label="bold">
                    {slot}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Stack>
          </div>
        </DialogContent>
        <DialogActions>
          <div className="flex">
            <Button
              onClick={() => {
                handleClose(false);
              }}
            >
              Cancel
            </Button>
          </div>
          <div className="flex">
            <Button onClick={handleSave}>Submit</Button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}
