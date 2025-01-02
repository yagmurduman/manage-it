import React from "react";
import SideBar from "../components/Sidebars/PmSidebar";
import ConsultancyBookingView from "../components/Consultation/ConsultancyBookingView";
import Footer from "../components/Footers/Footer";



function ConsultancyBookingViewPage() {
    return (
      <div>
        <SideBar contents={<ConsultancyBookingView ></ConsultancyBookingView >}
        ></SideBar>
        <Footer></Footer>
      </div>
    );
  }
  
  export default ConsultancyBookingViewPage;