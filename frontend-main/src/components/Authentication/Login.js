import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../redux/features/userSlice";
import { useSelector, useDispatch } from "react-redux";
import LoginStatus from "../Modals/LoginStatus";
import isEmail from "validator/lib/isEmail";

export default function Login() {
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const user = useSelector((state) => state.user);
  const [modalOn, setModalOn] = useState(false);
  const navigate = useNavigate();
  const goToPage = (link) => {
    navigate(link);
  };

  useEffect(() => {
    if (user.username) {
      goToPage("/");
    }
  }, [user]);

  return (
    <>
      <main className="bg-blueGray-200">
        <div className="min-w-screen flex items-center justify-center px-5 py-5">
          <div className="container px-10 sx-auto">
            <div className="max-w-580-px mx-auto max-w-[50%]">
              <div className="text-center mb-8">
                <a className="inline-block mx-auto mb-6" href="/">
                  <img src="nigodo-assets/logo-icon-nigodo.svg" alt="" />
                </a>
                <h2 className="text-4xl font-bold mb-2 text-blueGray-700">
                  Login
                </h2>
              </div>

              <div className="container justify-center items-center flex-col mx-auto px-4w-2/4">
                <div className="mb-6 w-full">
                  <input
                    className="inline-block w-full p-4 leading-6 text-lg font-bold placeholder-indigo-900 bg-white shadow border-2 border-indigo-900 rounded"
                    type="email"
                    placeholder="E-Mail"
                    required
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-6 w-full">
                  <input
                    className="inline-block w-full p-4 leading-6 text-lg font-bold placeholder-indigo-900 bg-white shadow border-2 border-indigo-900 rounded"
                    type="password"
                    placeholder="Password"
                    required
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
                <div className="flex flex-wrap -mx-4 mb-6 items-center justify-between"></div>
                <button
                  type="button"
                  onClick={() => {
                    if (!email || !password) {
                      alert("Please enter your E-Mail and password");
                    } else if (!isEmail(email)) {
                      alert("Please enter a valid E-Mail!");
                    } else {
                      dispatch(login({ email, password }));
                      setModalOn(true);
                    }
                  }}
                  className="inline-block py-4 px-6 mb-6 text-center text-lg leading-6 hover:bg-blue-800 text-white bg-indigo-500 font-bold hover:bg-blueGray-900 border-3 border-indigo-900 shadow rounded transition duration-200"
                >
                  Login
                </button>
                <p className="text-center font-bold">
                  <Link
                    className="lg:text-blue lg:hover:text-blueGray-200 text-blueGray-700 text-s uppercase font-bold"
                    to="/forgotpassword"
                  >
                    Forgot Password?
                  </Link>
                </p>
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
      {modalOn && <LoginStatus setModalOn={setModalOn} />}
    </>
  );
}
