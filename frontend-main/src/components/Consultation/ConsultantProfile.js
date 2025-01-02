import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import ConsultationBookingDisplay from "../Modals/ConsultationBookingDisplay";
import AddReview from "../Modals/AddReview";
import Review from "./Review";
import { Button, CardActionArea, CardActions } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import StarRateIcon from "@mui/icons-material/StarRate";
import SavingsIcon from "@mui/icons-material/Savings";
import Alert from "@mui/material/Alert";
import Tooltip from "@mui/material/Tooltip";
import UserService from "../../services/UserService";
import { useSelector } from "react-redux";
import ConsultantService from "../../services/ConsultantService";

{
  /* Page for viewing the consultants with booking option*/
}

export default function ConsultantProfile({ consultant }) {
  {
    /*  for consultation booking*/
  }
  const user = useSelector((state) => state.user);
  const [reviews, setReviews] = useState(consultant.reviews);
  const [openConsultationDisplay, setConsultationDisplay] = useState(false);
  const [openAddReviewModal, setOpenAddReviewModal] = useState(false);

  const [consultationSessions, setConsultationSessions] = useState([]);
  const [requeryProfile, setRequeryProfile] = useState(0);

  const stringifyConsultationSessions = (consultationSessions) => {
    var sessions_data = "";
    consultationSessions.forEach((session) => {
      sessions_data.length
        ? (sessions_data += " and on ")
        : (sessions_data += "");
      sessions_data += `${session.date} at ${session.time}`;
    });
    return sessions_data;
  };
  useEffect(() => {
    UserService.getCurrentUser(user.user_id).then((user_data) => {
      let my_bookings = user_data.bookings.filter(
        (booking) => booking.consultant._id === consultant._id
      );
      setConsultationSessions(my_bookings);
    });
  }, []);

  useEffect(() => {
    ConsultantService.read_consultant(consultant._id).then((consultantData) => {
      console.log(64);
      setReviews(consultantData.reviews);
      console.log(reviews);
    });
  }, [requeryProfile]);

  return (
    <>
      {consultationSessions.length ? (
        <Alert severity="info">
          {`You have booked consultation with this consultant on ${stringifyConsultationSessions(
            consultationSessions
          )}`}
        </Alert>
      ) : (
        ""
      )}
      <main className="mt-24 mb-24">
        <div className="grid grid-cols-2">
          {/* Card view for general information of the consultant*/}
          <Card className="w-4/6 h-[40rem] ml-32 px-4 py-4 overflow-y-auto">
            <CardMedia
              component="img"
              height="140"
              image={require("../../assets/img/Consultant.jpg")}
            />
            <CardContent className="h-fit">
              <Typography gutterBottom variant="h5" component="div">
                {consultant.user.first_name} {consultant.user.last_name}
              </Typography>
              <Typography variant="body2">
                <StarRateIcon></StarRateIcon>
                Specialized Area - {consultant.specialized_area}
              </Typography>
              <Typography variant="body2">
                <DescriptionIcon></DescriptionIcon>
                Description - {consultant.description}
              </Typography>
              <Typography variant="body2">
                <SavingsIcon></SavingsIcon>
                Hourly Rate - {consultant.hourly_rate / 100}€
              </Typography>
            </CardContent>
            <CardActions style={{ justifyContent: "center" }}>
              <Button
                size="medium"
                variant="contained"
                onClick={() => {
                  setConsultationDisplay(true);
                }}
                className="w-96 mr-2"
              >
                Book Now
              </Button>
              <Tooltip title="Book a session to add a review!" arrow>
                <div className="w-96 ml-2">
                  <Button
                    size="medium"
                    variant="contained"
                    onClick={() => {
                      setOpenAddReviewModal(!openAddReviewModal);
                    }}
                    disabled={consultationSessions.length < 1}
                  >
                    Add a Review
                  </Button>
                </div>
              </Tooltip>
            </CardActions>
          </Card>
          <Card className="w-4/6 h-[40rem] ml-32 px-2 py-2">
            <Typography variant="h6" className="pl-2 pt-2">
              Consultant Reviews
            </Typography>
            <div className="overflow-y-auto h-full">
              <CardContent>
                {reviews.map((review) => (
                  <Review review={review} />
                ))}
              </CardContent>
            </div>
          </Card>
        </div>
        {openConsultationDisplay && (
          <ConsultationBookingDisplay
            handleClose={setConsultationDisplay}
            availability={consultant.availability}
            consultant_id={consultant._id}
          />
        )}
        {openAddReviewModal && (
          <AddReview
            consultant={consultant}
            requeryProfile={requeryProfile}
            setRequeryProfile={setRequeryProfile}
            openAddReviewModal={openAddReviewModal}
            setOpenAddReviewModal={setOpenAddReviewModal}
          />
        )}
      </main>
    </>
  );
}
