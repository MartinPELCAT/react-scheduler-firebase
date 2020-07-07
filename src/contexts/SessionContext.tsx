import React, { Component, createContext } from "react";
import { auth } from "firebase/app";
import { Backdrop, CircularProgress } from "@material-ui/core";

interface ISessionContext {
  user: firebase.User | null;
}
export const ContextSession = createContext<ISessionContext>({ user: null });

interface SessionContextStates {
  user: firebase.User | null;
  logging: boolean;
}

export default class SessionContext extends Component<
  {},
  SessionContextStates
> {
  constructor(props: Readonly<{}>) {
    super(props);
    this.state = { user: null, logging: true };
    this.listenConnectedUser = this.listenConnectedUser.bind(this);
    this.listenConnectedUser();
  }

  listenConnectedUser() {
    auth().onAuthStateChanged((user) => {
      this.setState({ user, logging: false });
    });
  }

  render() {
    if (this.state.logging) {
      return (
        <Backdrop open={this.state.logging}>
          <CircularProgress color="inherit" />
        </Backdrop>
      );
    }
    return (
      <ContextSession.Provider
        value={{
          user: this.state.user,
        }}
      >
        {this.props.children}
      </ContextSession.Provider>
    );
  }
}
