import React from "react";
import Registeration from "../components/Authentication/Registeration";
import Navbar from "../components/Navbars/AuthNavbar";
import Footer from "../components/Footers/Footer";

function SignupPage() { 
  return (
    <div>
      <Navbar></Navbar>
      <Registeration></Registeration>
      <Footer></Footer>

    </div>
  );
}

export default SignupPage;