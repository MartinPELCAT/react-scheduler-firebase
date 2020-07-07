import React, { Component } from "react";
import { RouteProps, Route, Redirect } from "react-router";
import { ContextSession } from "../contexts/SessionContext";

/**
 * User must be connected to access this route
 */
export default class ProtectedRoute extends Component<RouteProps> {
  render() {
    return (
      <ContextSession.Consumer>
        {({ user }) => (
          <>
            {!!user ? (
              <Route {...this.props} />
            ) : (
              <Redirect
                to={`/login?redirect_to=${this.props.location?.pathname}${this.props.location?.search}`}
              />
            )}
          </>
        )}
      </ContextSession.Consumer>
    );
  }
}
