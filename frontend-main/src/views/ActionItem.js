import React  from "react";
import ActionItems from "../components/Items/ActionItems";
import SideBar from "../components/Sidebars/PmSidebar";
import Footer from "../components/Footers/Footer";

function ActionItemPage() {
  return (
    <div>
      <SideBar contents={<ActionItems></ActionItems>}></SideBar>
      <Footer></Footer>
    </div>


  );
}
export default ActionItemPage;