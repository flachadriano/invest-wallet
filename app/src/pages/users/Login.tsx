import React, { FormEvent, useContext, useState } from 'react';
import {
  Box, Checkbox, FormControlLabel, Link, TextField, Typography,
} from '@mui/material';
import { Container } from '@mui/system';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import { authenticate } from '../../services/User';
import { RoutePath } from '../../RoutePath';
import { SessionContext } from '../../contexts/SessionContext';

export default function Login(): JSX.Element {
  const navigate = useNavigate();
  const sessionData = useContext(SessionContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const signIn = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    setLoading(true);
    setError('');
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);

    authenticate({
      loginOrEmail: data.loginOrEmail.toString(),
      password: data.password.toString(),
      keppConnected: false,
    }).then(() => {
      sessionData.setAuthenticated(true);
      navigate(RoutePath.HOME);
    })
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  };

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box component="form" onSubmit={signIn} noValidate sx={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 8, maxWidth: 300,
      }}>
        <Typography component="h1" variant="h3">Tá investido</Typography>
        <Typography component="h1" variant="h5">Login</Typography>
        <Typography component="h1" variant="h5" color="red">{error}</Typography>
        <TextField name="loginOrEmail" label="Nome de usuário ou e-mail" margin="normal" required autoFocus />
        <TextField name="password" label="Senha" type="password" margin="normal" required />
        <FormControlLabel control={<Checkbox />} label="Lembrar de mim" />
        <LoadingButton type="submit" variant="contained" loading={loading} loadingPosition="start" fullWidth>Entrar</LoadingButton>
        <Link href={RoutePath.SIGNUP} sx={{ mt: 2 }}>Criar conta</Link>
      </Box>
    </Container>
  );
}
