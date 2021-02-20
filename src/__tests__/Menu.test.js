import React from 'react';
import ReactDOM from 'react-dom';

import Menu from '../components/Menu';

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn()
  })
}));


describe('Menu', () => {
  it('render Menu without crushing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Menu/>, div);
  });       
});