import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { lighten, makeStyles } from '@material-ui/core/styles';
import { Check } from '@material-ui/icons';

import {
  Toolbar as ToolbarUI,
  Typography,
  IconButton,
  Tooltip
} from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
      theme.palette.type === 'light'
        ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
        : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));
  
const Toolbar = ({ selectedExists, selectTransaction }) => {
  const classes = useStyles();
  
  return <ToolbarUI
    className = {clsx(classes.root, {
      [classes.highlight]: selectedExists,
    })}
  >
    <Typography className = { classes.title } variant = 'h6' id = 'tableTitle' component = 'div'>
      Transactions
    </Typography>
  
    {selectedExists && 
      <Tooltip title = 'Select'>
        <IconButton onClick = { selectTransaction }>
          <Check/>
        </IconButton>
      </Tooltip>
    }
  </ToolbarUI>;
};

Toolbar.propTypes = {
  selectedExists: PropTypes.bool.isRequired,
  selectTransaction: PropTypes.func.isRequired
};

export default Toolbar;