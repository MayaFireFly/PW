import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography, Paper, Grid } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    width: '100%',
    height: '100%'
  }
}));

const UserInfo = ({ user, gotoPW, isFull = false }) => {
  const classes = useStyles();

  return <Paper className = { classes.paper }>
    <Grid container spacing={2}>
      <Grid item xs = { 12 } sm container>
        <Grid item xs container direction = 'column' spacing={2}>
          <Grid item xs>
            <Typography gutterBottom variant = 'subtitle1'>
              { user.name }
            </Typography>

            {isFull && 
            <Typography variant = 'body2' gutterBottom>
              { user.email }
            </Typography>
            }            
          </Grid>

          {isFull &&
          <Grid item>
            <Button size = 'small' onClick = { gotoPW }>Transfer</Button>
          </Grid>
          }
          
        </Grid>
        <Grid item>
          <Typography variant = 'h3' color = 'secondary'>${ user.balance }</Typography>
        </Grid>
      </Grid>
    </Grid>
  </Paper>;  
};

UserInfo.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    balance: PropTypes.number.isRequired
  }),
  gotoPW: PropTypes.func,
  isFull: PropTypes.bool
};

export default UserInfo;