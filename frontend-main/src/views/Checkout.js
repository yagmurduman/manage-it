import React from "react";
import Navbar from "../components/Navbars/AuthNavbar";
import Checkout from "../components/Checkouts/Checkout";
import Footer from "../components/Footers/Footer";
import SideBar from "../components/Sidebars/PmSidebar";

import { useSelector } from "react-redux";


export default function CheckoutPage() {
  const user = useSelector((state) => state.user);

  return (
    <>
      {user.username ? (
        <SideBar contents={<Checkout></Checkout>} />
      ) : (
        <>
          <Navbar />
          <Checkout />
        </>
      )}
      <Footer></Footer>
    </>
  );
}
