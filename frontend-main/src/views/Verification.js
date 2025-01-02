import React from "react";
import Verification from "../components/Authentication/Verification";
import Navbar from "../components/Navbars/AuthNavbar";
import Footer from "../components/Footers/Footer";

function VerificationPage() {
  return (
    <div>
      <Navbar></Navbar>
      <Verification></Verification>
      <Footer></Footer>
    </div>
  );
}

export default VerificationPage;
