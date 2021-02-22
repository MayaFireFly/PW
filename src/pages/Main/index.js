import React from 'react';

import Wrapper from '../../components/Wrapper';
import { Box } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
  h: {
    color: theme.palette.primary.main,
    textAlign: 'center'
  },
  p: {
    margin: theme.spacing(2),
    textIndent: '5%'
  }
}));

const Main = () => {
  const classes = useStyles();

  return <Wrapper>
    <Box component = 'div'>
      <h2 className = { classes.h }>Test work</h2>
      <h3 className = { classes.h }>PW Application Overview</h3>
      <p className = { classes.p }>
        The application is for Parrot Wings (PW, “internal money”) transfer between system users.
      </p>
      <p className = { classes.p }>
        The application will be very “polite” and will inform a user of any problems 
        (i.e. login not successful, not enough PW to remit the transaction, etc.)
      </p>
    </Box>
  </Wrapper>;
};

export default Main;