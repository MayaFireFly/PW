import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';

import Wrapper from '../components/Wrapper';
import store from '../store';


jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn()
  })
}));

describe('Wrapper', () => {
  it('render Menu without crushing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <ReduxProvider store = {store}>
        <Wrapper><div>Test</div></Wrapper>
      </ReduxProvider>, 
      div);
  });       
});