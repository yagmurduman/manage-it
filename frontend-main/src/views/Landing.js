import React from "react";
import Home from "../components/Home";
import HomePm from "../components/HomePm";
import Navbar from "../components/Navbars/AuthNavbar";
import SideBar from "../components/Sidebars/PmSidebar";
import ConsultantViewPage from "../views/ConsultantView";

import { useSelector } from "react-redux";

function LandingPage() {
  const user = useSelector((state) => state.user);

  return (
    <>
      {user.username ? (user.rights === "Consultant"?<ConsultantViewPage/> : (
        <SideBar contents={<HomePm></HomePm>} />
        )) : (
        <>
          <Navbar />
          <Home />
        </>
      )}
    </>
  );
}

export default LandingPage;
