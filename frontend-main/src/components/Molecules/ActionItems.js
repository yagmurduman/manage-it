import React from "react";

export default function ActionItemMolecule({ actionItemId }) {
  // Make request to backend to retrieve action item with this id
  return (
    <div className="flex hover:shadow-lg focus:shadow-lg place-content-center">
      <span className="w-full"></span>
      <span className="w-full">
        <button
          className="h-5 bg-green-500 text-white font-medium text-xs uppercase rounded shadow-md hover:bg-green-200 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-lime-700 active:shadow-lg transition duration-150 ease-in-out mr-1 mt-4"
          data-bs-toggle="modal"
          data-bs-target="#exampleModalFullscreenEDIT2"
        >
          Action Item 1
        </button>
      </span>
      <span className="w-full"></span>
    </div>
  );
}
