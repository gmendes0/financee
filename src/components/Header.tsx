import {
  AppBar,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { useContext } from "react";
import { FiLogOut, FiMenu } from "react-icons/fi";
import UserContext from "../contexts/UserContext";

const useStyle = makeStyles(theme => ({
  appBar: {
    boxShadow: theme.shadows[3],
  },
  toolbar: {
    justifyContent: "space-between",
  },
  appBarTitle: {
    display: "flex",
    justifySelf: "center",
    fontFamily: "'Courgette', 'Roboto', sans-serif",
  },
  appBarIcon: {
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
}));

export default function Header(): JSX.Element {
  const classes = useStyle();

  const { signOut } = useContext(UserContext);

  function handleSignOut() {
    signOut();
  }

  return (
    <AppBar color="inherit" classes={{ root: classes.appBar }}>
      <Toolbar className={classes.toolbar}>
        <IconButton edge="start" className={classes.appBarIcon}>
          <FiMenu />
        </IconButton>
        <Typography variant="h6" className={classes.appBarTitle}>
          Financee
        </Typography>
        <IconButton edge="end" onClick={handleSignOut}>
          <FiLogOut />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
