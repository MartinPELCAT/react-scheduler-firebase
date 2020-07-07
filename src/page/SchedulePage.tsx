import React, { Component } from "react";
import AppBar from "../components/AppBar";
import Schedule from "../components/Schedule";
import { RouteComponentProps } from "react-router";

export default class SchedulePage extends Component<RouteComponentProps> {
  render() {
    return (
      <>
        <AppBar />
        <Schedule {...this.props} />
      </>
    );
  }
}
