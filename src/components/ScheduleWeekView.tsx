import React, { Component } from "react";
import { RouteComponentProps } from "react-router";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  TableBody,
} from "@material-ui/core";
import { format } from "date-fns";
import { getCurrentWeekDays } from "../services/DateService";
import { fr } from "date-fns/locale";
import TablesHoursColumn from "./TablesHoursColumn";
import TableDayColumn from "./TableDayRows";

export default class ScheduleWeekView extends Component<RouteComponentProps> {
  render() {
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell
              style={
                {
                  // width: 85,
                }
              }
            />
            <TableCell style={{ padding: 0 }}>
              <div>
                <Table>
                  <TableBody>
                    <TableRow>
                      {getCurrentWeekDays().map((day) => (
                        <TableCell
                          key={day.getTime()}
                          style={{
                            padding: 0,
                            borderBottom: "none",
                            width: "calc(100% / 7)",
                          }}
                        >
                          <Typography
                            align="center"
                            style={{ color: "#e3165b" }}
                          >
                            {format(day, "eeee dd MMMM", { locale: fr })}
                          </Typography>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
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
                <Table>
                  <TableBody>
                    <TableRow>
                      {getCurrentWeekDays().map((day) => (
                        <TableCell key={day.getTime()} style={{ padding: 0 }}>
                          <TableDayColumn date={day} />
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }
}
