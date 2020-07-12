import React, { Component } from "react";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from "@material-ui/core";
import { format, isToday } from "date-fns";
import { fr } from "date-fns/locale";
import { getDayTimestampsForRange } from "../services/DateService";

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
          <TableRow style={{ height: 50 }}>
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
            <TableRow key={timestamp} style={{ height: 36, padding: 0 }}>
              <TableCell
                className="clickable-row-schedule"
                onClick={this.handleRowClick}
                data-timestamp={timestamp}
                style={{
                  // padding: 0,
                  // paddingLeft: 16,
                  // paddingRight: 16,
                  borderRight: "1px solid rgba(224, 224, 224, 1)",
                }}
              ></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}
