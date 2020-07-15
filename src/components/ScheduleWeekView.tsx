import React, { Component } from "react";
import { Table, TableRow, TableCell, TableBody } from "@material-ui/core";
import TablesHoursColumn from "./TablesHoursColumn";
import TableDayColumn from "./TableDayColumn";
import { getDaysEvents } from "../services/ScheduleEvent";
import { isSameDay } from "date-fns";
import { ContextEvent } from "../contexts/EventContext";

interface Props {
  dates: Date[];
}
export default class ScheduleWeekView extends Component<Props> {
  static contextType = ContextEvent;
  componentDidMount() {
    this.loadEvents();
  }

  componentDidUpdate(prevProps: Props) {
    if (!isSameDay(prevProps.dates[0], this.props.dates[0])) {
      this.loadEvents();
    }
  }

  loadEvents() {
    let { dates } = this.props;
    getDaysEvents(dates[0], dates[dates.length - 1]).then((events) => {
      this.context.setScheduleEvents && this.context.setScheduleEvents(events);
    });
  }

  render() {
    return (
      <Table>
        <TableBody>
          <TableRow>
            <TableCell width={100} style={{ padding: 0, minWidth: "100px" }}>
              <TablesHoursColumn /> {/* Hours column */}
            </TableCell>
            {this.props.dates.map((date) => (
              <TableCell
                key={date.getTime()}
                style={{ padding: 0, minWidth: "200px" }}
              >
                <TableDayColumn date={date} />
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    );
  }
}
