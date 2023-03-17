import React from 'react';
import { type FormEvent } from 'react';
import {
  Box, Button, Checkbox, FormControlLabel, TextField, Typography,
} from '@mui/material';
import { Container } from '@mui/system';
import { authenticate } from '../services/User';

export default function Login(): JSX.Element {
  const signIn = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
    authenticate({
      loginOrEmail: data.loginOrEmail.toString(),
      password: data.password.toString(),
      keppConnected: false,
    });
  };

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box component="form" onSubmit={signIn} noValidate sx={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 8, maxWidth: 300,
      }}>
        <Typography component="h1" variant="h3">Tá investido</Typography>
        <Typography component="h1" variant="h5">Login</Typography>
        <TextField name="loginOrEmail" label="Nome de usuário ou e-mail" margin="normal" required autoFocus />
        <TextField name="password" label="Senha" type="password" margin="normal" required />
        <FormControlLabel
          control={<Checkbox />}
          label="Lembrar de mim"
        />
        <Button type="submit" variant="contained" fullWidth>Entrar</Button>
      </Box>
    </Container>
  );
}
