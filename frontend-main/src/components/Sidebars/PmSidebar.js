import React, { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import ListSubheader from "@mui/material/ListSubheader";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import SettingsIcon from "@mui/icons-material/Settings";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";
import LogoutIcon from "@mui/icons-material/Logout";
import WysiwygIcon from "@mui/icons-material/Wysiwyg";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import Grid from "@mui/material/Grid";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/features/userSlice";
import { select_project } from "../../redux/features/projectSlice";
import EditIcon from "@mui/icons-material/Edit";
import InputLabel from "@mui/material/InputLabel";
import NativeSelect from "@mui/material/NativeSelect";
import Select from "@mui/material/Select";
import ProjectService from "../../services/ProjectService";
import UserService from "../../services/UserService";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["marginƒ", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const settings_links = [
  { name: "Settings", link: "/settings" },
  { name: "Help & Support", link: "/helpsupport" },
];

export default function PersistentDrawerLeft({ contents }) {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [listOpen, setListOpen] = useState(true);
  const [projects, setProjects] = useState([]);
  const user = useSelector((state) => state.user);
  const project = useSelector((state) => state.project);
  const dispatch = useDispatch();
  const [profilePic, setProfilePic] = useState("");
  const navigate = useNavigate();
  const goToPage = (link) => {
    navigate(link);
  };

  useEffect(() => {
    ProjectService.get_projects().then((projects) => {
      console.log("retrieved projects", projects);
      setProjects(projects);
      let is_PM = projects[0].project_managers.includes(user.user_id);
      if (!project.selected_project) {
        dispatch(
          select_project({
            selected_project: projects[0]._id,
            is_PM,
          })
        );
      }
    });
    UserService.get_user_image(user.user_id).then((data) => {
      setProfilePic(data.image);
    });
  }, []);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open} color="default">
          <Container maxWidth="xl" className="bg-opacity-50 bg-slate-100">
            <Toolbar disableGutters>
              {!open ? (
                <div
                  className="flex items-left mr-4"
                  onClick={handleDrawerOpen}
                >
                  <button className="flex">
                    <MenuIcon />
                  </button>
                </div>
              ) : (
                <></>
              )}
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
                    display: { xs: "none", md: "flex" },
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  {user.company_name}
                </Typography>
              </Link>

              <Box sx={{ flexGrow: 1, display: "flex" }}>
                <div className="flex items-center ml-80">
                  <h2 className="mr-4 font-semibold text-lg">
                    Select a project:
                  </h2>
                  <Select
                    sx={{ maxHeight: 30 }}
                    label="Select a project:"
                    value={project.selected_project}
                    variant="standard"
                    onChange={(e) => {
                      let is_PM = projects
                        .filter((project) => project._id === e.target.value)
                        .map((project) => project.project_managers)[0]
                        .includes(user.user_id);
                      dispatch(
                        select_project({
                          selected_project: e.target.value,
                          is_PM,
                        })
                      );
                    }}
                  >
                    {projects.length ? (
                      projects.map((project, idx) => (
                        <MenuItem
                          key={idx}
                          value={project._id}
                          managers={project.project_managers}
                        >
                          {project.title}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem>No projects found...</MenuItem>
                    )}
                  </Select>
                </div>
              </Box>

              {user.username ? (
                <Box
                  sx={{ flexGrow: 0 }}
                  className="items-center content-center"
                >
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt={user.first_name} src={profilePic} />
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
                      <MenuItem
                        key={setting.name}
                        onClick={handleCloseUserMenu}
                      >
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
            </Toolbar>
          </Container>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Options
              </ListSubheader>
            }
          >
            {user.rights == "Administrator" ? (
              <div>
                <ListItemButton component={Link} to="/createproject">
                  <ListItemIcon>
                    <AddCircleOutlineIcon />
                  </ListItemIcon>
                  <ListItemText primary="Create New Project" />
                </ListItemButton>
                <Divider></Divider>
              </div>
            ) : (
              <></>
            )}

            {user.rights == "Administrator" && project.selected_project ? (
              <div>
                <ListItemButton component={Link} to={`/editproject`}>
                  <ListItemIcon>
                    <EditIcon />
                  </ListItemIcon>
                  <ListItemText primary="Edit Project" />
                </ListItemButton>

                <Divider></Divider>
              </div>
            ) : (
              <></>
            )}

            {user.rights == "Administrator" || project.is_PM ? (
              <div>
                <ListItemButton component={Link} to="/addemployee">
                  <ListItemIcon>
                    <AddCircleOutlineIcon />
                  </ListItemIcon>
                  <ListItemText primary="Manage Employees" />
                </ListItemButton>

                <Divider></Divider>
              </div>
            ) : (
              <></>
            )}

            <ListItemButton component={Link} to="/backlog">
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Backlog" />
            </ListItemButton>

            <Divider></Divider>

            <ListItemButton component={Link} to="/actionitem">
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Action Items" />
            </ListItemButton>

            <Divider></Divider>

            {project.is_PM ? (
              <div>
                <ListItemButton component={Link} to="/consultants">
                  <ListItemIcon>
                    <CalendarMonthIcon />
                  </ListItemIcon>
                  <ListItemText primary="Book Professional Consultation" />
                </ListItemButton>
              </div>
            ) : (
              <></>
            )}

            {project.is_PM ? (
              <div>
                <ListItemButton component={Link} to="/consultancybookingview">
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText primary="Manage Bookings" />
                </ListItemButton>

                <Divider></Divider>
              </div>
            ) : (
              <></>
            )}
          </List>
        </Drawer>
        <Main open={open}>
          <DrawerHeader />
          {contents}
        </Main>
      </Box>
    </div>
  );
}
