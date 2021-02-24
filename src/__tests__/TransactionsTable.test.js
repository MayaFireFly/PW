import React from 'react';
import ReactDOM from 'react-dom';

import TransactionsTable from '../components/TransactionsTable';


const transactions = [{
  id: 0, 
  date: '2020-12-12', 
  username: 'name', 
  amount: 100, 
  balance: 200
}];
const mockFunc = () => {
  console.log('mock func');
};

describe('TransactionsTable', () => {
  it('render TransactionsTable without crushing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TransactionsTable transactions = { transactions } selectTransaction = { mockFunc }/>, div);
  });       
});