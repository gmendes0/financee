import { ThemeProvider, CssBaseline } from "@material-ui/core";
import { AppProps } from "next/dist/next-server/lib/router/router";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { UserContextProvider } from "../contexts/UserContext";
import { store } from "../store/store";
import theme from "../theme/theme";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <UserContextProvider>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </UserContextProvider>
  );
}

export default MyApp;
