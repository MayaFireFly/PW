import React from 'react';
import ReactDOM from 'react-dom';

import Copyright from '../components/Copyright';


describe('Copyright', () => {
  it('render Copyright without crushing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Copyright/>, div);
  });       
});