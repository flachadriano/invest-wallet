import React, { useContext } from 'react';
import {
  AppBar, Box, Button, IconButton, Toolbar, Typography,
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { SessionContext } from '../contexts/SessionContext';
import { ColorModeContext } from '../contexts/ColorModeContext';

export default function Header() {
  const sessionData = useContext(SessionContext);
  const colorMode = useContext(ColorModeContext);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Tá investido
          </Typography>
          <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleMode} color="inherit">
            {colorMode.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          {sessionData.token && <Button color="inherit" onClick={sessionData.signOut}>Sair</Button>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
