import React  from "react";
import AddProductManager from "../components/Items/AddProductManager";
import SideBar from "../components/Sidebars/PmSidebar";
import Footer from "../components/Footers/Footer";

function AddProductManagerPage() {
  return (
    <div>
      <SideBar contents={<AddProductManager></AddProductManager>}></SideBar>
      
      <Footer></Footer>
    </div>


  );
}
export default AddProductManagerPage;
