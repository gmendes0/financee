import React, { useState, useContext } from "react";
import NextLink from "next/link";
import {
  Container,
  makeStyles,
  Toolbar,
  TextField,
  Button,
  Link,
  Snackbar,
  Typography,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { db } from "../../services/firebase";
import UserContext from "../../contexts/UserContext";
import Header from "../../components/Header";
import ProtectedPage from "../../components/ProtectedPage";
import { useRouter } from "next/router";

type TransactionType = {
  title: string;
  price: number;
  due_date: Date | null;
  payment_date: Date | null;
  user_id: string;
};

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  title: {
    color: theme.palette.text.secondary,
    textAlign: "center",
    fontWeight: "bold",
    margin: `0 0 ${theme.spacing(4)}px 0`,
  },
  backLink: {
    margin: `${theme.spacing(1)}px 0 0 0`,
  },
}));

export default function NewTransaction(): JSX.Element {
  const classes = useStyles();
  const { user } = useContext(UserContext);
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [dueDate, setDueDate] = useState<Date | null>(new Date());
  const [paymentDate, setPaymentDate] = useState<Date | null>(null);
  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    setError(null);
    setShowError(false);
    setShowSuccess(false);

    if (!title || !price) return;

    const transaction: TransactionType = {
      title,
      price: Number(price),
      due_date: dueDate,
      payment_date: paymentDate,
      user_id: user.uid,
    };

    db.collection("transactions")
      .add(transaction)
      .then(result => {
        if (result.id) setShowSuccess(true);
      })
      .catch(error => {
        console.error(error);
        setError("Falha ao salvar a transação.");
        setShowError(true);
      });
  }

  return (
    <ProtectedPage>
      <Header />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Snackbar
          anchorOrigin={{ horizontal: "center", vertical: "top" }}
          open={showSuccess}
          autoHideDuration={5000}
          onClose={(event, reason) => {
            if (reason === "clickaway") return;

            setShowSuccess(false);

            if (router.asPath !== "/") router.push("/");
          }}
        >
          <Alert severity="success">Transação adicionada com sucesso!</Alert>
        </Snackbar>
        <Snackbar
          anchorOrigin={{ horizontal: "center", vertical: "top" }}
          open={showError}
          autoHideDuration={5000}
          onClose={(event, reason) => {
            if (reason === "clickaway") return;
            setShowError(false);
          }}
        >
          <Alert severity="error">{error}</Alert>
        </Snackbar>
        <Container className={classes.container}>
          <Toolbar />
          <Typography className={classes.title} variant="h5" component="h1">
            Adicionar Transação
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              type="text"
              variant="outlined"
              label="Título"
              placeholder="ex.: Fatura de Julho"
              margin="normal"
              required
              fullWidth
              value={title}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setTitle(event.currentTarget.value)
              }
            />
            <TextField
              type="number"
              variant="outlined"
              label="Preço"
              placeholder="ex.: 319.53"
              margin="normal"
              required
              fullWidth
              value={price}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setPrice(event.currentTarget.value);
              }}
            />
            <KeyboardDatePicker
              label="Vencimento"
              inputVariant="outlined"
              fullWidth
              margin="normal"
              onChange={setDueDate}
              value={dueDate}
            />
            <KeyboardDatePicker
              label="Pago em:"
              inputVariant="outlined"
              fullWidth
              margin="normal"
              onChange={setPaymentDate}
              value={paymentDate}
            />
            <Button
              size="large"
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
            >
              Adicionar
            </Button>
          </form>

          <NextLink href="/">
            <Link href="/" className={classes.backLink} variant="body2">
              Voltar
            </Link>
          </NextLink>
        </Container>
      </MuiPickersUtilsProvider>
    </ProtectedPage>
  );
}
