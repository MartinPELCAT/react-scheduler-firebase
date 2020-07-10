import React, { Component } from "react";
import { RouteComponentProps } from "react-router";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from "@material-ui/core";
import TablesHoursColumn from "./TablesHoursColumn";
import TableDayColumn from "./TableDayRows";
import { getTodayDate } from "../services/DateService";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export default class ScheduleDayView extends Component<RouteComponentProps> {
  render() {
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell
              style={{
                width: 85,
                borderRight: "1px solid rgba(224, 224, 224, 1)",
              }}
            />
            <TableCell>
              <Typography style={{ color: "#e3165b" }}>
                {format(getTodayDate(), "eeee dd MMMM", { locale: fr })}
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell style={{ width: 100, padding: 0 }}>
              <div>
                <TablesHoursColumn />
              </div>
            </TableCell>
            <TableCell style={{ padding: 0 }}>
              <div>
                <TableDayColumn date={getTodayDate()} />
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }
}
//https://ej2.syncfusion.com/react/documentation/schedule/getting-started/
