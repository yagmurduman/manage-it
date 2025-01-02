import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import { DataGrid } from "@mui/x-data-grid";
import DisplayActionItem from "../Modals/ActionItemViewDisplay";
import ActionItemService from "../../services/ActionItemService";
import EmployeeService from "../../services/EmployeeService";

export default function ActionItems() {
  const [requeryActionItems, setRequeryActionItems] = useState(0);
  const [actionItems, setActionItems] = useState("");
  const [updateClickInfo, setUpdateClickInfo] = useState(false);
  const [selectedActionItem, setSelectedActionItem] = useState("");
  const project = useSelector((state) => state.project);

  const columns = [
    { field: "title", headerName: "Title", width: 160 },
    { field: "priority", headerName: "Priority", width: 160 },
    { field: "status", headerName: "Current Status", width: 160 },
    { field: "start_date", headerName: "Start Date", width: 160 },
    { field: "due_date", headerName: "Due Date", width: 160 },
    {
      field: "backlog_item_title",
      headerName: "Backlog Item's Title",
      width: 160,
    },
  ];

  //add here the display of asignees and created by
  //read a user for created by
  //read users of action item for asignees
  useEffect(() => {
    ActionItemService.retrieveProjectActionItems(project.selected_project).then(
      (actionItems) => {
        actionItems.forEach((actionItem, idx) => {
          actionItem.id = idx + 1;
          actionItem.backlog_item_title = actionItem.backlog_item.title;
        });
        setActionItems(actionItems);
      }
    );
  }, [requeryActionItems, project.selected_project]);

  return (
    <main className="">
      <div className="flex items-center justify-center px-8 py-8">
        <div className="flex">
          <span className="w-full">
            <Stack direction="center" spacing={5}>
              <Button variant="contained" color="secondary">
                <Link to="/backlog">Return to Backlog Page</Link>
              </Button>
            </Stack>
          </span>
        </div>
      </div>

      <div className="flex items-center justify-center px-8 py-8">
        <Typography variant="h6" gutterBottom component="div">
          Action items are listed on the below table. To edit an employee's
          information click on that employee's cell on the below employee table.
        </Typography>
      </div>

      <div className="mb-10 flex items-center justify-center px-8 py-6">
        <div style={{ height: 400, width: "66%" }}>
          <DataGrid
            rows={actionItems}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            /* checkboxSelection   can be added if needed?*/
            onCellClick={(e) => {
              setUpdateClickInfo(true);
              setSelectedActionItem(e.row);
            }}
          />
          {updateClickInfo && (
            <DisplayActionItem
              handleClose={setUpdateClickInfo}
              actionItem={selectedActionItem}
              requeryActionItems={requeryActionItems}
              setRequeryActionItems={setRequeryActionItems}
            />
          )}
        </div>
      </div>
    </main>
  );
}
