import React, { SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';
import Form from '../../components/Form';
import { postBroker } from '../../services/Broker';
import Toast from '../../components/Toast';
import { RoutePath } from '../../RoutePath';

export default function BrokerNew() {
  const navigate = useNavigate();

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);
    postBroker({
      legalName: data.legalName.toString(),
      name: data.name.toString(),
      cnpj: data.cnpj.toString()
    }).then(() => {
      Toast.success('Corretora adicionada com sucesso.');
      navigate(RoutePath.BROKERS);
    }).catch(() => Toast.error('Não foi possível adicionar a corretora, tente novamente mais tarde.'));
  };

  return (
    <Form title="Adicionar corretora" loading={false} onSubmit={onSubmit}>
      <TextField name="name" label="Nome" margin="normal" required autoFocus />
      <TextField name="legalName" label="Razão social" margin="normal" />
      <TextField name="cnpj" label="CNPJ" margin="normal" />
    </Form>
  );
}
