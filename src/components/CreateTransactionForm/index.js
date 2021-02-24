import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  wrapper: {
    width: '100%'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center'
  },
  row: {
    display:  'flex',
    flexDirection: 'row',
    width: '100%'
  },
  submit: {
    width: '15%',
    height: '4em',
    marginTop: '1em',
    marginLeft: '1em'
  },  
  input: {
    width: '70%'
  },
  errorWrapper: {
    color: 'red'
  }
}));

const CreateTransactionForm = ({ setData, maxAmount, beginAmount }) => {
  const classes = useStyles();

  const [amount, setAmount] = useState(beginAmount);
  const [amountValid, setAmountValid] = useState(false); 
  const [error, setError] = useState('');

  useEffect(() => {
    setError('');
    if (amount && amount <= maxAmount && amount >= 0) {
      setAmountValid(true);
    } else {
      setError(`Invalid amount, max: ${maxAmount}`);
    }
  }, [amount, maxAmount]);

  const submit = (event) => {
    event.preventDefault();
    if (amountValid) {
      setData(amount);
    }
  };

  return <div className = { classes.wrapper }>

    <form className = { classes.form } onSubmit = {submit} noValidate>
      <div className = { classes.row }>
        <TextField
          variant = 'outlined'
          margin = 'normal'
          required
          fullWidth
          id = 'amount'
          label = 'Amount'
          name = 'amount'
          helperText = 'Enter transfer amount'
          className = { classes.input }
          defaultValue = { beginAmount }
          error = { !amountValid }
          onChange = { event => setAmount(event.target.value) }
        />

        <Button
          type = 'submit'
          color = 'primary'
          className = { classes.submit }
          disabled = { !amountValid }
        >
          Transfer
        </Button>
      </div>
      
      <div className = { classes.row }>
        <div className = { classes.errorWrapper }>
          { error }
        </div>
      </div>
    </form>
  </div>;
};

CreateTransactionForm.propTypes = {
  setData: PropTypes.func.isRequired,
  maxAmount: PropTypes.number.isRequired,
  beginAmount: PropTypes.number.isRequired
};

export default CreateTransactionForm;