import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import LinearProgress from "@mui/material/LinearProgress";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import PaymentService from "../../services/PaymentService";
import { useParams } from "react-router-dom";

export default function PaymentSuccess() {
  let { session_id } = useParams();
  useState(() => {
    PaymentService.check_session_status(session_id);
  }, []);
  return (
    <div>
      <LinearProgress color="primary" />
      <Alert
        action={
          <Link to="/">
            <Button
              color="success"
              variant="contained"
              size="small"
              sx={{ mr: 3, mt: 1 }}
            >
              <strong>Return to Home</strong>
            </Button>
          </Link>
        }
        severity="success"
        color="success"
        sx={{
          fontSize: 25,
          width: "100%",
        }}
      >
        <strong>Subscription successful!</strong>
      </Alert>
      <LinearProgress sx={{ mb: 10 }} color="primary" />
    </div>
  );
}
