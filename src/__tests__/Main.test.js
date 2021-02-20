import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import Main from '../pages/Main';
import store from '../store';


describe('Main', () => {
  it('render Main without crushing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><ReduxProvider store = {store}><Main/></ReduxProvider></BrowserRouter>, div);
  });       
});