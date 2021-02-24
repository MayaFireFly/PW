import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, Link, TextField, Typography } from '@material-ui/core';

import { regex } from '../../constants';


const useStyles = makeStyles(theme => ({
  wrapper: {},
  form: {},
  submit: {
    marginTop: theme.spacing(4)
  },
  linkWrapper: {
    marginTop: theme.spacing(2)
  },
  errorWrapper: {
    color: 'red'
  }
}));

const SignInForm = ({ setData }) => {
  const classes = useStyles();

  const [isNew, setIsNew] = useState(false);
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordConfirmed, setPasswordConfirmed] = useState();

  const [usernameValid, setUsernameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordConfirmedValid, setPasswordConfirmedValid] = useState(false);
  const [formValid, setFormValid] = useState(false);  
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmed: ''
  });

  useEffect(() => {
    isNew ? 
      setFormValid(usernameValid && emailValid && passwordValid && passwordConfirmedValid) :
      setFormValid(emailValid && passwordValid);
  }, [isNew, usernameValid, emailValid, passwordValid, passwordConfirmedValid]);

  useEffect(() => {
    setErrors({ ...errors, username: ''});
    if (username) {
      regex.name.test(username) ?
        setUsernameValid(true) :
        setErrors({ ...errors, username: 'Invalid username'});
    }
  }, [username]);

  useEffect(() => {
    setErrors({ ...errors, email: ''});
    if (email) {
      regex.email.test(email) ?
        setEmailValid(true) :
        setErrors({ ...errors, email: 'Invalid email'});
    }
  }, [email]);

  useEffect(() => {
    setErrors({ ...errors, password: ''});
    if (password) {
      regex.password.test(password) ?
        setPasswordValid(true) :
        setErrors({ ...errors, password: 'Invalid password'});
    }
  }, [password]);

  useEffect(() => {
    setErrors({ ...errors, passwordConfirmed: ''});
    if (passwordConfirmed) {
      regex.password.test(passwordConfirmed) && passwordConfirmed === password ? 
        setPasswordConfirmedValid(true) :
        setErrors({ ...errors, passwordConfirmed: 'Invalid confirmed password'});
    }
  }, [passwordConfirmed]); 

  const submit = (event) => {
    event.preventDefault();
    if (formValid) {
      setData(isNew ? {
        username,
        email,
        password
      } : {
        email,
        password
      });
    }
  };

  return <div className = { classes.wrapper }>
    <Typography component = 'h1' variant = 'h5'>
        Sign in
    </Typography>

    <form className = { classes.form } onSubmit = {submit} noValidate>
      { isNew && 
        <TextField
          variant = 'outlined'
          margin = 'normal'
          required
          fullWidth
          id = 'username'
          label = 'Name'
          name = 'username'
          autoComplete = 'name'
          helperText = 'Enter your name'
          error = { !usernameValid }
          onChange = { event => setUsername(event.target.value) }
        />
      }

      <TextField
        variant = 'outlined'
        margin = 'normal'
        required
        fullWidth
        id = 'email'
        label = 'Email Address'
        name = 'email'
        autoComplete = 'email'
        helperText = 'Enter your email address'
        error = { !emailValid }
        onChange = { event => setEmail(event.target.value) }
      />

      <TextField
        variant = 'outlined'
        margin = 'normal'
        required
        fullWidth
        name = 'password'            
        label = 'Password'
        type = 'password'
        id = 'password'
        autoComplete = 'current-password'
        helperText = 'Enter your password'
        error = { !passwordValid }
        onChange = { event => setPassword(event.target.value) }
      />

      {isNew &&
        <TextField
          variant = 'outlined'
          margin = 'normal'
          required
          fullWidth
          name = 'passwordConfirmed'            
          label = 'Confirm password'
          type = 'password'
          id = 'passwordConfirmed'
          helperText = 'Confirm your password'
          error = { !passwordConfirmedValid }
          onChange = { event => setPasswordConfirmed(event.target.value) }
        /> 
      }

      <Button
        type = 'submit'
        fullWidth
        color = 'primary'
        className = { classes.submit }
        disabled = { !formValid }
      >
          Sign In
      </Button>

      <Grid container className = { classes.linkWrapper }>
        <Grid item>
          <Link href = '#' variant = 'body2' onClick = {() => setIsNew(true)}>
            {'Don\'t have an account? Sign Up'}
          </Link>
        </Grid>
      </Grid>

      <div className = { classes.errorWrapper }>
        { Object.keys(errors).map((propName, idx) => {
          if (errors[propName].length > 0) {
            return <p key = {idx}>{errors[propName]}</p>;
          } else {
            return '';
          }
        })}
      </div>
    </form>
  </div>;
};

SignInForm.propTypes = {
  setData: PropTypes.func.isRequired
};

export default SignInForm;