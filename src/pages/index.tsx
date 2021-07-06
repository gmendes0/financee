import {
  AppBar,
  makeStyles,
  Toolbar,
  Typography,
  IconButton,
  Container,
  BottomNavigation,
  BottomNavigationAction,
  Box,
} from "@material-ui/core";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { FiMenu, FiLogOut } from "react-icons/fi";
import { MdAddCircle, MdHome } from "react-icons/md";
import Transaction from "../components/Transaction";
import UserContext from "../contexts/UserContext";
import { db } from "../services/firebase";
import firebase from "firebase/app";
import Header from "../components/Header";
import ProtectedPage from "../components/ProtectedPage";

type TransactionsType = {
  id: string;
  title: string;
  price: number;
  due_date: firebase.firestore.Timestamp;
  payment_date: firebase.firestore.Timestamp;
  created_at: firebase.firestore.Timestamp;
};

const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh",
  },
  title: {
    margin: `${theme.spacing(2)}px 0`,
    padding: `${theme.spacing(2)}px 0`,
    fontWeight: "bold",
    position: "relative",

    "&::after": {
      content: "''",
      height: 1,
      width: "100%",
      background: theme.palette.text.secondary,
      display: "block",
      position: "absolute",
      bottom: 0,
      opacity: 0.5,
    },
  },
  bottomNavigation: {
    position: "fixed",
    bottom: 0,
    width: "100vw",
  },
}));

const Home: React.FC = () => {
  const classes = useStyles();
  const router = useRouter();

  const [transactions, setTransactions] = useState<TransactionsType[]>([]);

  const { user, signOut } = useContext(UserContext);

  useEffect(() => {
    if (user)
      db.collection("transactions")
        .where("user_id", "==", user.uid)
        .get()
        .then(querySnapshot => {
          const storedTransactions = querySnapshot.docs.map(
            doc =>
              ({
                id: doc.id,
                ...doc.data(),
              } as TransactionsType)
          );

          setTransactions(storedTransactions);
        });
  }, [user]);

  return (
    <ProtectedPage>
      <Box className={classes.root}>
        <Header />
        <Toolbar />
        <Container>
          <Typography
            component="h2"
            variant="h5"
            color="textSecondary"
            className={classes.title}
          >
            Transações
          </Typography>

          {transactions.map(transaction => {
            const date = transaction.payment_date
              ? transaction.payment_date
              : transaction.due_date;

            return (
              <Transaction
                key={transaction.id}
                title={transaction.title}
                price={transaction.price}
                status={`${
                  transaction.payment_date ? "Pago em" : "Vence em"
                }: ${date.toDate().toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}`}
              />
            );
          })}

          <Toolbar />
        </Container>
        <BottomNavigation className={classes.bottomNavigation}>
          <BottomNavigationAction
            icon={<MdAddCircle size={32} />}
            showLabel={false}
            onClick={() => router.push("/transactions/create")}
          />
        </BottomNavigation>
      </Box>
    </ProtectedPage>
  );
};

export default Home;
