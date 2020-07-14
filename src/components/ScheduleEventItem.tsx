import React, { Component } from "react";
import { Box } from "@material-ui/core";
import { ScheduleEvent } from "../services/ScheduleEvent";
import {
  getFirstTimestampForDay,
  getLastTimeStamForDay,
} from "../services/DateService";
import { rowHeight } from "../assets/themes/cssConst";

interface Props {
  scheduleEvent: ScheduleEvent;
}

export default class ScheduleEventItem extends Component<Props> {
  topPosition: number;
  itemHeight: number;
  constructor(props: Readonly<Props>) {
    super(props);
    let firstPosition = this.getTimestampPosition(
      this.props.scheduleEvent.startTimestamp
    );
    let lastPosition = this.getTimestampPosition(
      this.props.scheduleEvent.endTimestamps
    );
    if (lastPosition <= firstPosition) {
      lastPosition =
        this.getTimestampPosition(
          getLastTimeStamForDay(this.props.scheduleEvent.startTimestamp)
        ) + rowHeight;
    }
    this.topPosition = firstPosition;
    this.itemHeight = lastPosition - firstPosition;
  }

  getTimestampPosition(timestamps: number): number {
    let firstTimestamp = getFirstTimestampForDay(timestamps);
    let timestampsDiff = timestamps - firstTimestamp;
    return 50 + (timestampsDiff / 1800000) * rowHeight; // 1800000 = 1 timestamps diff
  }

  render() {
    return (
      <Box
        style={{
          backgroundColor: this.props.scheduleEvent.color,
          width: "94%",
          marginLeft: "3%",
          marginRight: "3%",
        }}
        position="absolute"
        top={this.topPosition}
        height={this.itemHeight}
      >
        {this.props.scheduleEvent.title}
      </Box>
    );
  }
}
