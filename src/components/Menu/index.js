import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Tabs, Tab, Paper } from '@material-ui/core';

import { configRoutes } from '../../route/config';


const Menu = () => {
  const history = useHistory();
  const [value, setValue] = useState(history.location && history.location.pathname ? 
    history.location.pathname :
    configRoutes[0].path);

  return <Paper>
    <Tabs
      value = {value}
      onChange = {(event, newValue) => {
        setValue(newValue);
        history.push(newValue);
      }}
      textColor = 'primary'
      indicatorColor = 'primary'
      centered
    >
      { configRoutes.map(route =>
        <Tab key = { route.path } label = { route.title } value = { route.path }/> 
      )}
    </Tabs>
  </Paper>;
};

export default Menu;