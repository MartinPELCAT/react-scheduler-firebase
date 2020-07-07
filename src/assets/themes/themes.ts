import { createMuiTheme, responsiveFontSizes } from "@material-ui/core";

let lightTheme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: "#fe6e61",
    },
  },
});
lightTheme = responsiveFontSizes(lightTheme);

export { lightTheme };
