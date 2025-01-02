import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { createCompanyAndUser } from "../../redux/features/companySlice";
import { Convert } from "mongo-image-converter";
import { styled } from "@mui/material/styles";

const steps = [
  "Company Information",
  "Administrator Information",
  "Submit Form",
];

const Input = styled("input")({
  display: "none",
});

function extractTokenInfo(token) {
  try {
    let base64Url = token.split(".")[1];
    let base64 = base64Url.replace("-", "+").replace("_", "/");
    let tokenJson = JSON.parse(window.atob(base64));
    if (Date.now() >= tokenJson.exp * 1000) {
      throw new Error("Expired Token");
    }
    return { email: tokenJson.email };
  } catch (e) {
    return false;
  }
}

export default function HorizontalLinearStepper() {
  let { token } = useParams();

  const [convertedImageFile, setConvertedImageFile] = useState("");

  console.log(convertedImageFile);
  const convertImage = async (imageFile) => {
    try {
      const convertedImage = await Convert(imageFile);
      if (!convertedImage) {
        alert("The file is not in format of image/jpeg or image/png");
      } else {
        setConvertedImageFile(convertedImage);
      }
    } catch (error) {
      console.warn(error.message);
    }
  };

  //Auto redirect to home page if token parse fails
  const navigate = useNavigate();
  const goToPage = (link) => {
    navigate(link);
  };

  useEffect(() => {
    let parsedInfo = extractTokenInfo(token);
    if (!parsedInfo) {
      goToPage("/");
    }
    setCompanyEmailAddress(parsedInfo.email);
    setAdminEmail(parsedInfo.email);
    // eslint-disable-next-line
  }, [token]);

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const dispatch = useDispatch();
  const [companyName, setCompanyName] = useState("");
  const [companyEmailAddress, setCompanyEmailAddress] = useState("");
  const [streetName, setStreetName] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [postcode, setPostcode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [adminUsername, setAdminUsername] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminFirstname, setAdminFirstname] = useState("");
  const [adminLastname, setAdminLastname] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <main className="bg-blueGray-200">
      <div className="min-w-screen min-h-screen flex justify-center px-5 py-5">
        <div className="container px-10 sx-auto">
          <div className="max-w-580-px mx-auto max-w-[50%]"></div>
          <Box sx={{ width: "100%" }}>
            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};

                if (isStepSkipped(index)) {
                  stepProps.completed = false;
                }
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>

            {activeStep === steps.length - 3 ? (
              <React.Fragment>
                <div className="w-full md:w py-10 px-5 md:px-10">
                  <div>
                    <div className="flex -mx-3">
                      <div className="w-1/2 px-3 mb-5">
                        <label for="" className="text-xs font-semibold px-1">
                          Company Name
                        </label>
                        <div className="flex">
                          <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                            <i className="mdi mdi-account-outline text-gray-400 text-lg"></i>
                          </div>
                          <input
                            type="text"
                            className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                            placeholder="Manage-IT"
                            onChange={(e) => {
                              setCompanyName(e.target.value);
                            }}
                          />
                        </div>
                      </div>

                      <div className="w-1/2 px-3 mb-5">
                        <label for="" className="text-xs font-semibold px-1">
                          Company Email Address
                        </label>
                        <div className="flex">
                          <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                            <i className="mdi mdi-account-outline text-gray-400 text-lg"></i>
                          </div>
                          <input
                            type="text"
                            disabled
                            className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                            value={companyEmailAddress}
                          />
                        </div>
                      </div>

                      <div className="w-1/2 px-3 mb-5">
                        <label for="" className="text-xs font-semibold px-1">
                          Street Name
                        </label>
                        <div className="flex">
                          <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                            <i className="mdi mdi-account-outline text-gray-400 text-lg"></i>
                          </div>
                          <input
                            type="text"
                            className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                            placeholder="Freisinger Landstr."
                            onChange={(e) => {
                              setStreetName(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex -mx-3">
                        <div className="w-1/2 px-3 mb-5">
                          <label for="" className="text-xs font-semibold px-1">
                            House Number
                          </label>
                          <div className="flex">
                            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                              <i className="mdi mdi-email text-gray-400 text-lg"></i>
                            </div>
                            <input
                              type="text"
                              className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                              placeholder="86"
                              onChange={(e) => {
                                setHouseNumber(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                        <div className="w-1/2 px-3 mb-5">
                          <label for="" className="text-xs font-semibold px-1">
                            Postcode
                          </label>
                          <div className="flex">
                            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                              <i className="mdi mdi-account-outline text-gray-400 text-lg"></i>
                            </div>
                            <input
                              type="text"
                              className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                              placeholder="80939"
                              onChange={(e) => {
                                setPostcode(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex -mx-3">
                      <div className="w-full px-3 mb-12">
                        <label for="" className="text-xs font-semibold px-1">
                          City
                        </label>
                        <div className="flex">
                          <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                            <i className="mdi mdi-lock-outline text-gray-400 text-lg"></i>
                          </div>
                          <input
                            type="text"
                            className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                            placeholder="Munich"
                            onChange={(e) => {
                              setCity(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex -mx-3">
                      <div className="w-full px-3 mb-12">
                        <label for="" className="text-xs font-semibold px-1">
                          Country
                        </label>
                        <div className="flex">
                          <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                            <i className="mdi mdi-phone-outline text-gray-400 text-lg"></i>
                          </div>
                          <input
                            type="phone"
                            className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                            placeholder="Germany"
                            onChange={(e) => {
                              setCountry(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button>
                  <Box sx={{ flex: "1 1 auto" }} />

                  <Button onClick={handleNext}>
                    {activeStep === steps.length - 1 ? "Go to Login" : "Next"}
                  </Button>
                </Box>
              </React.Fragment>
            ) : (
              <div></div>
            )}

            {activeStep === steps.length - 2 ? (
              <React.Fragment>
                <div className="w-full md:w py-10 px-5 md:px-10">
                  <div>
                    <div className="flex -mx-3">
                      <div className="w-1/2 px-3 mb-5">
                        <label for="" className="text-xs font-semibold px-1">
                          Administrator First Name
                        </label>
                        <div className="flex">
                          <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                            <i className="mdi mdi-account-outline text-gray-400 text-lg"></i>
                          </div>
                          <input
                            type="text"
                            className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                            placeholder="Manage-IT"
                            onChange={(e) => {
                              setAdminFirstname(e.target.value);
                            }}
                          />
                        </div>
                      </div>

                      <div className="w-1/2 px-3 mb-5">
                        <label for="" className="text-xs font-semibold px-1">
                          Administrator Last Name
                        </label>
                        <div className="flex">
                          <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                            <i className="mdi mdi-account-outline text-gray-400 text-lg"></i>
                          </div>
                          <input
                            type="text"
                            className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                            placeholder="Manage-IT"
                            onChange={(e) => {
                              setAdminLastname(e.target.value);
                            }}
                          />
                        </div>
                      </div>

                      <div className="w-1/2 px-3 mb-5">
                        <label for="" className="text-xs font-semibold px-1">
                          Administrator Username
                        </label>
                        <div className="flex">
                          <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                            <i className="mdi mdi-account-outline text-gray-400 text-lg"></i>
                          </div>
                          <input
                            type="text"
                            className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                            placeholder="Freisinger Landstr."
                            onChange={(e) => {
                              setAdminUsername(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex -mx-3">
                        <div className="w-1/2 px-3 mb-5">
                          <label for="" className="text-xs font-semibold px-1">
                            Administrator Email
                          </label>
                          <div className="flex">
                            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                              <i className="mdi mdi-email text-gray-400 text-lg"></i>
                            </div>
                            <input
                              type="text"
                              className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                              placeholder="86"
                              disabled
                              value={adminEmail}
                            />
                          </div>
                        </div>
                        <div className="w-1/2 px-3 mb-5">
                          <label for="" className="text-xs font-semibold px-1">
                            Administrator Password
                          </label>
                          <div className="flex">
                            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                              <i className="mdi mdi-account-outline text-gray-400 text-lg"></i>
                            </div>
                            <input
                              type="password"
                              className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                              placeholder="******"
                              onChange={(e) => {
                                setAdminPassword(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="h-fit w-fit mt-3 ml-1">
                        <label>
                          <Input
                            accept="image/*"
                            id="contained-button-file"
                            type="file"
                            onChange={(e) => {
                              convertImage(e.target.files[0]);
                            }}
                          />
                          <Button variant="contained" component="span">
                            Add Profile Picture
                          </Button>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button>
                  <Box sx={{ flex: "1 1 auto" }} />

                  <Button onClick={handleNext}>
                    {activeStep === steps.length - 1 ? "Go to Login" : "Next"}
                  </Button>
                </Box>
              </React.Fragment>
            ) : (
              <div></div>
            )}

            {activeStep === steps.length - 1 ? (
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  All steps completed - make sure you have entered the right
                  information and submit your form
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Box sx={{ flex: "1 1 auto" }} />

                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button>
                  <Button
                    onClick={() => {
                      if (!adminUsername || !adminPassword) {
                        alert(
                          "Please enter at least your username and password to proceed"
                        );
                        return;
                      }
                      dispatch(
                        createCompanyAndUser({
                          companyName,
                          companyEmailAddress,
                          streetName,
                          houseNumber,
                          postcode,
                          city,
                          country,
                          adminFirstname,
                          adminLastname,
                          adminEmail,
                          adminUsername,
                          adminPassword,
                          image: convertedImageFile,
                        })
                      );
                      alert("Account created!");
                      goToPage("/");
                    }}
                  >
                    Submit Form
                  </Button>
                </Box>
              </React.Fragment>
            ) : (
              <div></div>
            )}
          </Box>
        </div>
      </div>
    </main>
  );
}
