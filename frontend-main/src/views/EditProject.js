import React from "react";
import EditProject from "../components/Items/EditProject";
import SideBar from "../components/Sidebars/PmSidebar";
import Footer from "../components/Footers/Footer";

function EditProjectPage() {
  return (
    <>
      <SideBar 
      contents={<EditProject></EditProject>} 
      />
      
      <Footer></Footer>
    </>
  );
}

export default EditProjectPage;
