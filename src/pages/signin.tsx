import { Box, makeStyles, Typography, Button } from "@material-ui/core";
import { GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import UserContext from "../contexts/UserContext";

const useStyles = makeStyles(theme => ({
  appTitle: {
    fontFamily: "'Courgette', 'Roboto', sans-serif",
    fontWeight: "bold",
    marginBottom: theme.spacing(4),
  },
}));

export default function SignIn(): JSX.Element {
  const classes = useStyles();
  const router = useRouter();

  const { signInWithGoogle } = useContext(UserContext);

  async function handleSignIn() {
    try {
      await signInWithGoogle();

      router.push("/");
    } catch (error) {
      console.error("Failed to sign in with google");
      console.error(error);
    }
  }

  return (
    <>
      <Head>
        <title>Login | Financee</title>
      </Head>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        width="100vw"
        height="100vh"
      >
        <Typography variant="h4" component="h1" className={classes.appTitle}>
          Financee
        </Typography>

        <Box>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            endIcon={<FcGoogle />}
            onClick={handleSignIn}
          >
            Sign In With Google
          </Button>
        </Box>
      </Box>
    </>
  );
}
