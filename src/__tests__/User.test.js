import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import User from '../pages/User';
import store from '../store';


describe('User', () => {
  it('render User without crushing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><ReduxProvider store = {store}><User/></ReduxProvider></BrowserRouter>, div);
  });       
});