import React, { Component } from "react";
import { RouteComponentProps } from "react-router";
import { Table, TableRow, TableCell, TableBody } from "@material-ui/core";
import TablesHoursColumn from "./TablesHoursColumn";
import TableDayColumn from "./TableDayColumn";

interface Props {
  dates: Date[];
}
export default class ScheduleWeekView extends Component<
  RouteComponentProps & Props
> {
  render() {
    return (
      <Table>
        <TableBody>
          <TableRow>
            <TableCell width={100} style={{ padding: 0, minWidth: "100px" }}>
              {/* Hours column */}
              <TablesHoursColumn />
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
