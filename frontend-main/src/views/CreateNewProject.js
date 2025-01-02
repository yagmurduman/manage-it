import React from "react";
import NewProject from "../components/Items/CreateNewProject";
import SideBar from "../components/Sidebars/PmSidebar";
import Footer from "../components/Footers/Footer";

function NewProjectPage() {
  return (
    <>
      <SideBar contents={<NewProject></NewProject>} />
      <Footer></Footer>
    </>
  );
}

export default NewProjectPage;
