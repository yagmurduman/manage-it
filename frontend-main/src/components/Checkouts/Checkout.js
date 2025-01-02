import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import PaymentService from "../../services/PaymentService";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CompanyService from "../../services/CompanyService";

export default function Checkout() {
  let { project_id } = useParams();
  console.log("project_id", project_id);
  const user = useSelector((state) => state.user);
  const [subscribed, setSubscribed] = useState(false);
  const [subValidity, setSubValidity] = useState("");
  const navigate = useNavigate();
  const goToPage = (link) => {
    navigate(link);
  };
  useEffect(() => {
    if (!user.username) {
      goToPage("/");
    }
    CompanyService.get_a_company(user.company_id).then((data) => {
      if (
        data.subscribed_on &&
        new Date(
          parseInt(data.subscribed_on) +
            1659113118778 +
            30 * 24 * 60 * 60 * 1000
        ) > Date.now()
      ) {
        let validity = new Date(
          parseInt(data.subscribed_on) +
            1659113118778 +
            30 * 24 * 60 * 60 * 1000
        );
        setSubValidity(
          `${validity.getDay()}.${validity.getMonth()}.${validity.getFullYear()}}`
        );
        setSubscribed(true);
      }
    });
  }, [user]);
  return (
    <div className="flex flex-row justify-center space-x-6 mb-10">
      <div className="mt-10 mb-10 mx-5 w-auto">
        <img src={require("../../assets/img/onetimepayment.jpeg")} />
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          onClick={async () => {
            let link = await PaymentService.one_time_payment(project_id);
            window.location.href = link.url;
          }}
        >
          Proceed to Checkout
        </Button>
      </div>
      <div className="mt-10 mb-10 mx-5 w-auto">
        <img src={require("../../assets/img/subscribe.jpeg")} />
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          disabled={subscribed}
          onClick={async () => {
            let link = await PaymentService.subscribe(project_id);
            window.location.href = link.url;
          }}
        >
          Proceed to Checkout
        </Button>
        {subscribed ? (
          <h2 className="max-w-50">
            You already have a subscription valid until {subValidity}
          </h2>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
