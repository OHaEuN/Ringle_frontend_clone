import { createTheme } from "@mui/material/styles";

export const googleTheme = createTheme({
  palette: {
    primary: {
      main: "#1b65ca",
      contrastText: "#fff",
    },
    secondary: {
      main: "#5F6368",
      contrastText: "#353535",
    },
    background: {
      default: "#fff",
      paper: "#fff",
    },
  },
  typography: {
    fontFamily: "Product Sans",
  },
  components: {
    MuiToolbar: {
      styleOverrides: {
        root: {
          background: "#fff",
          color: "#353535",
          borderBottom: "1px solid #d4d4d4",
          fontSize: "1.4rem",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },
  },
});
