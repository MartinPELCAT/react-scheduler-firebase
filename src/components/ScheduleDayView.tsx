import React, { Component } from "react";
import { RouteComponentProps } from "react-router";
import { Table, TableBody, TableRow, TableCell } from "@material-ui/core";
import TablesHoursColumn from "./TablesHoursColumn";
import TableDayColumn from "./TableDayColumn";
import { ContextEvent } from "../contexts/EventContext";
import { isSameDay } from "date-fns";
import { getDaysEvents } from "../services/ScheduleEvent";

interface Props {
  date: Date;
}

export default class ScheduleDayView extends Component<
  RouteComponentProps & Props
> {
  static contextType = ContextEvent;
  componentDidMount() {
    this.loadEvents();
  }

  componentDidUpdate(prevProps: Props) {
    if (!isSameDay(prevProps.date, this.props.date)) {
      this.loadEvents();
    }
  }

  loadEvents() {
    let { date } = this.props;
    getDaysEvents(date, date).then((events) => {
      this.context.setScheduleEvents && this.context.setScheduleEvents(events);
    });
  }
  render() {
    return (
      <Table>
        <TableBody>
          <TableRow>
            <TableCell width={100} style={{ padding: 0, minWidth: "100px" }}>
              <TablesHoursColumn />
            </TableCell>
            <TableCell style={{ padding: 0, minWidth: "200px" }}>
              <TableDayColumn date={this.props.date} />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }
}
//https://ej2.syncfusion.com/react/documentation/schedule/getting-started/
