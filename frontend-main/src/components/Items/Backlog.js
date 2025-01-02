import { ConstructionRounded } from "@mui/icons-material";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";

export default function Backlog() {
  {
    /* used for only backlog modal view, action model view will be handled in other js file*/
  }
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [comments, setComments] = useState("");
  const [priority, setPriority] = useState("");

  return (
    <main className="bg-blueGray-200">
      {/* header button group for backlog and project*/}
      <div className="min-w-screen min-h-screen bg-indigo-200  flex items-center justify-center px-16 py-16">
        <div className="container justify-center items-center flex-col mx-auto px-4 bg-gray-400 w-2/4 mt-12">
          <div className="flex items-center justify-center">
            <div
              className="inline-flex hover:shadow-lg focus:shadow-lg"
              role="group"
            >
              <button
                type="button"
                className="rounded-l inline-block px-6 py-2.5 bg-indigo-500 text-white font-medium text-xs leading-tight uppercase hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out"
              >
                Create New Project
              </button>
              <button
                type="button"
                className="inline-block px-6 py-2.5 bg-indigo-500 text-white font-medium text-xs leading-tight uppercase hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out"
              >
                Backlog
              </button>
              <button
                type="button"
                className="rounded-r inline-block px-6 py-2.5 bg-indigo-500 text-white font-medium text-xs leading-tight uppercase hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out"
              >
                Project Organization
              </button>
              <button
                type="button"
                className="rounded-r inline-block px-6 py-2.5 bg-indigo-500 text-white font-medium text-xs leading-tight uppercase hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out"
              >
                Book Professional Consultation
              </button>
            </div>
          </div>

          {/* modal view for backlog items*/}
          <div
            className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
            id="exampleModalFullscreen"
            tabindex="-1"
            aria-labelledby="exampleModalFullscreenLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-scrollable relative w-auto pointer-events-none">
              <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                  <h5
                    className="flex text-xl font-bold leading-normal text-gray-800"
                    id="exampleModalFullscreenLabel"
                  >
                    Create New Backlog Item
                  </h5>
                </div>
                <div className="modal-body relative p-4">
                  <div>
                    <h3 className="font-sm">
                      Title:
                      <div className="flex">
                        <label className="inline-block text-gray-700 text-sm font-bold mb-2"></label>
                        <input
                          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="title"
                          type="text"
                          onChange={(e) => {
                            setTitle(e.target.value);
                          }}
                        />
                      </div>
                    </h3>
                  </div>
                  <div>
                    <h2 className="font-sm mt-1 mb-2">
                      Description:
                      <div className="justify-center">
                        <div className="l:w-96">
                          <textarea
                            className="form-control block w-full px-3 py-1.5 text-base font-sm text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            id="exampleFormControlTextarea1"
                            rows="2"
                            onChange={(e) => {
                              setDescription(e.target.value);
                            }}
                          ></textarea>
                        </div>
                      </div>
                    </h2>
                  </div>
                  <div>
                    <h2 className="font-sm mx-0 mb-1">
                      Deadline:
                      <div className="justify-center">
                        <div
                          className="datepicker relative form-floating mb-3 xl:w-96"
                          data-mdb-toggle-button="datepicker"
                        >
                          <input
                            type="date"
                            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            placeholder="Select a date"
                            onChange={(e) => {
                              setDate(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                    </h2>
                  </div>
                  <h2 className="font-sm mx-0 mb-2">
                    Priority:
                    <div className="flex">
                      <label className="inline-block text-gray-700 text-sm font-bold mb-2"></label>
                      <input
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="priority"
                        type="text"
                        placeholder="enter number from 1-5"
                        onChange={(e) => {
                          setPriority(e.target.value);
                        }}
                      />
                    </div>
                  </h2>
                  <h2 className="font-sm mx-0 mb-2">
                    Comments:
                    <div>
                      <textarea
                        className="form-control block w-full px-3 py-1.5 text-base font-sm text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        id="exampleFormControlTextarea1"
                        rows="2"
                        onChange={(e) => {
                          setComments(e.target.value);
                        }}
                      ></textarea>
                    </div>
                  </h2>
                </div>
                <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                  <button
                    type="button"
                    className="ht-4 inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
                    data-bs-dismiss="modal"
                  >
                    Save Backlog Item
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* modal view for action items*/}
          <div
            className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
            id="exampleModalFullscreen2"
            tabindex="-1"
            aria-labelledby="exampleModalFullscreenLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-scrollable relative w-auto pointer-events-none">
              <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                  <h5
                    className="flex text-xl font-bold leading-normal text-gray-800"
                    id="exampleModalFullscreenLabel"
                  >
                    Create New Action Item
                  </h5>
                </div>
                <div className="modal-body relative p-4">
                  <div>
                    <h3 className="font-sm">
                      Title:
                      <div className="flex">
                        <label className="inline-block text-gray-700 text-sm font-bold mb-2"></label>
                        <input
                          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="title"
                          type="text"
                        />
                      </div>
                    </h3>
                  </div>
                  <div>
                    <h2 className="font-sm mt-1 mb-2">
                      Description:
                      <div className="justify-center">
                        <div className="l:w-96">
                          <textarea
                            className="form-control block w-full px-3 py-1.5 text-base font-sm text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            id="exampleFormControlTextarea1"
                            rows="2"
                          ></textarea>
                        </div>
                      </div>
                    </h2>
                  </div>
                  <div>
                    <h2 className="font-sm mt-1 mb-2">
                      Assignees:
                      <div className="flex">
                        <div
                          className="bg-white rounded-lg border border-gray-200 w-full text-gray-900 "
                          data-bs-spy="scroll"
                        >
                          <a
                            href="#!"
                            aria-current="true"
                            className=" block px-6 py-2 border-b border-gray-200 w-full rounded-t-lg bg-blue-600 text-white cursor-pointer"
                          >
                            The current link item
                          </a>
                          <a
                            href="#!"
                            className="
        block
        px-6
        py-2
        border-b border-gray-200
        w-full
        hover:bg-gray-100 hover:text-gray-500
        focus:outline-none focus:ring-0 focus:bg-gray-200 focus:text-gray-600
        transition
        duration-500
        cursor-pointer
      "
                          >
                            A second link item
                          </a>
                          <a
                            href="#!"
                            className="
        block
        px-6
        py-2
        border-b border-gray-200
        w-full
        hover:bg-gray-100 hover:text-gray-500
        focus:outline-none focus:ring-0 focus:bg-gray-200 focus:text-gray-600
        transition
        duration-500
        cursor-pointer
      "
                          >
                            A third link item
                          </a>
                          <a
                            href="#!"
                            className="
        block
        px-6
        py-2
        border-b border-gray-200
        w-full
        hover:bg-gray-100 hover:text-gray-500
        focus:outline-none focus:ring-0 focus:bg-gray-200 focus:text-gray-600
        transition
        duration-500
        cursor-pointer
      "
                          >
                            A fourth link item
                          </a>
                          <a
                            href="#!"
                            className="
        block
        px-6
        py-2
        border-gray-200
        w-full
        rounded-b-lg
        focus:outline-none focus:ring-0
        text-gray-400
        cursor-default
      "
                          >
                            A disabled link item
                          </a>
                        </div>
                      </div>
                    </h2>
                  </div>

                  <div>
                    <h2 className="font-sm mx-0 mb-1">
                      Deadline:
                      <div className="justify-center">
                        <div
                          className="datepicker relative form-floating mb-3 xl:w-96"
                          data-mdb-toggle-button="datepicker"
                        >
                          <input
                            type="date"
                            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            placeholder="Select a date"
                          />
                        </div>
                      </div>
                    </h2>
                  </div>
                  <h2 className="font-sm mx-0 mb-2">
                    Priority:
                    <div className="flex">
                      <label className="inline-block text-gray-700 text-sm font-bold mb-2"></label>
                      <input
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="priority2"
                        type="text"
                        placeholder="enter number from 1-5"
                      />
                    </div>
                  </h2>
                </div>
                <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                  <button
                    type="button"
                    className="ht-4 inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
                    data-bs-dismiss="modal"
                  >
                    Save Action Item
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* backlog component*/}
          <div className="accordion accordion-flush" id="accordionFlushExample">
            <div className="accordion-item border-t-0 border-l-0 border-r-0 rounded-none bg-white border border-gray-200">
              <h2 className="accordion-header mb-0" id="flush-headingOne">
                <button
                  className="accordion-button relative flex items-center w-full py-4 px-5 text-base text-gray-800 text-left bg-white border-0 rounded-none transition focus:outline-none"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseOne"
                  aria-expanded="false"
                  aria-controls="flush-collapseOne"
                >
                  Backlog Item #1
                </button>
              </h2>
              <div
                id="flush-collapseOne"
                className="accordion-collapse border-0 collapse show"
                aria-labelledby="flush-headingOne"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body py-4 px-5">
                  <div className="flex">
                    <span className="w-full">
                      <h1 className="text-black font-semibold text-1xl justify-center">
                        Description:
                      </h1>
                      <h1 className="text-black text-sm ">
                        Description will be taken from database.
                      </h1>
                    </span>
                    <span className="w-full">
                      <h1 className="text-black font-semibold text-1xl">
                        Date:
                      </h1>
                      <div className="flex items-center justify-center">
                        <div className="flex items-center justify-center">
                          <div
                            className="datepicker relative form-floating mb-3 xl:w-96"
                            data-mdb-toggle-button="datepicker"
                          >
                            <input
                              type="date"
                              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    </span>
                    <span className="w-full">
                      <h1 className="text-black font-semibold text-1xl">
                        Comments:
                      </h1>
                      <h1 className="text-black text-sm ">
                        Comments will be taken from database.
                      </h1>
                    </span>
                  </div>
                  <div className="flex">
                    <span className="w-full">
                      <h1 className="text-black font-semibold text-1xl">
                        Action Items:
                      </h1>
                      {/* role group and margin for placement*/}
                      <div
                        className="flex hover:shadow-lg focus:shadow-lg place-content-center"
                        role="group"
                      >
                        <button className="h-5 block text-white font-medium text-xs uppercase rounded shadow-md hover:bg-lime-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-lime-700 active:shadow-lg transition duration-150 ease-in-out mr-1 mt-4">
                          Not Started
                        </button>
                        <button className="h-5 block text-white font-medium text-xs uppercase rounded shadow-md hover:bg-lime-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-lime-700 active:shadow-lg transition duration-150 ease-in-out mr-1 ml-1 mt-4">
                          Started
                        </button>
                        <button className="h-5 block bg-yellow-500 text-white font-medium text-xs uppercase rounded shadow-md hover:bg-yellow-600 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-700 active:shadow-lg transition duration-150 ease-in-out mr-1 ml-1 mt-4">
                          Deferred
                        </button>
                        <button className="h-5 block bg-red-600 text-white font-medium text-xs uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out ml-1 mt-4 mr-1">
                          Finished
                        </button>
                      </div>
                    </span>
                    <span className="w-full">
                      <h1 className="text-black font-semibold text-1xl">
                        Priority:
                        <div className="contents">
                          <div className="flex-1">02</div>
                        </div>
                      </h1>
                    </span>
                    <span className="w-full">
                      <h1 className="text-black font-semibold text-1xl">
                        All Finished?
                      </h1>
                      <div className="flex  justify-center mt-auto">
                        <button
                          type="button"
                          className="h-5 px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out mt-4"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModalFullscreen2"
                        >
                          Create New Action Item
                        </button>
                      </div>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* new backlog item creation*/}
            <button
              type="button"
              onClick={() => {}}
              className="inline-block w-3/12 py-4 px-6 mb-6 text-center text-lg leading-6 text-white bg-indigo-500 font-normal hover:bg-blueGray-900 border-3 border-indigo-900 shadow rounded transition duration-200 mt-2 ml-15 mr-15"
              data-bs-toggle="modal"
              data-bs-target="#exampleModalFullscreen"
            >
              Create Backlog Item
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
