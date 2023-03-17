import React, { FormEvent } from 'react';
import {
  Box, Button, TextField, Typography,
} from '@mui/material';
import { Container } from '@mui/system';
import * as UserService from '../../services/User';

export default function SignUp(): JSX.Element {
  const signIn = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
    UserService.create({
      name: data.name.toString(),
      email: data.email.toString(),
      login: data.login.toString(),
      password: data.password.toString(),
    });
  };

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box component="form" onSubmit={signIn} noValidate sx={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 8, maxWidth: 300,
      }}>
        <Typography component="h1" variant="h3">Tá investido</Typography>
        <Typography component="h1" variant="h5">Informe seus dados</Typography>
        <TextField name="name" label="Nome" margin="normal" required autoFocus />
        <TextField name="email" label="E-mail" margin="normal" required />
        <TextField name="login" label="Nome de usuário" margin="normal" required />
        <TextField name="password" label="Senha" type="password" margin="normal" required />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Cadastrar</Button>
      </Box>
    </Container>
  );
}
