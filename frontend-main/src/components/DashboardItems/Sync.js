import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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

export default function Sync() {
  const project = useSelector((state) => state.project);
  const [deferredAIs, setDeferredAIs] = useState({});
  const [notStartedAIs, setNotStartedAIs] = useState({});

  const getMonthlyStats = (arr) => {
    const month_stats = arr.map((item) => {
      const date = new Date(parseInt(item.status_set_on));
      return date.getMonth() + 1; //Because 0 index
    });
    const count = {};
    for (let month = 1; month <= 12; month++) {
      count[month] = 0;
    }
    for (const element of month_stats) {
      if (count[element]) {
        count[element] += 1;
      } else {
        count[element] = 1;
      }
    }
    return count;
  };

  const monthStats = (idx) => {
    return {
      "# of Deferred Action Items": deferredAIs[idx],
      "# of Not Started Action Items": notStartedAIs[idx],
    };
  };

  const data = [
    {
      name: "January",
      stats: monthStats(1),
    },
    {
      name: "February",
      stats: monthStats(2),
    },
    {
      name: "March",
      stats: monthStats(3),
    },
    {
      name: "April",
      stats: monthStats(4),
    },
    {
      name: "May",
      stats: monthStats(5),
    },
    {
      name: "June",
      stats: monthStats(6),
    },
    {
      name: "July",
      stats: monthStats(7),
    },
    {
      name: "August",
      stats: monthStats(8),
    },
    {
      name: "September",
      stats: monthStats(9),
    },
    {
      name: "October",
      stats: monthStats(10),
    },
    {
      name: "November",
      stats: monthStats(11),
    },
    {
      name: "December",
      stats: monthStats(12),
    },
  ];

  useEffect(() => {
    ActionItemService.retrieveProjectActionItems(project.selected_project).then(
      (action_items) => {
        const deferred_items = action_items.filter(
          (action_item) => action_item.status === "Deferred"
        );
        setDeferredAIs(getMonthlyStats(deferred_items));
        const not_started_items = action_items.filter(
          (action_item) => action_item.status === "Not Started"
        );
        setNotStartedAIs(getMonthlyStats(not_started_items));
      }
    );
  }, [project.selected_project]);
  return (
    <div>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart
          width={500}
          height={200}
          data={data}
          syncId="anyId"
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Legend
            iconType="circle"
            formatter={renderColorfulLegendText}
            color="#FF0C0C"
            fill="#FF0C0C"
          />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="stats.# of Deferred Action Items"
            stroke="#FF0C0C"
            fill="#FF0C0C"
            name="# of Deferred Action Items"
          />
        </AreaChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height={200}>
        <AreaChart
          width={500}
          height={200}
          data={data}
          syncId="anyId"
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Legend iconType="circle" formatter={renderColorfulLegendText} />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="stats.# of Not Started Action Items"
            stroke="#2986cc"
            fill="#2986cc"
            name="# of Not Started Action Items"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
