import React, { useContext } from 'react';
import {
  Box, Link
} from '@mui/material';
import { SessionContext } from '../contexts/SessionContext';
import { RoutePath } from '../RoutePath';

export default function Menu() {
  const sessionData = useContext(SessionContext);

  const options: { path: string, text: string }[] = [
    { path: RoutePath.HOME, text: 'Página inicial' },
    { path: RoutePath.BROKERS, text: 'Corretoras' },
    { path: RoutePath.ASSETS, text: 'Ativos' },
    { path: RoutePath.TRANSACTIONS, text: 'Listar transações' }
  ];

  return (
    <Box sx={{
      display: sessionData.showMenu ? 'flex' : 'none',
      flexDirection: 'column',
      p: 3,
      bgcolor: 'primary.main'
    }}>
      {options.map(({ path, text }) => (
        <Link
          key={path}
          color="primary.contrastText"
          underline="none"
          href={path}
          sx={{ p: 1 }}
        >
          {text}
        </Link>
      ))}
    </Box>
  );
}
