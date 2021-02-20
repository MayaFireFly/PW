import React from 'react';

import { Typography, Box } from '@material-ui/core';


const Copyright = () => {
  return <Box>
    <Typography variant = 'body2' color = 'textSecondary' align = 'center'>
      {`Copyright © ${new Date().getFullYear()}.`}
    </Typography>
  </Box>;
};

export default Copyright;