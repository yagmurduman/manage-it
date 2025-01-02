import React from "react";
import Forgot from "../components/Authentication/Forgot";
import Navbar from "../components/Navbars/AuthNavbar";
import Footer from "../components/Footers/Footer";

function ForgotPage() {
  return (
    <div>
      <Navbar></Navbar>
      <Forgot></Forgot>
      <Footer></Footer>
    </div>
  );
}

export default ForgotPage;
