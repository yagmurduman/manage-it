import React from "react";
import PaymentSuccess from "../components/Checkouts/PaymentSuccess";
import Footer from "../components/Footers/Footer";
import SideBar from "../components/Sidebars/PmSidebar";

export default function PaymentSuccessPage() {
  return (
    <div>
      <SideBar contents={<PaymentSuccess></PaymentSuccess>} />
      <Footer></Footer>
    </div>
  );
}
