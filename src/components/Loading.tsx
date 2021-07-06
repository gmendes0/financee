import { makeStyles, Box, Typography } from "@material-ui/core";
import { motion } from "framer-motion";

const useStyles = makeStyles({
  appBarTitle: {
    display: "flex",
    justifySelf: "center",
    fontFamily: "'Courgette', 'Roboto', sans-serif",
  },
});

export default function Loading(): JSX.Element {
  const classes = useStyles();

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      width="100vw"
    >
      <motion.div
        animate={{ rotateX: 360 }}
        transition={{ repeat: Infinity, duration: 1, repeatDelay: 5 }}
      >
        <Typography component="h1" variant="h4" className={classes.appBarTitle}>
          Financee
        </Typography>
      </motion.div>
    </Box>
  );
}
