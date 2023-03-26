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
      acronym: data.acronym.toString(),
      name: data.name.toString(),
      cnpj: data.cnpj.toString()
    }).then(() => {
      Toast.success('Corretora adicionada com sucesso.');
      navigate(RoutePath.BROKERS);
    });
    // TODO catch
    // TODO make name optional
  };

  return (
    <Form title="Adicionar corretora" loading={false} onSubmit={onSubmit}>
      <TextField name="acronym" label="Nome" margin="normal" required autoFocus />
      <TextField name="name" label="Razão social" margin="normal" />
      <TextField name="cnpj" label="CNPJ" margin="normal" />
    </Form>
  );
}
