import { Email } from '@material-ui/icons';
import React from 'react';
import ReactDOM from 'react-dom';

import UserInfo from '../components/UserInfo';


describe('UserInfo', () => {
  it('render UserInfo without crushing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<UserInfo 
      user = {{name: 'test', email: 'test@test.com', balance: 500 }} 
      gotoTransactions = {() => console.log('gotoTransactions')}
    />, div);
  });       
});