import React from "react";
import RegisterEmployee from "../components/Authentication/RegisterEmployee";
import Navbar from "../components/Navbars/AuthNavbar";
import Footer from "../components/Footers/Footer";

function RegisterEmployeePage() {
  return (
    <div>
      <Navbar></Navbar>
      <RegisterEmployee></RegisterEmployee>
      <Footer></Footer>
    </div>
  );
}

export default RegisterEmployeePage;
