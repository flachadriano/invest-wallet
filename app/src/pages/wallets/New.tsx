import React, { SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';
import Form from '../../components/Form';
import Toast from '../../components/Toast';
import { RoutePath } from '../../RoutePath';
import { postWallet } from '../../services/Wallet';

export default function WalletNew() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);
    postWallet({
      name: data.name.toString(),
    }).then(() => {
      Toast.success('Carteira adicionada com sucesso.');
      navigate(RoutePath.WALLETS);
    }).catch(() => Toast.error('Não foi possível adicionar a carteira, tente novamente mais tarde.'))
      .finally(() => setLoading(false));
  };

  return (
    <Form title="Adicionar carteira" loading={loading} onSubmit={onSubmit}>
      <TextField name="name" label="Nome" margin="normal" required autoFocus />
    </Form>
  );
}
