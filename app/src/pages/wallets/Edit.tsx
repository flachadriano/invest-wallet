import React, { SyntheticEvent, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { TextField } from '@mui/material';
import { RoutePath } from '../../RoutePath';
import Form from '../../components/Form';
import Toast from '../../components/Toast';
import { getWallet, putWallet } from '../../services/Wallet';

export default function WalletEdit() {
  const navigate = useNavigate();
  const params = useParams();
  const id = parseInt(params.id || '', 10);
  const [isSaving, setIsSaving] = useState(false);

  const { data: broker, isLoading } = useQuery(['wallet-get'], () => getWallet(id));

  if (isLoading) {
    return <span>Loading</span>;
  }

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    setIsSaving(true);

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);
    putWallet(id, {
      name: data.name.toString(),
    }).then(() => {
      Toast.success('Carteira adicionada com sucesso.');
      navigate(RoutePath.WALLETS);
    }).catch(() => Toast.error('Não foi possível alterar a carteira, tente novamente mais tarde.'))
      .finally(() => setIsSaving(false));
  };

  return (
    <Form title="Editar carteira" loading={isLoading || isSaving} onSubmit={onSubmit}>
      <TextField name="name" label="Nome" margin="normal" defaultValue={broker?.name} required autoFocus />
    </Form>
  );
}
