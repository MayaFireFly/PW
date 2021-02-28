import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import { TextField, Typography, IconButton } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { RefreshOutlined } from '@material-ui/icons';

import { regex } from '../../constants';


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
  input: {
    width: '70%'
  },
  icon: {
    width: '15%',
    maxWidth: '4em',
    marginLeft: '1em'
  },
  error: {
    color: 'red'
  }
}));

const SearchForm = ({ searchUser, users, selectUser, clearUsers, beginUser }) => {
  const classes = useStyles();
  const [searchString, setSearchString] = useState(beginUser);
  const [searchStringValid, setSearchStringValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (regex.name.test(searchString)) {
      setSearchStringValid(true);
    }
  }, [searchString]); 

  useEffect(() => {
    if (searchStringValid) {
      searchUser(searchString);
    }
  }, [searchStringValid, searchString, searchUser]);

  const clear = () => {
    clearUsers();
  };

  return <div className = { classes.wrapper }>
    <Typography component = 'h1' variant = 'h5'>
        Transfer to
    </Typography>

    <form className = { classes.form } noValidate>
      <div className = { classes.row }>

        <Autocomplete
          id = 'select-users'
          className = { classes.input }
          freeSolo
          disableClearable
          options = { users.map(user => user.name) }
          onSelect = {event => {
            if (users.map(user => user.name).includes(event.target.value)) {
              setErrorMessage('');
              selectUser(event.target.value);
            } else {
              selectUser();
              setErrorMessage('You are selecting a user not from enum');
            }            
          }}
          renderInput = {params => (
            <TextField
              {...params}
              id = 'input-user'
              label = 'Username'
              margin = 'normal'
              variant = 'outlined'
              error = { !searchStringValid && errorMessage.length > 0 }
              InputProps={{ ...params.InputProps, type: 'search' }}
              onChange = {event => {
                setSearchString(event.target.value);
              }}
            />
          )}
        />

        <IconButton color = 'primary' onClick = { clear } className = { classes.icon }>
          <RefreshOutlined/>
        </IconButton>
      </div> 
      <div className = { classes.row }>
        <p className = { classes.error }>{errorMessage}</p>
      </div>  
    </form>
  </div>;
};

SearchForm.propTypes = {
  searchUser: PropTypes.func.isRequired,
  selectUser: PropTypes.func.isRequired,
  clearUsers: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
  beginUser: PropTypes.string.isRequired
};

export default SearchForm;