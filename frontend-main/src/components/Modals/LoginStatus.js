import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector } from "react-redux";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { pink } from "@mui/material/colors";

export default function LoginStatus({ setModalOn }) {
  const user = useSelector((state) => state.user);

  return (
    <>
      <div className="grid place-items-center fixed inset-0 w-full h-full z-50 bg-black bg-opacity-50 duration-300 overflow-y-auto">
        <div className="flex h-screen justify-center items-center relative sm:w-3/4 md:w-1/2 lg:w-1/3 mx-2 sm:mx-auto my-10 opacity-100">
          <div className="flex-col justify-center py-12 px-24 border-4 relative bg-white shadow-lg rounded-lg text-gray-900 z-20">
            <header className="flex flex-col justify-center items-center p-3 text-blue-600">
              {user.status === "rejected" ? (
                <>
                  <br />
                  <ErrorOutlineIcon
                    fontSize="large"
                    sx={{ color: pink[500] }}
                  />
                  <br />
                  <p className="font-semibold text-xl text-red-600">
                    An error occured. Your login request could not get
                    processed.
                  </p>
                </>
              ) : (
                <>
                  <br />
                  <CircularProgress />
                  <br />
                  <h2 className="font-semibold text-2xl">Loading...</h2>
                </>
              )}
            </header>
            <footer className="flex justify-center bg-transparent mt-4">
              <button
                className="bg-blue-600 font-semibold text-white py-3 w-full rounded-b-md hover:bg-blue-700 focus:outline-none focus:ring shadow-lg hover:shadow-none transition-all duration-300"
                onClick={() => {
                  setModalOn(false);
                }}
              >
                Cancel
              </button>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
}
