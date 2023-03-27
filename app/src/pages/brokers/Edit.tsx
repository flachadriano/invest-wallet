import React, { SyntheticEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { TextField } from '@mui/material';
import { RoutePath } from '../../RoutePath';
import Form from '../../components/Form';
import Toast from '../../components/Toast';
import { getBroker, putBroker } from '../../services/Broker';

export default function BrokerEdit() {
  const navigate = useNavigate();
  const params = useParams();
  const id = parseInt(params.id || '', 10);

  const { data: broker, isLoading } = useQuery(['broker-get'], () => getBroker(id));

  if (isLoading) {
    return <span>Loading</span>;
  }

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);
    putBroker(id, {
      legalName: data.legalName.toString(),
      name: data.name.toString(),
      cnpj: data.cnpj.toString()
    }).then(() => {
      Toast.success('Corretora adicionada com sucesso.');
      navigate(RoutePath.BROKERS);
    }).catch(() => Toast.error('Não foi possível alterar a corretora, tente novamente mais tarde.'));
  };

  return (
    <Form title="Editar corretora" loading={isLoading} onSubmit={onSubmit}>
      <TextField name="name" label="Nome" margin="normal" defaultValue={broker?.name} required autoFocus />
      <TextField name="legalName" label="Razão social" margin="normal" defaultValue={broker?.legalName} />
      <TextField name="cnpj" label="CNPJ" margin="normal" defaultValue={broker?.cnpj} />
    </Form>
  );
}
