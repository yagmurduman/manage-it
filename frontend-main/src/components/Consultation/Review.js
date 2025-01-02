import React, { useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

export default function Review({ review }) {
  {
    /*  for rating*/
  }

  useEffect(() => {});

  console.log("review", review);
  return (
    <>
      {/* side-by-side with div List Component*/}
      <div className="flex">
        <List
          sx={{
            width: "100%",
            maxWidth: 2000,
            bgcolor: "background.paper",
            m: 2,
            b: 2,
          }}
        >
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt={review.user.first_name} src={review.user.image} />
            </ListItemAvatar>
            <ListItemText
              primary={review.title}
              secondary={
                <>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                    className="mr-4"
                  >
                    {review.user.first_name} {review.user.last_name}
                  </Typography>
                  <br></br>
                  {review.review}
                </>
              }
            />
            <div>
              <Box sx={{ "& > legend": { ml: 3 } }}>
                <Typography component="legend">Rating</Typography>
                <Rating name="read-only" value={review.rating} readOnly />
              </Box>
            </div>
          </ListItem>
          <Divider variant="inset" component="li" />
        </List>
      </div>
    </>
  );
}
