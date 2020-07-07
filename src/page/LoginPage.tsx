import React, { Component, ErrorInfo } from "react";
import {
  Grid,
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { Formik, FormikHelpers, FormikValues } from "formik";
import loginCss from "../assets/css/login.module.css";
import { loginForm } from "../forms/loginForm";
import { auth } from "firebase/app";
import { RouteComponentProps, Redirect } from "react-router";
import { ContextSession } from "../contexts/SessionContext";

export default class LoginPage extends Component<RouteComponentProps> {
  constructor(props: RouteComponentProps) {
    super(props);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(error);
  }

  handleLoginSubmit(
    values: FormikValues,
    helpers: FormikHelpers<{ email: string; password: string }>
  ) {
    auth()
      .signInWithEmailAndPassword(values.email, values.password)
      .catch((err) => {
        helpers.setStatus({ apiCall: err.message });
        helpers.setSubmitting(false);
      });
  }

  render() {
    return (
      <>
        <ContextSession.Consumer>
          {({ user }) => {
            if (!!user) {
              let redirectTo = new URLSearchParams(
                this.props.location.search
              ).get("redirect_to");
              return <Redirect to={redirectTo || "/"} />;
            } else {
              return <></>;
            }
          }}
        </ContextSession.Consumer>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          style={{ height: "70vh" }}
        >
          <Grid item>
            <Box
              component={Paper}
              overflow="hidden"
              maxWidth="400px"
              margin={2}
            >
              <Box className={loginCss.loginHeader} padding={2}>
                <Typography variant="h5" align="center">
                  Log in
                </Typography>
              </Box>
              <Box padding={2}>
                <Formik
                  validationSchema={loginForm}
                  validateOnChange={false}
                  initialValues={{ email: "", password: "" }}
                  initialStatus={{ apiCall: "" }}
                  onSubmit={this.handleLoginSubmit}
                >
                  {({
                    values,
                    errors,
                    handleSubmit,
                    handleChange,
                    status,
                    isSubmitting,
                  }) => (
                    <>
                      <form
                        noValidate
                        onSubmit={handleSubmit}
                        className={loginCss.loginForm}
                      >
                        <TextField
                          required
                          fullWidth
                          value={values.email}
                          onChange={handleChange}
                          type="email"
                          name="email"
                          label="Email"
                          error={!!errors.email}
                          helperText={errors.email}
                        />
                        <TextField
                          required
                          fullWidth
                          label="Password"
                          name="password"
                          type="password"
                          value={values.password}
                          onChange={handleChange}
                          error={!!errors.password}
                          helperText={errors.password}
                        />
                        {!!status.apiCall && (
                          <Alert variant="outlined" severity="error">
                            {status.apiCall}
                          </Alert>
                        )}

                        <Button
                          variant="contained"
                          disableElevation
                          color="primary"
                          type="submit"
                          className={loginCss.loginButton}
                        >
                          {!isSubmitting ? (
                            <>Log in</>
                          ) : (
                            <CircularProgress
                              size={24}
                              style={{ color: "#fff" }}
                            />
                          )}
                        </Button>
                      </form>
                    </>
                  )}
                </Formik>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </>
    );
  }
}
