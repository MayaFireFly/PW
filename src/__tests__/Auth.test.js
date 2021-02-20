import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import Auth from '../pages/Auth';
import store from '../store';


describe('Auth', () => {
  it('render Auth without crushing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><ReduxProvider store = {store}><Auth/></ReduxProvider></BrowserRouter>, div);
  });       
});