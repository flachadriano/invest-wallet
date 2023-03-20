import React, { useContext } from 'react';
import {
  AppBar, Box, Button, Toolbar, Typography,
} from '@mui/material';
import { SessionContext } from '../contexts/SessionContext';

export default function Header() {
  const sessionData = useContext(SessionContext);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Tá investido
          </Typography>
          {sessionData.token && <Button color="inherit" onClick={sessionData.signOut}>Sair</Button>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
