import React, { Component } from "react";
import { Box } from "@material-ui/core";
import { ScheduleEvent } from "../services/ScheduleEvent";
import {
  getFirstTimestampForDay,
  getLastTimestampForDay,
} from "../services/DateService";
import { rowHeight } from "../assets/themes/cssConst";
import { isSameDay } from "date-fns";

interface Props {
  scheduleEvent: ScheduleEvent;
  date: Date;
}

export default class ScheduleEventItem extends Component<Props> {
  topPosition: number;
  itemHeight: number;
  constructor(props: Readonly<Props>) {
    super(props);
    let firstPosition = this.getTimestampPosition(
      this.props.scheduleEvent.startTimestamp.toDate().getTime()
    );
    let lastPosition = this.getTimestampPosition(
      this.props.scheduleEvent.endTimestamps.toDate().getTime()
    );
    let isEndDateTommorow = !isSameDay(
      this.props.date,
      this.props.scheduleEvent.endTimestamps.toDate().getTime()
    );
    let isStartDateYesterday = !isSameDay(
      this.props.date,
      this.props.scheduleEvent.startTimestamp.toDate().getTime()
    );

    if (isEndDateTommorow) {
      lastPosition =
        this.getTimestampPosition(
          getLastTimestampForDay(this.props.date.getTime())
        ) + rowHeight;
    }

    if (isStartDateYesterday) {
      firstPosition = 50;
      lastPosition = this.getTimestampPosition(
        this.props.scheduleEvent.endTimestamps.toDate().getTime()
      );
    }
    this.topPosition = firstPosition;

    this.itemHeight = lastPosition - firstPosition;
    console.log(this.props.scheduleEvent);
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
          width: "100%",
        }}
        overflow="hidden"
        position="absolute"
        top={this.topPosition}
        height={this.itemHeight}
      >
        {this.props.scheduleEvent.title}
      </Box>
    );
  }
}
