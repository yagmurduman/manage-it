import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/features/userSlice";

const pages = [];

const logged_in_pages = [];

const settings_links = [
  { name: "Settings", link: "/settings" },
  { name: "Help & Support", link: "/helpsupport" },
];

const Navbar = () => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

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

          <div className="md:order-2">
            <Link
              to="/verification"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Register Your Company
            </Link>
          </div>

          <Box sx={{ flexGrow: 1, display: "flex" }}>
            {pages.map((page) => (
              <Link to={page.link} key={page.name}>
                <Button sx={{ my: 2, mx: 3, color: "black", display: "block" }}>
                  {page.name}
                </Button>
              </Link>
            ))}
            {user.username ? (
              logged_in_pages.map((page) => (
                <Link to={page.link} key={page.name}>
                  <Button
                    sx={{ my: 2, mx: 3, color: "black", display: "block" }}
                  >
                    {page.name}
                  </Button>
                </Link>
              ))
            ) : (
              <Link to="/login" key="Login">
                <Button sx={{ my: 2, mx: 3, color: "black", display: "block" }}>
                  Login
                </Button>
              </Link>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
