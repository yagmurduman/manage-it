import React from "react";
import SubscriptionSuccess from "../components/Checkouts/SubscriptionSuccess";
import Navbar from "../components/Navbars/AuthNavbar";
import Footer from "../components/Footers/Footer";

export default function SubscriptionSuccessPage() {
    return (
        <div>
          <Navbar></Navbar>
          <SubscriptionSuccess></SubscriptionSuccess>
          <Footer></Footer>
        </div>
      );
};