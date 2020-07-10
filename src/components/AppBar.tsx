import React, { Component } from "react";
import {
  AppBar as Bar,
  Toolbar,
  Typography,
  IconButton,
} from "@material-ui/core";
import { PowerSettingsNew } from "@material-ui/icons";
import { auth } from "firebase/app";
import { Link } from "react-router-dom";

export default class AppBar extends Component {
  constructor(props: Readonly<{}>) {
    super(props);
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  handleLogOut() {
    auth()
      .signOut()
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    return (
      <>
        <Bar>
          <Toolbar>
            <div style={{ flexGrow: 1 }}>
              <Typography
                to="/"
                variant="h5"
                style={{ color: "#fff" }}
                component={Link}
              >
                Schedule
              </Typography>
            </div>
            <IconButton aria-label="Disconnect" onClick={this.handleLogOut}>
              <PowerSettingsNew style={{ color: "#fff" }} />
            </IconButton>
          </Toolbar>
        </Bar>
        <Toolbar />
      </>
    );
  }
}
