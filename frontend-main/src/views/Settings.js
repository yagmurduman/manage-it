import React  from "react";
import Settings from "../components/Items/Settings";
import SideBar from "../components/Sidebars/PmSidebar";
import Footer from "../components/Footers/Footer";
import Navbar from "../components/Navbars/AuthNavbar";
import { useSelector } from "react-redux";

//Settings page should  show differently when logged in or not and Consultants still see the Sidebar?
function SettingsPage() {
  const user = useSelector((state) => state.user);

    return (
        <>
        {/* check if user name exists --> if user is logged in*/ }
        {user.username ? (
          <SideBar contents={<Settings></Settings>} />
        ) : (
          <>
          {/* else show only navbar*/ }
            <Navbar />
            <Settings />
          </>
        )}
        <Footer />
      </>
    );
  }
  export default SettingsPage;