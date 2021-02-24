import React from 'react';
import ReactDOM from 'react-dom';

import SearchForm from '../components/SearchForm';


const mockFunc = () => {
  console.log('mock func');
};
const users = [
  {
    id: 0,
    name: 'test'
  }
];

describe('SearchForm', () => {
  it('render SearchForm without crushing', () => {
    const div = document.createElement('div');    
    ReactDOM.render(
      <SearchForm 
        searchUser = { mockFunc } 
        selectUser = { mockFunc } 
        clearUsers = { mockFunc } 
        users = { users }
        beginUser = { '' }
      />, 
      div
    );
  });       
});