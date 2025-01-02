import {
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import ActionItemService from "../../services/ActionItemService";
import { Typography } from "@mui/material";

const renderColorfulLegendText = (value) => {
  return (
    <span style={{ color: "#631F87" }}>
      <Typography variant="button" fontWeight="bold">
        {value}
      </Typography>
    </span>
  );
};

const ProgressiveAreaChart = ({ aspect, title }) => {
  const [perMonthCompletedAIs, setPerMonthCompletedAIs] = useState({});
  const project = useSelector((state) => state.project);
  useEffect(() => {
    ActionItemService.retrieveProjectActionItems(project.selected_project).then(
      (action_items) => {
        // extract months
        const items = action_items.filter(
          (action_item) => action_item.status === "Completed"
        );
        const months = items.map((item) => {
          const date = new Date(parseInt(item.status_set_on));
          return date.getMonth() + 1; //Because 0 index
        });
        const count = {};
        for (let month = 1; month <= 12; month++) {
          count[month] = 0;
        }
        for (const element of months) {
          if (count[element]) {
            count[element] += 1;
          } else {
            count[element] = 1;
          }
        }
        setPerMonthCompletedAIs(count);
      }
    );
  }, [project.selected_project]);
  console.log("perMonthCompletedAIs", perMonthCompletedAIs);
  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" height={300} aspect={aspect}>
        <AreaChart
          width={300}
          height={250}
          data={[
            {
              name: "January",
              "# of Completed Action Items": perMonthCompletedAIs[1],
            },
            {
              name: "February",
              "# of Completed Action Items": perMonthCompletedAIs[2],
            },
            {
              name: "March",
              "# of Completed Action Items": perMonthCompletedAIs[3],
            },
            {
              name: "April",
              "# of Completed Action Items": perMonthCompletedAIs[4],
            },
            {
              name: "May",
              "# of Completed Action Items": perMonthCompletedAIs[5],
            },
            {
              name: "June",
              "# of Completed Action Items": perMonthCompletedAIs[6],
            },
            {
              name: "July",
              "# of Completed Action Items": perMonthCompletedAIs[7],
            },
            {
              name: "August",
              "# of Completed Action Items": perMonthCompletedAIs[8],
            },
            {
              name: "September",
              "# of Completed Action Items": perMonthCompletedAIs[9],
            },
            {
              name: "October",
              "# of Completed Action Items": perMonthCompletedAIs[10],
            },
            {
              name: "November",
              "# of Completed Action Items": perMonthCompletedAIs[11],
            },
            {
              name: "December",
              "# of Completed Action Items": perMonthCompletedAIs[12],
            },
          ]}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <Legend iconType="circle" formatter={renderColorfulLegendText} />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="# of Completed Action Items"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProgressiveAreaChart;
