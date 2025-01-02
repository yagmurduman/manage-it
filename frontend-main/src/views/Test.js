import React, { useEffect } from "react";
import Navbar from "../components/Navbars/AuthNavbar";
import Footer from "../components/Footers/Footer";
import { useSelector, useDispatch } from "react-redux";
import { getBacklogItems } from "../redux/features/backlogSlice";

function TestPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBacklogItems());
  }, [dispatch]);
  const backlogItems = useSelector((state) => state.backlog);
  console.log(backlogItems);

  return (
    <div>
      <Navbar></Navbar>
      <Footer></Footer>
    </div>
  );
}

export default TestPage;
