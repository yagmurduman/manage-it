import React from "react";

export default function ConsultantMolecule({ consultantId }) {


  // Make request to backend to retrieve consultant item with this id
  return (
    <div className="flex hover:shadow-lg focus:shadow-lg place-content-center">
      <span className="w-full"></span>
      <span className="w-full">
        <MenuItem
        onClick={popupState.close}
        >
          Consultant 1
        </MenuItem>
      </span>
      <span className="w-full"></span>
    </div>
  );
}