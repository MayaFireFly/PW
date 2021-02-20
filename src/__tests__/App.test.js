import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';

import App from '../App';
import store from '../store';


describe('App', () => {
  it('render App without crushing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><ReduxProvider store = {store}><App/></ReduxProvider></BrowserRouter>, div);
  });       
});