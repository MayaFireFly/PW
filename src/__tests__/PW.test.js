import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import PW from '../pages/PW';
import store from '../store';


describe('PW', () => {
  it('render PW without crushing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><ReduxProvider store = {store}><PW/></ReduxProvider></BrowserRouter>, div);
  });       
});