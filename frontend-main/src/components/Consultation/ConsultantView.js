import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ConsultationAvailableTimeSelector from "../Modals/ConsultationAvailableTimeSelector";
import ConsultantService from "../../services/ConsultantService";

export default function ConsultantView() {
  const [editAvailabilityInfo, setEditAvailabilityInfo] = useState(false);

  const [bookings, setBookings] = useState([]);
  const columns = [
    { field: "date", headerName: "Booking Date", width: 140 },
    { field: "time", headerName: "Booking Time", width: 140 },
    { field: "company", headerName: "Company Name", width: 195 },
    { field: "project", headerName: "Project Title", width: 140 },
    { field: "booked_by", headerName: "Booked By", width: 140 },
    { field: "booked_by_email", headerName: "Customer's E-Mail", width: 170 },
  ];

  const createTestAccount = (e) => {
    ConsultantService.create_temp_account(e.row.projectId).then((data) => {
      alert(
        `A temporary account has been created for you with the E-Mail ${data.tempPass}@manage-it.com and the password ${data.tempPass}. The account is only valid for one hour!`
      );
    });
  };

  useEffect(() => {
    ConsultantService.read_consultant_by_userId().then((data) => {
      let slots = data.availability.filter(
        (slot) => !slot.is_free && slot.user_id?.first_name
      );
      console.log("slots", slots);
      slots.map((slot) => {
        slot.id = slot._id;
        slot.project = slot.project_id.title;
        slot.projectId = slot.project_id._id;
        slot.company = slot.project_id.company.company_name;
        slot.booked_by = `${slot.user_id.first_name} ${slot.user_id.last_name}`;
        slot.booked_by_email = slot.user_id.email;
      });
      setBookings(slots);
    });
  }, []);

  return (
    <main className="">
      <div className="flex items-center justify-center px-8 py-8">
        <Stack spacing={10} direction="row">
          <Button
            variant="contained"
            onClick={() => {
              setEditAvailabilityInfo(true);
            }}
          >
            Edit Your Availability
          </Button>
        </Stack>
        {editAvailabilityInfo && (
          <ConsultationAvailableTimeSelector
            handleClose={setEditAvailabilityInfo}
          />
        )}
      </div>
      <div className=""></div>
      <div className="flex justify-center px-3 py-3">
        <Typography variant="h6" gutterBottom component="div">
          Find and manage your booking in the table below. Click on a booking to
          create a test employee account.
        </Typography>
      </div>
      <div className="mb-10 flex items-center justify-center px-8">
        <div style={{ height: 400, width: "66%" }}>
          <DataGrid
            rows={bookings}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            onCellClick={createTestAccount}
          />
        </div>
      </div>
    </main>
  );
}
