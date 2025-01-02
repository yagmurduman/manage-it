import React from "react";
import Reset from "../components/Authentication/Reset";
import Navbar from "../components/Navbars/AuthNavbar";
import Footer from "../components/Footers/Footer";

function ResetPage() {
  return (
    <div>
      <Navbar></Navbar>
      <Reset></Reset>
      <Footer></Footer>
    </div>
  );
}

export default ResetPage;
