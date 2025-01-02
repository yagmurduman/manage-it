import React from "react";
import ConsultationSuccess from "../components/Checkouts/ConsultationSuccess";
import Footer from "../components/Footers/Footer";
import SideBar from "../components/Sidebars/PmSidebar";

export default function PaymentSuccessPage() {
  return (
    <div>
      <SideBar contents={<ConsultationSuccess></ConsultationSuccess>} />
      <Footer></Footer>
    </div>
  );
}
