import React, { Component } from "react";
import { RouteComponentProps } from "react-router";
import { Table, TableBody, TableRow, TableCell } from "@material-ui/core";
import TablesHoursColumn from "./TablesHoursColumn";
import TableDayColumn from "./TableDayColumn";

interface Props {
  date: Date;
}

export default class ScheduleDayView extends Component<
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
            <TableCell style={{ padding: 0, minWidth: "200px" }}>
              {/*Days map on date props */}
              <TableDayColumn date={this.props.date} />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }
}
//https://ej2.syncfusion.com/react/documentation/schedule/getting-started/
