import Home from "./pages/Home";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { googleTheme } from "./assets/theme";

function App() {
  return (
    <>
      <ThemeProvider theme={googleTheme}>
        <CssBaseline />
        <Home />
      </ThemeProvider>
    </>
  );
}

export default App;
