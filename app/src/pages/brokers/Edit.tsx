import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { TextField } from '@mui/material';
import Form from '../../components/Form';
import { getBroker } from '../../services/Broker';

export default function BrokerEdit() {
  const params = useParams();
  const id = parseInt(params.id || '', 10);

  const { data, isLoading } = useQuery(['broker-get'], () => getBroker(id));

  if (isLoading) {
    return <span>Loading</span>;
  }

  const onSubmit = (values: any) => {
    console.log('values', values);
  };

  return (
    <Form title="Editar corretora" loading={isLoading} onSubmit={onSubmit}>
      <TextField name="acronym" label="Nome" margin="normal" required autoFocus defaultValue={data?.acronym} />
      <TextField name="name" label="Razão social" margin="normal" required defaultValue={data?.name} />
      <TextField name="cnpj" label="CNPJ" margin="normal" required defaultValue={data?.cnpj} />
    </Form>
  );
}
