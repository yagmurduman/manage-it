import React  from "react";
import AboutUs from "../components/Items/AboutUs";
import SideBar from "../components/Sidebars/PmSidebar";
import Footer from "../components/Footers/Footer";
import Navbar from "../components/Navbars/AuthNavbar";
import { useSelector } from "react-redux";

//About us Page should not use sidebar when a consultant logged in!!! Should be taken care of!
function AboutUsPage() {
  const user = useSelector((state) => state.user);

    return (
        <>
        {/* check if user name exists --> if user is logged in*/ }
        {user.username ? (
          <SideBar contents={<AboutUs></AboutUs>} />
        ) : (
          <>
          {/* else show only navbar*/ }
            <Navbar />
            <AboutUs />
          </>
        )}
        <Footer />
      </>
    );
  }
  export default AboutUsPage;