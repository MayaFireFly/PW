import React from 'react';

import { Container } from '@material-ui/core';
import Router from './route/Router';


const App = () => {
  return(
    <Container component = 'main' maxWidth = 'md'>      
      <Router/>     
    </Container>    
  );
};

export default App;