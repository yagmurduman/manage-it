import React from "react";
import PaymentFail from "../components/Checkouts/PaymentFail";
import Footer from "../components/Footers/Footer";
import SideBar from "../components/Sidebars/PmSidebar";

export default function PaymentFailPage() {
  return (
    <div>
      <SideBar contents={<PaymentFail></PaymentFail>} />
      <Footer></Footer>
    </div>
  );
}
