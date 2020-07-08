import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router";
import ScheduleDayView from "./ScheduleDayView";
import ScheduleWeekView from "./ScheduleWeekView";
import { Box } from "@material-ui/core";

export default class Schedule extends Component {
  render() {
    return (
      <Box padding={0}>
        <Switch>
          <Route path="/day" component={ScheduleDayView} />
          <Route path="/week" component={ScheduleWeekView} />
          <Route>
            <Redirect to="/day" />
          </Route>
        </Switch>
      </Box>
    );
  }
}
