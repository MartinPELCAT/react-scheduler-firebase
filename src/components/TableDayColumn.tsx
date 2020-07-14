import React, { Component } from "react";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from "@material-ui/core";
import { format, isToday, addMinutes } from "date-fns";
import { fr } from "date-fns/locale";
import { getDayTimestampsForRange } from "../services/DateService";
import ScheduleEventItem from "./ScheduleEventItem";
import { headerHeight, rowHeight } from "../assets/themes/cssConst";

interface Props {
  date: Date;
}

export default class TableDayColumn extends Component<Props> {
  handleRowClick = (
    e: React.MouseEvent<HTMLTableHeaderCellElement, MouseEvent>
  ) => {
    console.log(e.currentTarget.dataset.timestamp);
  };

  render() {
    return (
      <div style={{ position: "relative" }}>
        <Table>
          <TableBody>
            <TableRow style={{ height: headerHeight }}>
              <TableCell
                style={{
                  padding: 0,
                  paddingLeft: 16,
                  paddingRight: 16,
                  borderRight: "1px solid rgba(224, 224, 224, 1)",
                }}
              >
                {isToday(this.props.date) ? (
                  <Typography style={{ color: "#e3165b" }}>
                    {format(this.props.date, "eeee dd MMMM", { locale: fr })}
                  </Typography>
                ) : (
                  <Typography>
                    {format(this.props.date, "eeee dd MMMM", { locale: fr })}
                  </Typography>
                )}
              </TableCell>
            </TableRow>
            {getDayTimestampsForRange(this.props.date).map((timestamp) => (
              <TableRow
                key={timestamp}
                style={{ height: rowHeight, padding: 0 }}
              >
                <TableCell
                  className="clickable-row-schedule"
                  onClick={this.handleRowClick}
                  data-timestamp={timestamp}
                  style={{
                    borderRight: "1px solid rgba(224, 224, 224, 1)",
                  }}
                ></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* display events with position absolute */}
        <ScheduleEventItem
          scheduleEvent={{
            startTimestamp: new Date().getTime(),
            title: "Test title",
            reccurent: false,
            color: "violet",
            endTimestamps: addMinutes(new Date(), 300).getTime(),
          }}
        />
      </div>
    );
  }
}
