import { FormEvent } from "react";
import { Box, Button, Input, InputLabel } from "@mui/material";

export default function Login() {
  const signIn = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(new FormData(event.currentTarget));
  }

  return (
    <form onSubmit={signIn} >
      <InputLabel htmlFor="loginOrEmail">Login ou e-mail</InputLabel>
      <Input id="loginOrEmail" name="loginOrEmail" required />

      <InputLabel htmlFor="password">Senha</InputLabel>
      <Input type="password" id="password" name="password" required />

      <Box>
        <Button type="submit">Entrar</Button>
      </Box>
    </form>
  )
}