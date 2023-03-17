import React, { FormEvent, useState } from 'react';
import {
  Box, Button, TextField, Typography,
} from '@mui/material';
import { Container } from '@mui/system';
import * as UserService from '../../services/User';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '../../RoutePath';

export default function SignUp(): JSX.Element {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const signIn = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);

    UserService.create({
      name: data.name.toString(),
      email: data.email.toString(),
      login: data.login.toString(),
      password: data.password.toString(),
    }).then(() => navigate(RoutePath.LOGIN))
      .catch((e: Error) => setError(e.message));
  };

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box component="form" onSubmit={signIn} sx={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 8, maxWidth: 300,
      }}>
        <Typography component="h1" variant="h3">Tá investido</Typography>
        <Typography component="h1" variant="h5">Informe seus dados</Typography>
        <Typography component="h1" variant="h5" color="red">{error}</Typography>
        <TextField name="name" label="Nome" margin="normal" required autoFocus />
        <TextField name="email" label="E-mail" margin="normal" type="email" required />
        <TextField name="login" label="Nome de usuário" margin="normal" required />
        <TextField name="password" label="Senha" type="password" margin="normal" required />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Cadastrar</Button>
      </Box>
    </Container>
  );
}
