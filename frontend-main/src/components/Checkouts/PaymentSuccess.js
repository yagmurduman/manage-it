import React, { useEffect } from "react";
import Alert from "@mui/material/Alert";
import LinearProgress from "@mui/material/LinearProgress";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import PaymentService from "../../services/PaymentService";
import { useSelector } from "react-redux";

export default function PaymentSuccess() {
  let { session_id } = useParams();
  console.log("sessionId", session_id);
  let backend_reply = PaymentService.check_session_status(session_id);
  console.log(backend_reply);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const goToPage = (link) => {
    navigate(link);
  };
  useEffect(() => {
    if (!user.username) {
      goToPage("/");
    }
    setTimeout(() => {
      goToPage("/");
    }, 5000);
  }, [user]);
  return (
    <div className="mt-16 mb-16">
      <h2 className="mb-4 flex font-extrabold justify-center text-4xl text-blue-800">
        Your payment has been succesfully processed
      </h2>
      <h2 className="mb-4 flex font-extrabold justify-center text-2xl text-blue-900">
        You will be automatically transferred to your project page
      </h2>
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
        <strong>Checkout successful!</strong>
      </Alert>
      <LinearProgress sx={{ mb: 10 }} color="primary" />
    </div>
  );
}
