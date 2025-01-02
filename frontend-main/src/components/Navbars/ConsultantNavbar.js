import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import NativeSelect from "@mui/material/NativeSelect";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/features/userSlice";
import UserService from "../../services/UserService";
const logged_in_pages = [];

const settings_links = [];

const ConsultantNavbar = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [image, setImage] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const goToPage = (link) => {
    navigate(link);
  };

  useEffect(() => {
    UserService.get_user_image(user.user_id).then((image_data) => {
      setImage(image_data.image);
    });
  }, []);

  return (
    <AppBar position="sticky" color="default">
      <Container maxWidth="xl" className="bg-opacity-50 bg-slate-100">
        <Toolbar disableGutters>
          <Link to="/" className="flex items-center">
            <img
              src={require("../../assets/img/logo_transparent.png")}
              className="mr-4 h-11"
              alt="ManageIT Logo"
            />
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              ManageIT
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 10, display: "flex" }}>
            <div className="flex items-center ml-80">
              <h2 className="mr-4 font-semibold text-lg"></h2>
            </div>
          </Box>
          <Box sx={{ flexGrow: 0, display: "flex" }}>
            {user.username ? (
              <Box sx={{ flexGrow: 0 }} className="items-center content-center">
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={user.username} src={image} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings_links.map((setting) => (
                    <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                      <Link to={setting.link}>
                        <Typography textAlign="center">
                          {setting.name}
                        </Typography>
                      </Link>
                    </MenuItem>
                  ))}
                  {
                    <MenuItem
                      key="logout"
                      onClick={() => {
                        handleCloseUserMenu();
                        goToPage("/");
                        dispatch(logout());
                      }}
                    >
                      <h2>Logout</h2>
                    </MenuItem>
                  }
                </Menu>
                <h2 className="font-semibold">Welcome, {user.first_name}!</h2>
              </Box>
            ) : (
              <></>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ConsultantNavbar;
