import NextLink from "next/link";
import {
  Box,
  Container,
  makeStyles,
  Toolbar,
  TextField,
  Button,
  Link,
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { useState } from "react";
import { Typography } from "@material-ui/core";
import Header from "../../components/Header";
import ProtectedPage from "../../components/ProtectedPage";

type NewTransactionProps = {
  children: React.ReactNode;
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

export default function NewTransaction(
  props: NewTransactionProps
): JSX.Element {
  const classes = useStyles();

  const [dueDate, setDueDate] = useState(new Date());
  const [paymentDate, setPaymentDate] = useState(null);

  return (
    <ProtectedPage>
      <Header />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Container className={classes.container}>
          <Toolbar />
          <Typography className={classes.title} variant="h5" component="h1">
            Adicionar Transação
          </Typography>
          <TextField
            type="text"
            variant="outlined"
            label="Título"
            placeholder="ex.: Fatura de Julho"
            margin="normal"
            required
            fullWidth
          />
          <TextField
            type="number"
            variant="outlined"
            label="Preço"
            placeholder="ex.: 319.53"
            margin="normal"
            required
            fullWidth
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
          <Button size="large" variant="contained" color="primary" fullWidth>
            Adicionar
          </Button>
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
