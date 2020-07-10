import React, { Component, Fragment } from "react";
import { Table, TableBody, TableRow, TableCell } from "@material-ui/core";
import { getDayHours } from "../services/DateService";
import { addMinutes } from "date-fns";

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
      <Table>
        <TableBody>
          {getDayHours({
            date: this.props.date,
            startHour: { hour: 6, minutes: 0 },
            endHour: { hour: 20, minutes: 0 },
          }).map(({ date }) => {
            return (
              <Fragment key={date.getTime()}>
                <TableRow style={{ height: 36, padding: 0 }}>
                  <TableCell
                    className="clickable-row-schedule"
                    onClick={this.handleRowClick}
                    data-timestamp={date.getTime()}
                    style={{
                      padding: 0,
                      paddingLeft: 16,
                      paddingRight: 16,
                      borderRight: "1px solid rgba(224, 224, 224, 1)",
                    }}
                  ></TableCell>
                </TableRow>
                <TableRow style={{ height: 36, padding: 0 }}>
                  <TableCell
                    className="clickable-row-schedule"
                    onClick={this.handleRowClick}
                    data-timestamp={addMinutes(date, 30).getTime()}
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
