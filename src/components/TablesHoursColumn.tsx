import React, { Component, Fragment } from "react";
import { getDayHours } from "../services/DateService";
import {
  TableCell,
  TableRow,
  Typography,
  Table,
  TableBody,
} from "@material-ui/core";

export default class TablesHoursColumn extends Component {
  render() {
    return (
      <Table>
        <TableBody>
          <TableRow style={{ height: 50 }}>
            <TableCell
              style={{
                padding: 0,
                paddingLeft: 16,
                paddingRight: 16,
                borderRight: "1px solid rgba(224, 224, 224, 1)",
              }}
            ></TableCell>
          </TableRow>
          {getDayHours(new Date()).map(({ hour }) => {
            return (
              <Fragment key={hour}>
                <TableRow style={{ height: 36 }}>
                  <TableCell
                    style={{
                      padding: 0,
                      paddingLeft: 16,
                      paddingRight: 16,
                      borderBottom: "none",
                      borderRight: "1px solid rgba(224, 224, 224, 1)",
                    }}
                  >
                    <Typography variant="body1" display="block" align="center">
                      {hour}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow style={{ height: 36 }}>
                  <TableCell
                    style={{
                      borderRight: "1px solid rgba(224, 224, 224, 1)",
                    }}
                  >
                    <Typography variant="body2" display="block"></Typography>
                  </TableCell>
                </TableRow>
              </Fragment>
            );
          })}
        </TableBody>
      </Table>
    );
  }
}
