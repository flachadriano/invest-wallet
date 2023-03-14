import { FormEvent } from "react";
import { Box, Button, Container, Input, InputLabel, TextField } from "@mui/material";

export default function Login() {
  const signIn = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(new FormData(event.currentTarget));
  }

  return (
    <Box component="form" onSubmit={signIn} noValidate sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <TextField name="loginOrEmail" label="Login ou e-mail" required autoFocus />
      <TextField name="password" label="Senha" type="password" required />
      <Button type="submit">Entrar</Button>
    </Box>
  )
}