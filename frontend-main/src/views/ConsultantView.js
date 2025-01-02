import React from "react";
import ConsultantNavbar from "../components/Navbars/ConsultantNavbar";
import ConsultantView from "../components/Consultation/ConsultantView";
import Footer from "../components/Footers/Footer";



function ConsultantViewPage() {
    return (
      <div>
        <ConsultantNavbar></ConsultantNavbar>
        <ConsultantView></ConsultantView>
        <Footer></Footer>
      </div>
    );
  }
  
  export default ConsultantViewPage;