import React from "react";
import { LinearGauge } from "reaviz";

import "./TableRow.css";

import Grid from "@mui/material/Grid";
import { PinDropSharp } from "@mui/icons-material";

export default function TableRow(props) {
  return (
    <Grid>
      <Grid container direction="row" justifyContent="space-between">
        <Grid item className="row-text">
          {/* Text text text */}
          {props.title} : {props.percent}%
        </Grid>
        <Grid item className="row-text tweet-param-count">
          {/* 70 */}
          {props.count}
        </Grid>
      </Grid>
      <LinearGauge
        height={10}
        width={300}
        data={{ key: props.title, data: props.percent }}
      />
    </Grid>
  );
}
