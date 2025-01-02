import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { forgot } from "../../redux/features/userSlice";
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
      <div className="min-w-screen min-h-screen flex items-center justify-center px-5 py-5">
        <div className="container px-10 sx-auto">
          <div className="max-w-580-px mx-auto max-w-[50%]">
            <div className="text-center mb-8">
              <a className="inline-block mx-auto mb-6" href="/">
                <img src="nigodo-assets/logo-icon-nigodo.svg" alt="" />
              </a>
              <h2 className="text-4xl font-bold mb-2 text-blueGray-700">
                Find Your Account
              </h2>
              <p className="text-xl mb-2 text-blueGray-700">
                If we find an account associated with your E-Mail address, we
                will send you an E-Mail with an activation link you can use to
                change your password.
              </p>
            </div>
            <div className="container justify-center items-center flex-col mx-auto px-4w-2/4">
              <div className="mb-6 w-full">
                <input
                  className="inline-block w-full p-4 leading-6 text-lg font-bold placeholder-indigo-900 bg-white shadow border-2 border-indigo-900 rounded"
                  type="email"
                  placeholder="E-Mail"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-wrap -mx-4 mb-6 items-center justify-between"></div>
              <button
                type="button"
                onClick={() => {
                  dispatch(forgot({ email }));
                  alert("Forgot E-Mail sent");
                  goToPage("/");
                }}
                className="inline-block py-4 px-6 mb-6 text-center text-lg leading-6 hover:bg-blue-800 text-white bg-indigo-500 font-bold hover:bg-blueGray-900 border-3 border-indigo-900 shadow rounded transition duration-200"
              >
                Send Activation E-Mail
              </button>
              <p className="text-center font-bold">
                Don't have an account? &nbsp;
                <Link
                  className="lg:text-blue lg:hover:text-blueGray-200 text-blueGray-700 text-s uppercase font-bold"
                  to="/verification"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
