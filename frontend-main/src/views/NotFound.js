import React from "react";
import NotFound from "../components/NotFound";
import Navbar from "../components/Navbars/AuthNavbar";
import Footer from "../components/Footers/Footer";

export default function NotFoundPage() {
    return (
        <div>
          <Navbar></Navbar>
          <NotFound></NotFound>
          <Footer></Footer>
        </div>
      );
};