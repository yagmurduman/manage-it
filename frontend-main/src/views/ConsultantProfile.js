import React from "react";
import ConsultantProfile from "../components/Consultation/ConsultantProfile";
import Footer from "../components/Footers/Footer";
import SideBar from "../components/Sidebars/PmSidebar";
import { useLocation } from "react-router-dom";

function ConsultantProfilePage() {
  const { state } = useLocation();
  const { consultant } = state || {};

  return (
    <>
      <SideBar contents={<ConsultantProfile consultant={consultant} />} />
      <Footer />
    </>
  );
}

export default ConsultantProfilePage;
