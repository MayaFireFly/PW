import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  root: {
    minWidth: 300,
    textAlign: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  pos: {
    marginBottom: 12,
  },
}));

const UserInfo = ({ user, gotoTransactions }) => {
  const classes = useStyles();

  return (
    <Card className = { classes.root }>
      <CardContent>
        <Typography className = { classes.title } color = 'primary' gutterBottom>
          { user.balance }
        </Typography>
        <Typography variant = 'h5' component = 'h2'>
          { user.name }
        </Typography>
        <Typography className = { classes.pos } color = 'textSecondary'>
          { user.email }
        </Typography>
      </CardContent>
      <CardActions>
        <Button size = 'small' onClick = { gotoTransactions }>Transfer</Button>
      </CardActions>
    </Card>
  );
};

UserInfo.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    balance: PropTypes.number.isRequired
  }),
  gotoTransactions: PropTypes.func.isRequired
};

export default UserInfo;