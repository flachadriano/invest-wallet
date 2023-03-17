import React, { FormEvent, useState } from 'react';
import {
  Box, Link, TextField, Typography,
} from '@mui/material';
import { Container } from '@mui/system';
import LoadingButton from '@mui/lab/LoadingButton';
import { useNavigate } from 'react-router-dom';
import * as UserService from '../../services/User';
import { RoutePath } from '../../RoutePath';
import Toast from '../../components/Toast';

export default function SignUp(): JSX.Element {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const signIn = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    setLoading(true);
    setError('');
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);

    UserService.create({
      name: data.name.toString(),
      email: data.email.toString(),
      login: data.login.toString(),
      password: data.password.toString(),
    }).then(() => {
      Toast.success('Usuário cadastrado com sucesso');
      navigate(RoutePath.LOGIN);
    }).catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
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
        <LoadingButton type="submit" variant="contained" loading={loading} loadingPosition="start" fullWidth sx={{ mt: 2 }}>Cadastrar</LoadingButton>
        <Link href={RoutePath.LOGIN} sx={{ mt: 2 }}>Cancelar</Link>
      </Box>
    </Container>
  );
}
