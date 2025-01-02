import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../../redux/features/userSlice";
import { useDispatch } from "react-redux";

export default function Reset() {
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [salt, setSalt] = useState("");
  let { token } = useParams();

  //Auto redirect to home page if token parse fails
  const navigate = useNavigate();
  const goToPage = (link) => {
    navigate(link);
  };

  useEffect(() => {
    let parsedUser = extractUser(token);
    if (!parsedUser) {
      goToPage("/");
    }
    setEmail(parsedUser.email);
    setSalt(parsedUser.salt);
    // eslint-disable-next-line
  }, [token]);

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
                Reset Your Password
              </h2>
              <p className="text-xl mb-2 text-blueGray-700">
                We found your account. Please enter your new password.
              </p>
            </div>
            <div className="container justify-center items-center flex-col mx-auto px-4w-2/4">
              <div className="mb-6 w-full">
                <input
                  className="inline-block w-full p-4 leading-6 text-lg font-bold placeholder-gray-900 bg-gray-300 shadow border-2 border-gray-400 rounded"
                  type="email"
                  placeholder={email}
                  disabled
                />
              </div>
              <div className="mb-6 w-full">
                <input
                  className="inline-block w-full p-4 leading-6 text-lg font-bold placeholder-indigo-900 bg-white shadow border-2 border-indigo-900 rounded"
                  type="password"
                  placeholder="Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              dispatch(resetPassword({ email, password, salt }));
              alert("Request is being processed!");
              goToPage("/login");
            }}
            className="flex items-center mx-auto border-0 p-3 py-4 px-6 mb-6 text-lg leading-6 hover:bg-blue-800 text-white bg-indigo-500 font-bold hover:bg-blueGray-900 border-3 border-indigo-900 shadow rounded transition duration-200"
          >
            Reset My Password
          </button>
        </div>
      </div>
    </main>
  );
}

function extractUser(token) {
  try {
    let base64Url = token.split(".")[1];
    let base64 = base64Url.replace("-", "+").replace("_", "/");
    let userJson = JSON.parse(window.atob(base64));
    if (Date.now() >= userJson.exp * 1000) {
      throw new Error("Expired Token");
    }
    return { email: userJson.email, salt: userJson.salt };
  } catch (e) {
    return false;
  }
}
