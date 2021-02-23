import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import { Modal as ModalUI, Card, CardContent, CardActions, Typography, Button } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  modalWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  root: {
    minWidth: 300,
    textAlign: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  buttonsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
}));

const Modal = ({ open, onOk, title, message, cancelExists = false, onCancel = function(){}, note = '' }) => {
  const classes = useStyles();

  return (
    <div>
      <ModalUI
        open = { open }
        onClose = { onOk }
        className = { classes.modalWrapper }
      >
        <Card className = { classes.root }>
          <CardContent>
            <Typography className = { classes.title } color = 'primary' gutterBottom>
              { title }
            </Typography>
            <Typography variant = 'h5' component = 'h2'>
              { message }
            </Typography>
            <Typography variant = 'subtitle2' component = 'p'>
              { note }
            </Typography>
          </CardContent>
          <CardActions className = { classes.buttonsWrapper }>
            <Button size = 'medium' onClick = { onOk }>ok</Button>
            {cancelExists && <Button size = 'medium' onClick = { onCancel }>cancel</Button>}
          </CardActions>
        </Card>
      </ModalUI>
    </div>
  );
};

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  cancelExists: PropTypes.bool,
  onCancel: PropTypes.func,
  note: PropTypes.string
};

export default Modal;