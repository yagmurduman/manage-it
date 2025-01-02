import React from "react";
import Sync from "./DashboardItems/Sync";
import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Footer from "./Footers/Footer";
import P from "./DashboardItems/Pie";
import CardStatistics from "./DashboardItems/CardStatistics";
import { Box } from "@mui/material";
import ProgressiveAreaChart from "./DashboardItems/ProgressiveAreaChart";
import OrganizationalChart from "./DashboardItems/OrganizationalChart";
import Timer from "./DashboardItems/Timers/Timer";
import DynamicTimer from "./DashboardItems/Timers/DynamicTimer";
import { useEffect, useState } from "react";
import BacklogService from "../services/BacklogService";
import ActionItemService from "../services/ActionItemService";
import ProjectService from "../services/ProjectService";
import { useSelector } from "react-redux";
import Typography from "@mui/material/Typography";

const Item = styled(Paper)(({ theme }) => ({
  textAlign: "center",
  borderColor: "#8884d8",
}));

export default function HomePm() {
  const project = useSelector((state) => state.project);
  const user = useSelector((state) => state.user);

  const [backlogCount, setBacklogCount] = useState(0);
  const [inProgressAIs, setinProgressAICount] = useState(0);
  const [notStartedAIs, setnotStartedAICount] = useState(0);
  const [completedAIs, setcompletedAICount] = useState(0);
  const [deferredAIs, setdeferredAICount] = useState(0);
  const [projectName, setProjectName] = useState("");

  useEffect(() => {
    ProjectService.read_a_project(project.selected_project).then(
      (projectData) => {
        setProjectName(projectData.title);
      }
    );

    BacklogService.retrieveProjectBacklogs(project.selected_project).then(
      (backlogs) => {
        setBacklogCount(backlogs.length);
      }
    );
    ActionItemService.retrieveProjectActionItems(project.selected_project).then(
      (action_items) => {
        console.log(action_items);
        const inProgressAI = action_items.filter(
          (action_item) => action_item.status === "In Progress"
        );
        const notStartedAI = action_items.filter(
          (action_item) => action_item.status === "Not Started"
        );
        const completedAI = action_items.filter(
          (action_item) => action_item.status === "Completed"
        );
        const deferredAI = action_items.filter(
          (action_item) => action_item.status === "Deferred"
        );
        setinProgressAICount(inProgressAI.length);
        setnotStartedAICount(notStartedAI.length);
        setcompletedAICount(completedAI.length);
        setdeferredAICount(deferredAI.length);
      }
    );
  }, [project.selected_project]);

  return (
    <div>
      <Box sx={{ flexGrow: 1, margin: 5 }}>
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          <span className="block text-indigo-600">
            Welcome, {user.first_name}!
          </span>
        </h2>
        <Timer />
        <br />
        <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
          <span>
            Here is what is going on with{" "}
            <Typography variant="p" color="purple" fontWeight="bold">
              {projectName}
            </Typography>
          </span>
        </h2>
      </Box>
      <Box sx={{ flexGrow: 1, margin: 5 }}>
        <br />
        <Grid container spacing={3}>
          <Grid item xs>
            <Item elevation={0}>
              <CardStatistics
                title="IN PROGRESS"
                count={inProgressAIs}
                percentage={{
                  label: "# of Action Items",
                }}
              />
            </Item>
          </Grid>
          <Grid item xs>
            <Item elevation={0}>
              <CardStatistics
                title="COMPLETED"
                count={completedAIs}
                percentage={{
                  label: "# of Action Items",
                }}
              />
            </Item>
          </Grid>
          <Grid item xs>
            <Item elevation={0}>
              <CardStatistics
                title="NOT STARTED"
                count={notStartedAIs}
                percentage={{
                  label: "# of Action Items",
                }}
              />
            </Item>
          </Grid>
          <Grid item xs>
            <Item elevation={0}>
              <CardStatistics
                title="DEFERRED"
                count={deferredAIs}
                percentage={{
                  label: "# of Action Items",
                }}
              />
            </Item>
          </Grid>
          <Grid item xs>
            <Item elevation={0}>
              <CardStatistics
                title="BACKLOGS"
                count={backlogCount}
                percentage={{
                  label: "# of Backlogs",
                }}
              />
            </Item>
          </Grid>
        </Grid>
      </Box>
      <Grid container margin={-2.5}>
        <Grid item xs marginLeft={7.5}>
          <Paper
            variant="outlined"
            sx={{ p: "50px", borderRadius: "20px", borderColor: "#8884d8" }}
          >
            <ProgressiveAreaChart></ProgressiveAreaChart>
          </Paper>
        </Grid>
      </Grid>
      <Box display="flex" justifyContent="space-between">
        <Grid container spacing={2} columns={16} margin={2.5}>
          <Grid item xs={8}>
            <Item elevation={0}>
              <Paper
                variant="outlined"
                sx={{ p: "50px", borderRadius: "20px", borderColor: "#8884d8" }}
              >
                <Sync></Sync>
              </Paper>
            </Item>
          </Grid>
          <Grid item xs={8}>
            <Item elevation={0}>
              <Paper
                variant="outlined"
                sx={{ p: "50px", borderRadius: "20px", borderColor: "#8884d8" }}
              >
                <P></P>
              </Paper>
            </Item>
          </Grid>
        </Grid>
      </Box>
      <Grid>
        <Grid item xs marginTop={5}>
          <OrganizationalChart></OrganizationalChart>
        </Grid>
      </Grid>
      <div style={{ margin: 90 }}></div>
      <Footer></Footer>
    </div>
  );
}
