import { Box, makeStyles, Toolbar, TextField } from "@material-ui/core";
// import { KeyboardDatePicker } from "@material-ui/pickers";
// import { useState } from "react";

type NewTransactionProps = {
  children: React.ReactNode;
};

const useStyles = makeStyles(theme => ({
  root: {},
}));

export default function NewTransaction(
  props: NewTransactionProps
): JSX.Element {
  const classes = useStyles();

  // const [selectedDate, setSelectedDate] = useState(
  //   new Date("2014-08-18T21:11:54")
  // );

  // const handleDateChange = date => {
  //   setSelectedDate(date);
  // };

  return (
    <Box>
      <Toolbar />
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
      {/* <KeyboardDatePicker onChange={handleDateChange} value={selectedDate} /> */}
    </Box>
  );
}
