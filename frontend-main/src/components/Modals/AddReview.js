import React, { useState } from "react";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Rating from "@mui/material/Rating";
import ConsultantService from "../../services/ConsultantService";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";

export default function AddReview({
  consultant,
  requeryProfile,
  setRequeryProfile,
  openAddReviewModal,
  setOpenAddReviewModal,
}) {
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");

  const handleSave = () => {
    ConsultantService.add_review(consultant._id, { rating, title, review });
    alert("Your review has been added!");
    setRequeryProfile(requeryProfile + 1);
    setOpenAddReviewModal(false);
  };

  return (
    <Dialog
      open={openAddReviewModal}
      onClose={() => setOpenAddReviewModal(false)}
    >
      <DialogTitle>Add a Review</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {`Review your experience with the consultant ${consultant.user.first_name} ${consultant.user.last_name}`}
        </DialogContentText>
        <div className="grid grid-cols-1">
          <TextField
            id="outlined-multiline-static"
            label="Title"
            className="my-2"
            placeholder="Give your review a title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <TextField
            id="outlined-multiline-static"
            label="Review"
            multiline
            placeholder="Add your review description"
            rows={4}
            onChange={(e) => {
              setReview(e.target.value);
            }}
          />
          <Rating
            value={rating}
            onChange={(_, newRating) => {
              setRating(newRating);
            }}
            size="large"
            className="mt-2"
            icon={
              <StarIcon style={{ width: "32px", height: "32px" }}></StarIcon>
            }
            emptyIcon={
              <StarOutlineIcon
                style={{ width: "32px", height: "32px" }}
              ></StarOutlineIcon>
            }
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenAddReviewModal(false)}>Cancel</Button>
        <Button onClick={handleSave}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}
