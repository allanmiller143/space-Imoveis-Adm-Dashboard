import React from 'react';
import Box from '@mui/material/Box';
import logo from '../../../assets/logo.png';

const NoConversationSelected = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        width: '100%',
        height: '90vh',
        textAlign: 'center',
        fontFamily: 'Roboto, sans-serif', // Fonte Roboto como exemplo, pode ser alterada conforme desejado
      }}
    >
      <img src={logo} alt="Logo" style={{ width: 300, height: 250}} />

    </Box>
  );
};

export default NoConversationSelected;
