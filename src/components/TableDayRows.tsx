import React, { Component, Fragment } from "react";
import { Table, TableBody, TableRow, TableCell } from "@material-ui/core";
import { getDayHours } from "../services/DateService";

export default class TableDayRows extends Component {
  render() {
    return (
      <Table>
        <TableBody>
          {getDayHours({
            startHour: { hour: 6, minutes: 0 },
            endHour: { hour: 20, minutes: 0 },
          }).map((hour) => {
            return (
              <Fragment key={hour}>
                <TableRow style={{ height: 36 }}>
                  <TableCell
                    style={{
                      padding: 0,
                      paddingLeft: 16,
                      paddingRight: 16,
                      borderRight: "1px solid rgba(224, 224, 224, 1)",
                    }}
                  ></TableCell>
                </TableRow>
                <TableRow style={{ height: 36 }}>
                  <TableCell
                    style={{
                      borderRight: "1px solid rgba(224, 224, 224, 1)",
                    }}
                  ></TableCell>
                </TableRow>
              </Fragment>
            );
          })}
        </TableBody>
      </Table>
    );
  }
}
