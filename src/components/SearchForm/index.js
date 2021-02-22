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
    width: '80%'
  },
  icon: {
    width: '20%',
    maxWidth: '4em'
  },
  linkWrapper: {
    marginTop: theme.spacing(2)
  },
  errorWrapper: {
    color: 'red'
  }
}));

const SearchForm = ({ searchUser, users, selectUser, clearUsers }) => {
  const classes = useStyles();
  const [searchString, setSearchString] = useState();
  const [searchStringValid, setSearchStringValid] = useState(false);

  useEffect(() => {
    if (regex.name.test(searchString)) {
      setSearchStringValid(true);
    }
  }, [searchString]); 

  const submit = (event) => {
    event.preventDefault();
    if (searchStringValid) {
      users.find(user => user.name === searchString) ?
        selectUser(searchString) :
        searchUser(searchString);
    }
  };

  return <div className = { classes.wrapper }>
    <Typography component = 'h1' variant = 'h5'>
        Transfer to
    </Typography>

    <form className = { classes.form } onSubmit = {submit} noValidate>
      <div className = { classes.row }>

        <Autocomplete
          className = { classes.input }
          freeSolo
          disableClearable
          options = { users.map(user => user.name) }
          renderInput = {params => (
            <TextField
              {...params}
              label = 'Username'
              margin = 'normal'
              variant = 'outlined'
              error = { !searchStringValid }
              InputProps={{ ...params.InputProps, type: 'search' }}
              onChange = {event => {
                setSearchString(event.target.value);
              }}
            />
          )}
        />

        <IconButton color = 'primary' onClick = { clearUsers } className = { classes.icon }>
          <RefreshOutlined/>
        </IconButton>
      </div>   
    </form>
  </div>;
};

SearchForm.propTypes = {
  searchUser: PropTypes.func.isRequired,
  selectUser: PropTypes.func.isRequired,
  clearUsers: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired
};

export default SearchForm;