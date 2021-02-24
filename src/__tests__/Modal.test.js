import React from 'react';
import ReactDOM from 'react-dom';

import Modal from '../components/Modal';


describe('Modal', () => {
  it('render Modal without crushing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Modal open = {true} onOk = {(data) => console.log(data) } title = 'title' message = 'message'/>, div);
  });       
});