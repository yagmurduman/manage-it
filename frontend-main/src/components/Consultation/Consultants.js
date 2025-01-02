import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import ConsultantService from "../../services/ConsultantService";
import { useDispatch } from "react-redux";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { get_consultants } from "../../redux/features/consultantsSlice";
import DescriptionIcon from "@mui/icons-material/Description";
import StarRateIcon from "@mui/icons-material/StarRate";
import SavingsIcon from "@mui/icons-material/Savings";

{
  /* Page for viewing consultants all together*/
}

export default function Consultants({ consultant }) {
  const navigate = useNavigate();

  return (
    <main className="">
      <div
        className="flex"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Card sx={{ maxWidth: 250, m: 2, t: 5, l: 5, b: 3, pb: 3 }}>
          <CardMedia
            component="img"
            height="140"
            image={require("../../assets/img/Consultant.jpg")}
          />
          <CardContent>
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
            <Link
              to={`/consultant`}
              onClick={(e) => {
                e.preventDefault();
                navigate("/consultant", { state: { consultant: consultant } });
              }}
            >
              <Button size="small" variant="contained">
                See Profile
              </Button>
            </Link>
          </CardActions>
        </Card>
      </div>
      <Box></Box>
      <Divider />
    </main>
  );
}
