import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import Transactions from '../pages/Transactions';
import store from '../store';


describe('Transactions', () => {
  it('render Transactions without crushing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><ReduxProvider store = {store}><Transactions/></ReduxProvider></BrowserRouter>, div);
  });       
});