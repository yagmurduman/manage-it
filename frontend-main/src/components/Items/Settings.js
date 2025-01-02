import { ConstructionRounded } from "@mui/icons-material";
import "react-datepicker/dist/react-datepicker.css";
import Divider from "@mui/material/Divider";
import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Convert } from "mongo-image-converter";
import EmployeeService from "../../services/EmployeeService";
import { useSelector } from "react-redux";
import UserService from "../../services/UserService";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const Input = styled("input")({
  display: "none",
});

export default function Settings() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("*********");
  const [email, setEmail] = useState("");
  const user = useSelector((state) => state.user);
  const [reloadInfo, setReloadInfo] = useState.apply(true);
  const navigate = useNavigate();
  const goToPage = (link) => {
    navigate(link);
  };

  const handleSubmit = async () => {
    await EmployeeService.update_a_user(user.user_id, {
      username,
      password,
      email,
      image: convertedImageFile,
    });
    setReloadInfo(!reloadInfo);
    alert("Employee Information has been updated!");
  };

  useEffect(() => {
    UserService.getCurrentUser(user.user_id).then((data) => {
      setUsername(data.username);
      setEmail(data.email);
    });
  }, [reloadInfo]);

  const [convertedImageFile, setConvertedImageFile] = useState("");
  const [imageFileName, setImageFileName] = useState("");

  const convertImage = async (imageFile) => {
    try {
      const convertedImage = await Convert(imageFile);
      if (!convertedImage) {
        alert("The file is not in format of image/jpeg or image/png");
      } else {
        console.log(convertedImage);
        setConvertedImageFile(convertedImage);
      }
    } catch (error) {
      console.warn(error.message);
    }
  };

  return (
    <main className="bg-blueGray-200">
      <div className="min-w-screen min-h-screen flex items-center justify-center px-5 py-5">
        <div className="container px-10 sx-auto">
          <div className="max-w-580-px mx-auto max-w-[50%]">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold mb-2 text-blueGray-700">
                User Settings
              </h2>
            </div>
            <div className="container justify-center items-center flex-col mx-auto px-4w-2/4">
              <div className="mb-6 w-full">
                <TextField
                  fullWidth
                  placeholder="Change Your Username"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                />
              </div>
              <div className="mb-6 w-full">
                <TextField
                  placeholder="Change Your Password"
                  fullWidth
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </div>
              <div className="mb-6 w-full">
                <TextField
                  placeholder="Change Your E-mail Address"
                  fullWidth
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
              <div className="mb-6 w-full">
                <label className="flex">
                  <Input
                    accept="image/*"
                    type="file"
                    onChange={(e) => {
                      convertImage(e.target.files[0]);
                      setImageFileName(e.target.value.replace(/^.*[\\\/]/, ""));
                    }}
                  />
                  <Button variant="contained" component="span">
                    Upload a Profile Picture
                  </Button>
                  {convertedImageFile ? (
                    <h2 className="mt-2 ml-3">{imageFileName}</h2>
                  ) : (
                    <h2 className="mt-2 ml-3">No image uploaded</h2>
                  )}
                </label>
              </div>
              <Divider></Divider>
              <div className="flex flex-wrap -mx-4 mb-6 items-center justify-between"></div>
              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
                <Link to="/">
                  <Button variant="outlined" color="secondary">
                    Cancel
                  </Button>
                </Link>
              </Stack>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
