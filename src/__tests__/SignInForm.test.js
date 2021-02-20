import React from 'react';
import ReactDOM from 'react-dom';

import SignInForm from '../components/SignInForm';


describe('SignInForm', () => {
  it('render SignInForm without crushing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SignInForm setData = {(data) => console.log(data)}/>, div);
  });       
});