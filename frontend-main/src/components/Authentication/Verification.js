import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyCompany } from "../../redux/features/companySlice";
import { useDispatch } from "react-redux";

export default function Forgot() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const goToPage = (link) => {
    navigate(link);
  };

  return (
    <main className="bg-blueGray-200">
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex-col lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">Ready to dive in?</span>
            <span className="block text-indigo-600">
              Register your company today.
            </span>
          </h2>

          <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">
              First verify your company's mail address to continue with the sign
              up process!
            </span>
          </h2>
          <br></br>
          <input
            className="inline-flex w-full p-4 leading-6 text-lg font-bold placeholder-indigo-900 bg-white shadow border-2 border-indigo-900 rounded"
            type="email"
            placeholder="E-Mail"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <a
            href="#"
            className="inline-flex items-center justify-center my-3 pt-3 mr-3 px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            onClick={() => {
              dispatch(verifyCompany({ email }));
              alert("Verification E-Mail sent");
              goToPage("/");
            }}
          >
            Send Verification Code
          </a>
          <a
            href="/"
            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
          >
            Learn more
          </a>
        </div>
      </div>
    </main>
  );
}
