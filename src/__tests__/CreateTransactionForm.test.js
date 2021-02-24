import React from 'react';
import ReactDOM from 'react-dom';

import CreateTransactionForm from '../components/CreateTransactionForm';


const mockFunc = () => {
  console.log('mock func');
};

describe('CreateTransactionForm', () => {
  it('render CreateTransactionForm without crushing', () => {
    const div = document.createElement('div');    
    ReactDOM.render(
      <CreateTransactionForm setData = { mockFunc } maxAmount = { 500 } beginAmount = { 0 }/>, 
      div
    );
  });       
});