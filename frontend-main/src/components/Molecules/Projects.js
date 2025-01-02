import React from "react";
import MenuItem from "@mui/material/MenuItem";

export default function ProjectMolecule({ actionItemId }) {
  // Make request to backend to retrieve action item with this id
  return (
    <div className="flex hover:shadow-lg focus:shadow-lg place-content-center">
      <span className="w-full"></span>
      <span className="w-full">
        <MenuItem
        onClick={popupState.close}
        >
          Project 1
        </MenuItem>
      </span>
      <span className="w-full"></span>
    </div>
  );
}