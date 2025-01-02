import React, { useEffect, useState } from "react";
import Backlog from "../components/Accordions/Backlog";
import SideBar from "../components/Sidebars/PmSidebar";
import Footer from "../components/Footers/Footer";
import { useSelector, useDispatch } from "react-redux";
import { getBacklogItems } from "../redux/features/backlogSlice";
import { Button } from "@mui/material";
import CreateNewBacklogItemModal from "../components/Modals/CreateNewBacklogItem";
import BacklogService from "../services/BacklogService";

function BacklogPage() {
  const project = useSelector((state) => state.project);
  const [backlogItems, setBacklogItems] = useState([]);
  const [openBICreate, setOpenBICreation] = useState(false);
  const [requeryBacklog, setRequeryBacklog] = useState(0);

  useEffect(() => {
    console.log("Currently selected project", project.selected_project);
    console.log("Current requeryBacklog count", requeryBacklog);
    BacklogService.retrieveProjectBacklogs(project.selected_project).then(
      (retrievedBacklog) => {
        setBacklogItems(retrievedBacklog);
      }
    );
  }, [project.selected_project, requeryBacklog]);

  return (
    <div>
      <SideBar
        contents={
          <div className="items-center justify-center mt-20 mb-20 mx-4 flex flex-col space-y-5">
            <Button
              className="w-50"
              variant="contained"
              onClick={() => {
                setOpenBICreation(true);
              }}
            >
              Create Backlog Item
            </Button>
            {openBICreate && (
              <CreateNewBacklogItemModal
                handleClose={setOpenBICreation}
                setRequeryBacklog={setRequeryBacklog}
                requeryBacklog={requeryBacklog}
              />
            )}
            {backlogItems
              ? backlogItems.map((backlogItem, idx) => (
                  <Backlog
                    key={idx}
                    className="mx-2 px-2"
                    backlogItem={backlogItem}
                    requeryBacklog={requeryBacklog}
                    setRequeryBacklog={setRequeryBacklog}
                  ></Backlog>
                ))
              : ""}
          </div>
        }
      ></SideBar>

      <Footer></Footer>
    </div>
  );
}

export default BacklogPage;
