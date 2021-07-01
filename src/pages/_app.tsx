import { ThemeProvider, CssBaseline } from "@material-ui/core";
import { useEffect } from "react";
import { UserContextProvider } from "../contexts/UserContext";
import theme from "../theme/theme";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <UserContextProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </UserContextProvider>
  );
}

export default MyApp;
