import React, { Component } from "react";
import AppBar from "../components/AppBar";
import Schedule from "../components/Schedule";
import { RouteComponentProps } from "react-router";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { fr } from "date-fns/locale";

export default class SchedulePage extends Component<RouteComponentProps> {
  render() {
    return (
      <>
        <AppBar />
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={fr}>
          <Schedule {...this.props} />
        </MuiPickersUtilsProvider>
      </>
    );
  }
}
