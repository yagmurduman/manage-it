import React from "react";
import HelpSupport from "../components/Accordions/HelpSupport";
import SideBar from "../components/Sidebars/PmSidebar";
import Footer from "../components/Footers/Footer";

function HelpSupportPage() {
  return (
    <>
      <SideBar 
      contents={<HelpSupport></HelpSupport>} 
      />
      <Footer></Footer>
    </>
  );
}

export default HelpSupportPage;
