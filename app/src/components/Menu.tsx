import React, { useContext } from 'react';
import {
  Box, Link
} from '@mui/material';
import { SessionContext } from '../contexts/SessionContext';

export default function Menu() {
  const sessionData = useContext(SessionContext);

  return (
    <Box hidden={!sessionData.showMenu} sx={{ padding: 3, bgcolor: 'primary.main' }}>
      <Link color="primary.contrastText" underline="none">Página inicial</Link>
    </Box>
  );
}
