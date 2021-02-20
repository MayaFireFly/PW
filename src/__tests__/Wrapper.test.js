import React from 'react';
import ReactDOM from 'react-dom';

import Wrapper from '../components/Wrapper';

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn()
  })
}));


describe('Wrapper', () => {
  it('render Menu without crushing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Wrapper><div>Test</div></Wrapper>, div);
  });       
});