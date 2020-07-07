import React, { Component } from "react";
import { RouteComponentProps } from "react-router";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
} from "@material-ui/core";
import { getCurrentFullMonthDays } from "../services/DateService";

export default class ScheduleDayView extends Component<RouteComponentProps> {
  render() {
    console.log(getCurrentFullMonthDays());
    return (
      <TableContainer variant="outlined" component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="table-cell-hour" style={{ width: 85 }} />
              <TableCell>test</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell className="table-cell-hour">test</TableCell>
              <TableCell>test</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}
//https://ej2.syncfusion.com/react/documentation/schedule/getting-started/
