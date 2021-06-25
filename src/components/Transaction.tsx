import {
  Box,
  Divider,
  makeStyles,
  Typography,
  IconButton,
} from "@material-ui/core";
import { FiUpload } from "react-icons/fi";
import { MdAttachMoney } from "react-icons/md";

type TransactionPropsType = {
  title: string;
  status: string;
  price: number;
};

const useStyles = makeStyles(theme => ({
  container: {
    margin: `0 0 ${theme.spacing(2)}px 0`,
    padding: `${theme.spacing(2)}px`,
    background: "#fff",
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3],
  },
  transactionName: {
    fontWeight: "bold",
  },
  transactionStatus: {
    fontSize: ".9em",
    fontWeight: "lighter",
  },
  divider: {
    margin: `${theme.spacing(1)}px 0`,
  },
  currency: {
    fontWeight: "bold",
  },
}));

const Transaction: React.FC<TransactionPropsType> = ({
  title,
  status,
  price,
}) => {
  const classes = useStyles();

  return (
    <Box display="flex" flexDirection="column" className={classes.container}>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box display="flex" flexDirection="column">
          <Typography
            variant="body1"
            color="textSecondary"
            className={classes.transactionName}
          >
            {title}
          </Typography>
          <Typography variant="body2" className={classes.transactionStatus}>
            {status}
          </Typography>
        </Box>
        <Box display="flex" flexDirection="row">
          <IconButton>
            <MdAttachMoney />
          </IconButton>
          <IconButton>
            <FiUpload />
          </IconButton>
        </Box>
      </Box>

      <Divider className={classes.divider} />

      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="body2" color="textSecondary">
          <Typography
            component="span"
            variant="body2"
            color="inherit"
            className={classes.currency}
          >
            R${" "}
          </Typography>
          {price?.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </Typography>
      </Box>
    </Box>
  );
};

export default Transaction;
