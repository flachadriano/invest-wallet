import React, { useContext } from 'react';
import {
  AppBar, Box, Button, IconButton, Link, Toolbar, Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { SessionContext } from '../contexts/SessionContext';
import { ColorModeContext } from '../contexts/ColorModeContext';
import { RoutePath } from '../RoutePath';

export default function Header() {
  const sessionData = useContext(SessionContext);
  const colorMode = useContext(ColorModeContext);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {sessionData.user && (
            <IconButton color="inherit" onClick={sessionData.toggleMenu} sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Tá investido
          </Typography>
          {sessionData.user && (
            <Link href={RoutePath.TRANSACTION_NEW}>
              <IconButton sx={{ mr: 2 }}>
                <AddIcon />
              </IconButton>
            </Link>
          )}
          <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleMode} color="inherit">
            {colorMode.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          {sessionData.user
            ? <Button color="inherit" onClick={sessionData.signOut}>Sair</Button>
            : <Button color="inherit" onClick={sessionData.signOut}>Entrar</Button>
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}
