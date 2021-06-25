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
import { useEffect, useState } from "react";
import { FiMenu, FiLogOut } from "react-icons/fi";
import { MdAddCircle, MdHome } from "react-icons/md";
import Transaction from "../components/Transaction";

type TransactionsType = {
  id: string;
  title: string;
  price: string;
  paid: boolean;
  due_date: string;
  payment_date: string;
};

const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh",
  },
  appBar: {
    boxShadow: theme.shadows[3],
  },
  toolbar: {
    justifyContent: "space-between",
  },
  appBarTitle: {
    display: "flex",
    justifySelf: "center",
  },
  appBarIcon: {
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
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

  const [transactions, setTransactions] = useState<TransactionsType[]>([]);

  useEffect(() => {
    setTransactions([
      {
        id: "60d64091fdb026a662b96e22",
        paid: true,
        price: "2,316.00",
        title: "reprehenderit ut",
        due_date: "2016-11-28T04:54:27 +02:00",
        payment_date: "2015-10-13T02:13:54 +03:00",
      },
      {
        id: "60d64091fd49909f9f48d9d2",
        paid: false,
        price: "3,762.10",
        title: "id culpa",
        due_date: "2016-08-11T12:38:44 +03:00",
        payment_date: "2017-05-27T04:11:22 +03:00",
      },
      {
        id: "60d6409129d6b5f59b160c99",
        paid: false,
        price: "1,766.20",
        title: "adipisicing voluptate",
        due_date: "2016-10-31T12:42:02 +02:00",
        payment_date: "2019-08-27T04:58:09 +03:00",
      },
      {
        id: "60d64091ca0d1bce5bfe942c",
        paid: true,
        price: "3,306.63",
        title: "pariatur esse",
        due_date: "2017-05-17T04:59:41 +03:00",
        payment_date: "2016-08-08T09:38:19 +03:00",
      },
      {
        id: "60d64091ee86ddca6d8df3a4",
        paid: true,
        price: "1,790.19",
        title: "mollit proident",
        due_date: "2016-11-03T04:16:40 +02:00",
        payment_date: "2017-11-06T06:21:57 +02:00",
      },
      {
        id: "60d64091cdc9e7d3dd820cf4",
        paid: true,
        price: "2,982.62",
        title: "aute sunt",
        due_date: "2016-12-05T12:03:40 +02:00",
        payment_date: "2015-02-24T01:18:57 +03:00",
      },
      {
        id: "60d6409150d00a11ac0265ba",
        paid: true,
        price: "1,113.68",
        title: "incididunt ut",
        due_date: "2016-09-07T05:29:43 +03:00",
        payment_date: "2016-12-08T12:36:07 +02:00",
      },
    ]);
  }, []);

  return (
    <Box className={classes.root}>
      <AppBar color="inherit" classes={{ root: classes.appBar }}>
        <Toolbar className={classes.toolbar}>
          <IconButton edge="start" className={classes.appBarIcon}>
            <FiMenu />
          </IconButton>
          <Typography variant="h6" className={classes.appBarTitle}>
            Finance
          </Typography>
          <IconButton edge="end">
            <FiLogOut />
          </IconButton>
        </Toolbar>
      </AppBar>
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

        {transactions.map(transaction => (
          <Transaction
            key={transaction.id}
            title={transaction.title}
            price={Number.parseFloat(transaction.price.replace(",", ""))}
            status={`Pago em: ${transaction.payment_date}`}
          />
        ))}

        <Toolbar />
      </Container>
      <BottomNavigation className={classes.bottomNavigation}>
        <BottomNavigationAction
          label="Adicionar"
          icon={<MdAddCircle size={32} />}
        />
      </BottomNavigation>
    </Box>
  );
};

export default Home;
