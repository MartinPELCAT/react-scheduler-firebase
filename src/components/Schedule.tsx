import React, { Component } from "react";
import { Route, Switch, Redirect, RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import ScheduleDayView from "./ScheduleDayView";
import ScheduleWeekView from "./ScheduleWeekView";
import { Box, Grid, Paper, IconButton } from "@material-ui/core";
import "../assets/css/schedule.css";
import {
  getTodayDate,
  getDateFromString,
  getWeekDaysOfDate,
  DATEFORMAT,
  formatDate,
} from "../services/DateService";
import { ArrowLeft, ArrowRight } from "@material-ui/icons";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { addDays, subDays, isValid } from "date-fns";

interface States {
  date: Date;
  pickerOpened: boolean;
}
export default class Schedule extends Component<RouteComponentProps, States> {
  constructor(props: Readonly<RouteComponentProps>) {
    super(props);
    this.state = {
      date: getTodayDate(),
      pickerOpened: false,
    };
    this.getNextDate = this.getNextDate.bind(this);
    this.getPrevDate = this.getPrevDate.bind(this);
  }
  componentDidMount() {
    this.getDateFromUrl();
  }

  componentDidUpdate(prevProps: Readonly<RouteComponentProps>) {
    if (
      this.props.location.pathname !== prevProps.location.pathname ||
      this.props.location.search !== prevProps.location.search
    ) {
      this.getDateFromUrl();
    }
  }

  getDateFromUrl() {
    if (
      !!!isValid(
        getDateFromString(
          new URLSearchParams(this.props.location.search)?.get("date")
        )
      )
    ) {
      this.setState({ date: new Date() });
      this.props.history.push(this.props.location.pathname);
    } else {
      this.setState({
        date:
          getDateFromString(
            new URLSearchParams(this.props.location.search)?.get("date") || null
          ) || this.state.date,
      });
    }
  }

  getNextDate = () => {
    this.props.history.push(
      `${this.props.location.pathname}?date=${formatDate(
        addDays(
          this.state.date,
          this.props.location.pathname === "/day" ? 1 : 7
        )
      )}`
    );
  };

  getPrevDate = () => {
    this.props.history.push(
      `${this.props.location.pathname}?date=${formatDate(
        subDays(
          this.state.date,
          this.props.location.pathname === "/day" ? 1 : 7
        )
      )}`
    );
  };

  render() {
    return (
      <Box padding={0}>
        <Grid container component={Paper}>
          <IconButton size="small" onClick={this.getPrevDate}>
            <ArrowLeft />
          </IconButton>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              disableToolbar
              variant="inline"
              format={DATEFORMAT}
              value={this.state.date}
              open={this.state.pickerOpened}
              onOpen={() => this.setState({ pickerOpened: true })}
              onClose={() => this.setState({ pickerOpened: false })}
              onChange={(date) => {
                this.props.history.push(
                  `${this.props.location.pathname}?date=${formatDate(date!)}`
                );
                this.setState({
                  pickerOpened: false,
                });
              }}
            />
          </MuiPickersUtilsProvider>
          <IconButton size="small" onClick={this.getNextDate}>
            <ArrowRight />
          </IconButton>
          <Box padding={1}>
            <Grid item md={12}>
              <Link to={`/day${this.props.location.search}`}>DAY</Link>
              <Link to={`/week${this.props.location.search}`}>WEEK</Link>
            </Grid>
          </Box>
        </Grid>
        <Grid container>
          <Switch>
            <Route path="/day">
              <ScheduleDayView {...this.props} date={this.state.date} />
            </Route>
            <Route path="/week">
              <ScheduleWeekView
                {...this.props}
                dates={getWeekDaysOfDate(this.state.date)}
              />
            </Route>
            <Route>
              <Redirect to="/day" />
            </Route>
          </Switch>
        </Grid>
      </Box>
    );
  }
}
