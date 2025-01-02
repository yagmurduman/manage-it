import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { create_user_from_registeration_link } from "../../redux/features/userSlice";
import { useDispatch } from "react-redux";

export default function RegisterEmployee() {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [company_name, setCompanyName] = useState("");
  let { token } = useParams();

  //Auto redirect to home page if token parse fails
  const navigate = useNavigate();
  const goToPage = (link) => {
    navigate(link);
  };

  useEffect(() => {
    let parsedToken = extractData(token);
    if (!parsedToken) {
      goToPage("/");
    }
    setEmail(parsedToken.email);
    setFirstName(parsedToken.first_name);
    setLastName(parsedToken.last_name);
    setCompanyName(parsedToken.company_name);
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
                Register a new account as an employee
              </h2>
              <p className="text-xl mb-2 text-blueGray-700">
                Please enter a <b>username</b> and a <b>password</b> to create
                your new account!
              </p>
            </div>
            <div className="container justify-center items-center flex-col mx-auto px-4w-2/4 grid grid-cols-2 gap-4">
              <div className="mb-6 w-full">
                First name:
                <input
                  className="inline-block w-full p-4 leading-6 text-lg font-bold placeholder-gray-900 bg-gray-300 shadow border-2 border-gray-400 rounded"
                  type="text"
                  placeholder={first_name}
                  disabled
                />
              </div>
              <div className="mb-6 w-full">
                Last name:
                <input
                  className="inline-block w-full p-4 leading-6 text-lg font-bold placeholder-gray-900 bg-gray-300 shadow border-2 border-gray-400 rounded"
                  type="text"
                  placeholder={last_name}
                  disabled
                />
              </div>
              <div className="mb-6 w-full">
                E-Mail:
                <input
                  className="inline-block w-full p-4 leading-6 text-lg font-bold placeholder-gray-900 bg-gray-300 shadow border-2 border-gray-400 rounded"
                  type="email"
                  placeholder={email}
                  disabled
                />
              </div>
              <div className="mb-6 w-full">
                Company name:
                <input
                  className="inline-block w-full p-4 leading-6 text-lg font-bold placeholder-gray-900 bg-gray-300 shadow border-2 border-gray-400 rounded"
                  type="text"
                  placeholder={company_name}
                  disabled
                />
              </div>
              <div className="mb-6 w-full">
                <input
                  className="inline-block w-full p-4 leading-6 text-lg font-bold placeholder-indigo-900 bg-white shadow border-2 border-indigo-900 rounded"
                  type="text"
                  placeholder="Username"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
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
              if (!password || !username) {
                alert("Please enter your username and password to proceed");
                return;
              }
              dispatch(
                create_user_from_registeration_link({
                  password,
                  username,
                  token,
                })
              );
              alert("Request is being processed!");
              goToPage("/login");
            }}
            className="flex items-center mx-auto border-0 p-3 py-4 px-6 mb-6 text-lg leading-6 hover:bg-blue-800 text-white bg-indigo-500 font-bold hover:bg-blueGray-900 border-3 border-indigo-900 shadow rounded transition duration-200"
          >
            Create an Account
          </button>
        </div>
      </div>
    </main>
  );
}

function extractData(token) {
  try {
    let base64Url = token.split(".")[1];
    let base64 = base64Url.replace("-", "+").replace("_", "/");
    let token_data = JSON.parse(window.atob(base64));
    if (Date.now() >= token_data.exp * 1000) {
      throw new Error("Expired Token");
    }
    return {
      email: token_data.email,
      first_name: token_data.first_name,
      last_name: token_data.last_name,
      company_name: token_data.company_name,
    };
  } catch (e) {
    return false;
  }
}
