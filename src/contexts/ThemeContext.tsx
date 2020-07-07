import React, { Component, createContext } from "react";
import { Theme, ThemeProvider, CssBaseline } from "@material-ui/core";
import { lightTheme } from "../assets/themes/themes";

interface IContextTheme {
  theme: Theme;
}

export const ContextTheme = createContext<IContextTheme>({ theme: lightTheme });

export default class ThemeContext extends Component {
  render() {
    return (
      <ContextTheme.Provider
        value={{
          theme: lightTheme,
        }}
      >
        <ThemeProvider theme={lightTheme}>
          <CssBaseline />
          {this.props.children}
        </ThemeProvider>
      </ContextTheme.Provider>
    );
  }
}
