import React, { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ActionItemMolecule from "../Molecules/ActionItems";
import { Avatar, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import Stack from "@mui/material/Stack";
import CreateNewActionItemModal from "../Modals/CreateNewActionItem";
import EditBacklogItemModal from "../Modals/EditBacklogItem";
import DisplayActionItemModal from "../Modals/ActionItemViewDisplay";
import BacklogService from "../../services/BacklogService";
import ActionItemService from "../../services/ActionItemService";
import { Link } from "react-router-dom";
import UserService from "../../services/UserService";

export default function Backlog({
  backlogItem,
  requeryBacklog,
  setRequeryBacklog,
}) {
  const [openAICreation, setOpenAICreation] = useState(false);
  const [openBIEdit, setOpenBIEdit] = useState(false);
  const [openAIDisplay, setAIDisplay] = useState(false);
  const [selectedAI, setSelectedAI] = useState("");
  const [actionItems, setActionItems] = useState([]);
  const [creator, setCreator] = useState("");
  const prioritiesMap = { 1: "1 - High", 2: "2 - Medium", 3: "3 - Low" };

  useEffect(() => {
    ActionItemService.retrieveBacklogActionItems(backlogItem._id).then(
      (action_items) => {
        setActionItems(action_items);
      }
    );
    UserService.getCurrentUser(backlogItem.created_by).then((data) =>
      setCreator(data)
    );
  }, [requeryBacklog]);

  console.log("backlogItem", backlogItem);
  const determineAIColour = (ai) => {
    switch (ai.status) {
      case "Not Started":
        return "primary";
      case "In Progress":
        return "secondary";
      case "Completed":
        return "success";
      case "Deferred":
        return "error";
      default:
        return "warning";
    }
  };

  console.log("AIs", actionItems);

  return (
    <div className="w-4/5">
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <h2 className="font-semibold text-lg text-blue-800">
            {backlogItem.title}
          </h2>
        </AccordionSummary>
        <AccordionDetails className="grid grid-cols-4 grid-rows-2 gap-4 justify-center items-center">
          <div className="col-span-2">
            <h2 className="font-bold text-l">Description</h2>
            <Typography className="mt-2 max-w-lg ">
              {backlogItem.description}
            </Typography>
          </div>
          <div>
            <h2 className="font-bold text-l">Date</h2>
            <Typography className="mt-2">{backlogItem.due_date}</Typography>
          </div>
          <div>
            <h2 className="font-bold text-l">Created By</h2>
            <Avatar
              className="mt-2"
              alt={creator.first_name}
              src={creator.image}
            />
            <p className="mt-3">
              {`${creator.first_name} ${creator.last_name}`}
            </p>
            <a
              href={`mailto:${creator.email}`}
              target="_top"
            >{`${creator.email}`}</a>
          </div>
          <div className="col-span-2">
            <h2 className="font-bold text-l">Action Items</h2>
            <div className="flex">
              <span className="w-full">
                {actionItems.length < 4 ? (
                  <div>
                    <Stack direction="row" spacing={2}>
                      {actionItems.map((action_item) => (
                        <Button
                          variant="contained"
                          color={determineAIColour(action_item)}
                          onClick={() => {
                            setAIDisplay(true);
                            setSelectedAI(action_item);
                          }}
                        >
                          {action_item.title}
                        </Button>
                      ))}
                    </Stack>
                  </div>
                ) : (
                  <div>
                    <Stack direction="row" spacing={2}>
                      {actionItems.slice(0, 3).map((action_item) => (
                        <Button
                          variant="contained"
                          color={determineAIColour(action_item)}
                          onClick={() => {
                            setAIDisplay(true);
                            setSelectedAI(action_item);
                          }}
                        >
                          {action_item.title}
                        </Button>
                      ))}
                    </Stack>
                    <Stack direction="row" className="mt-2" spacing={2}>
                      <Link to="/actionitem" underline="always">
                        <h2 className="font-semibold text-blue-500">
                          ...click here to see all action items
                        </h2>
                      </Link>
                    </Stack>
                  </div>
                )}
              </span>
              <span className="w-full"></span>
            </div>
          </div>
          <div>
            <h2 className="font-bold text-l">Priority</h2>
            <Typography className="mt-2">
              {prioritiesMap[backlogItem.priority]}
            </Typography>
          </div>
        </AccordionDetails>
        <AccordionDetails className="grid grid-cols-3  gap-4 justify-center items-center">
          <Button
            color="success"
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {
              setOpenAICreation(true);
            }}
          >
            Create Action Item
          </Button>
          <Button
            variant="contained"
            style={{
              backgroundColor: "#CCCC00",
            }}
            startIcon={<EditIcon />}
            onClick={() => {
              setOpenBIEdit(true);
            }}
          >
            Edit Backlog Item
          </Button>
          <Button
            startIcon={<DeleteIcon />}
            variant="contained"
            color="error"
            onClick={async () => {
              let confirmation = window.confirm(
                "Are you sure you want to delete this backlog item?"
              );
              if (confirmation) {
                await BacklogService.removeBacklogItem(backlogItem._id);
                //delete action items as well
                setRequeryBacklog(requeryBacklog + 1);
              }
            }}
          >
            Delete Backlog Item
          </Button>
        </AccordionDetails>
      </Accordion>

      {/*  handleClose={setOpenAICreation used for modal to match with the button*/}
      {openAICreation && (
        <CreateNewActionItemModal
          handleClose={setOpenAICreation}
          backlog_item_id={backlogItem._id}
          requeryBacklog={requeryBacklog}
          setRequeryBacklog={setRequeryBacklog}
        />
      )}
      {openBIEdit && (
        <EditBacklogItemModal
          handleClose={setOpenBIEdit}
          backlogItem={backlogItem}
          requeryBacklog={requeryBacklog}
          setRequeryBacklog={setRequeryBacklog}
        />
      )}
      {openAIDisplay && (
        <DisplayActionItemModal
          handleClose={setAIDisplay}
          actionItem={selectedAI}
          requeryActionItems={requeryBacklog}
          setRequeryActionItems={setRequeryBacklog}
        />
      )}
    </div>
  );
}
