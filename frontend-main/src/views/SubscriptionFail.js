import React from "react";
import SubscriptionFail from "../components/Checkouts/SubscriptionFail";
import Navbar from "../components/Navbars/AuthNavbar";
import Footer from "../components/Footers/Footer";

export default function SubscriptionFailPage() {
    return (
        <div>
          <Navbar></Navbar>
          <SubscriptionFail></SubscriptionFail>
          <Footer></Footer>
        </div>
      );
};