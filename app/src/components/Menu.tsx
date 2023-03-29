import React, { useContext } from 'react';
import {
  Box, Link
} from '@mui/material';
import { SessionContext } from '../contexts/SessionContext';
import { RoutePath } from '../RoutePath';

export default function Menu() {
  const sessionData = useContext(SessionContext);

  const options = [{
    path: RoutePath.HOME, text: 'Página inicial'
  }, {
    path: RoutePath.WALLETS, text: 'Carteiras'
  }, {
    path: RoutePath.BROKERS, text: 'Corretoras'
  }, {
    path: RoutePath.ASSETS, text: 'Ativos'
  }];

  return (
    <Box hidden={!sessionData.showMenu} sx={{
      display: 'flex',
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
