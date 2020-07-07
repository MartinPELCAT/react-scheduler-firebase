import React, { Component, Suspense, lazy } from "react";
import { initializeApp, apps, User } from "firebase/app";
import "firebase/auth";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { CircularProgress, Backdrop } from "@material-ui/core";
import ProtectedRoute from "./components/ProtectedRoute";
import SessionContext from "./contexts/SessionContext";
import ThemeContext from "./contexts/ThemeContext";
import { firebaseConfig } from "./config/firebase-credentials";

const LoginPage = lazy(() => import("./page/LoginPage"));
const SchedulePage = lazy(() => import("./page/SchedulePage"));

interface AppState {
  connectedUser: User | null;
}

if (!apps.length) {
  initializeApp(firebaseConfig);
}

export default class App extends Component<{}, AppState> {
  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {
      connectedUser: null,
    };
  }

  render() {
    return (
      <SessionContext>
        <ThemeContext>
          <Suspense
            fallback={
              <Backdrop open={true}>
                <CircularProgress color="inherit" />
              </Backdrop>
            }
          >
            <Router>
              <Switch>
                <Route exact path="/login" component={LoginPage} />
                <ProtectedRoute path="/" component={SchedulePage} />
              </Switch>
            </Router>
          </Suspense>
        </ThemeContext>
      </SessionContext>
    );
  }
}
