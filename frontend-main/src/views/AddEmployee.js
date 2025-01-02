import React from "react";
import AddEmployee from "../components/Items/AddEmployee";
import SideBar from "../components/Sidebars/PmSidebar";
import Footer from "../components/Footers/Footer";

function AddEmployeePage() {
  return (
    <div>
      <SideBar contents={<AddEmployee></AddEmployee>}></SideBar>
      <Footer></Footer>
    </div>
  );
}
export default AddEmployeePage;
