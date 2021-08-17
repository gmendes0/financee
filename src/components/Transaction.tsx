import {
  Box,
  Divider,
  makeStyles,
  Typography,
  IconButton,
  colors,
} from "@material-ui/core";
import { useRouter } from "next/router";
import { useContext } from "react";
import { FiUpload } from "react-icons/fi";
import { MdAttachMoney, MdMoneyOff } from "react-icons/md";
import { useDispatch } from "react-redux";
import UserContext from "../contexts/UserContext";
import { db } from "../services/firebase";
import {
  transactionsLoaded,
  TransactionsType,
} from "../store/features/transactions.slice";

type TransactionPropsType = {
  id: string;
  title: string;
  status: string;
  price: number;
  alreadyPaid?: boolean;
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
  id,
  title,
  status,
  price,
  alreadyPaid,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { user } = useContext(UserContext);

  function toggleTransactionStatus() {
    const transactions = db.collection("transactions");

    transactions
      .doc(id)
      .update({ payment_date: alreadyPaid ? null : new Date() })
      .then(() => {
        transactions
          .where("user_id", "==", user.uid)
          .get()
          .then(qs => {
            const transactionsList = qs.docs.map(doc => {
              return {
                id: doc.id,
                ...doc.data(),
              } as TransactionsType;
            });

            dispatch(transactionsLoaded(transactionsList));
          });
      });
  }

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
          <IconButton onClick={toggleTransactionStatus}>
            {alreadyPaid ? (
              <MdMoneyOff color={`${colors.green[600]}`} />
            ) : (
              <MdAttachMoney />
            )}
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
