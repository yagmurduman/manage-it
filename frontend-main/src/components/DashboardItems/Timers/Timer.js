import React, { Component } from "react";
import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { keyframes } from "@mui/system";

const blink = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const BlinkedBox = styled("div")({
  backgroundColor: "#8884d8",
  borderRadius: "50%",
  width: 10,
  height: 10,
  animation: `${blink} 1s linear infinite`,
});

export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  render() {
    return (
      <div
        style={{ display: "flex", justifyContent: "flex-end", marginTop: -20 }}
      >
        <Typography variant="p" fontWeight="bold" color="purple" align="left">
          Last Updated:{" "}
        </Typography>
        &nbsp;
        <Typography variant="p" fontWeight="bold" color="text" align="right">
          {this.state.date.toLocaleTimeString()}
        </Typography>
        &nbsp;
        <span style={{ marginTop: 6 }}>
          <BlinkedBox />
        </span>
      </div>
    );
  }
}
