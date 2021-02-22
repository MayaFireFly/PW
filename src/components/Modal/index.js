import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import { Modal as ModalUI, IconButton } from '@material-ui/core';
import { CancelOutlined } from '@material-ui/icons';


const useStyles = makeStyles(theme => ({
  modalWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    minWidth: 300,
    backgroundColor: theme.palette.background.paper,
    border: '0px solid #00f',
    borderRadius: '5px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    textAlign: 'center'
  },
  icon: {
    marginLeft: '90%' 
  }
}));

const Modal = ({ open, onClose, title, message }) => {
  const classes = useStyles();

  return (
    <div>
      <ModalUI
        open = { open }
        onClose = { onClose }
        className = { classes.modalWrapper }
      >
        <div className = { classes.paper }>
          <IconButton onClick = { onClose } className = { classes.icon }>
            <CancelOutlined/>
          </IconButton>

          <h2>{ title }</h2>
          <p>{ message }</p>
        </div>
      </ModalUI>
    </div>
  );
};

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
};

export default Modal;