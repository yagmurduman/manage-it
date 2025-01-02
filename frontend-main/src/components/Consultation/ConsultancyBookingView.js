import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import UserService from "../../services/UserService";
import { useSelector } from "react-redux";
import Alert from "@mui/material/Alert";

export default function ConsultancyBookingView() {
  const [bookings, setBookings] = React.useState("");
  const user = useSelector((state) => state.user);
  const project = useSelector((state) => state.project);

  const columns = [
    { field: "date", headerName: "Booking Date", width: 110 },
    { field: "time", headerName: "Booking Time", width: 110 },
    {
      field: "consultant_name",
      headerName: "Consultant's Name",
      width: 170,
    },
    {
      field: "specialized_area",
      headerName: "Consultant's Specialisation",
      width: 160,
    },
    {
      field: "consultant_email",
      headerName: "Consultant's E-Mail",
      width: 250,
    },
    {
      field: "hourly_rate",
      headerName: "Sesstion Price",
      width: 250,
    },
  ];

  useEffect(() => {
    UserService.getCurrentUser(user.user_id).then((user_data) => {
      let user_bookings = user_data.bookings;
      user_bookings = user_bookings.filter(
        (booking) => booking.project === project.selected_project
      );
      user_bookings.map((booking) => {
        booking.consultant_name = `${booking.consultant.user.first_name} ${booking.consultant.user.last_name}`;
        booking.consultant_email = booking.consultant.user.email;
        booking.specialized_area = booking.consultant.specialized_area;
        booking.hourly_rate =
          parseInt(booking.consultant.hourly_rate) / 100 + " €";
        booking.id = booking._id;
        return booking;
      });
      setBookings(user_bookings);
    });
  }, [project.selected_project]);

  console.log("bookings", bookings);

  return (
    <main className="">
      {bookings.length < 1 ? (
        <Alert severity="error">
          No consultation bookings have been made for this project by the
          currently logged in user!
        </Alert>
      ) : (
        ""
      )}
      <div className="flex items-center justify-center px-8 py-8">
        <Stack spacing={10} direction="row"></Stack>
      </div>
      <div className=""></div>
      <div className="flex justify-center px-3 py-3">
        <Typography variant="h6" gutterBottom component="div">
          Your Booking Information will be displayed here.
        </Typography>
      </div>
      <div className="mb-10 flex items-center justify-center px-8">
        <div style={{ height: 400, width: "66%" }}>
          <DataGrid
            rows={bookings}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            onCellClick={(e) => {}}
          />
        </div>
      </div>
    </main>
  );
}
