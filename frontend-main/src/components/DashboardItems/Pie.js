import React from "react";
import { PieChart, Pie, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useEffect, useState, useRef } from "react";
import ActionItemService from "../../services/ActionItemService";
import { useSelector } from "react-redux";
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

export default function P() {
  const project = useSelector((state) => state.project);
  const [lowpriorityAI, setlowpriorityAI] = useState(1);
  const [mediumpriorityAI, setmediumpriorityAI] = useState(1);
  const [highpriorityAI, sethighpriorityAI] = useState(1);
  const [count, setCount] = useState(0);

  useEffect(() => {
    ActionItemService.retrieveProjectActionItems(project.selected_project).then(
      (action_items) => {
        sethighpriorityAI(
          action_items.filter((action_item) => action_item.priority == 1).length
        );
        setmediumpriorityAI(
          action_items.filter((action_item) => action_item.priority == 2).length
        );
        setlowpriorityAI(
          action_items.filter((action_item) => action_item.priority == 3).length
        );
        setCount(action_items.length);
      }
    );
  }, [project.selected_project]);
  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart width={600} height={500}>
        {count > 0 && (
          <Pie
            dataKey="value"
            isAnimationActive={true}
            data={[
              {
                name: "# of High Priority Action Items",
                value: highpriorityAI,
                fill: "#962478",
              },
              {
                name: "# of Low Priority Action Items",
                value: lowpriorityAI,
                fill: "#ada423",
              },
              {
                name: "# of Medium Priority Action Items",
                value: mediumpriorityAI,
                fill: "#2a5873",
              },
            ]}
            cx="50%"
            cy="50%"
            outerRadius={120}
          />
        )}
        {count === 0 && (
          <Pie
            dataKey="value"
            isAnimationActive={true}
            data={[{ name: "No Action Items Available", value: 1 }]}
            cx="50%"
            cy="50%"
            outerRadius={120}
            fill="#8884d8"
          />
        )}
        <Legend iconType="circle" formatter={renderColorfulLegendText} />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
