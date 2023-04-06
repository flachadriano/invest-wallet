import React, { SyntheticEvent, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { TextField } from '@mui/material';
import { RoutePath } from '../../RoutePath';
import Form from '../../components/Form';
import Toast from '../../components/Toast';
import { getAsset, putAsset } from '../../services/Asset';

export default function AssetEdit() {
  const navigate = useNavigate();
  const params = useParams();
  const id = parseInt(params.id || '', 10);
  const [isSaving, setIsSaving] = useState(false);

  const { data: broker, isLoading } = useQuery(
    ['asset-get'],
    () => getAsset(id),
    { refetchOnWindowFocus: false }
  );

  if (isLoading) {
    return <span>Loading</span>;
  }

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    setIsSaving(true);

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);
    putAsset(id, {
      name: data.name.toString(),
      category: data.category.toString(),
      subcategory: data.subcategory.toString(),
      legalName: data.legalName.toString(),
      cnpj: data.cnpj.toString()
    }).then(() => {
      Toast.success('Ativo adicionado com sucesso.');
      navigate(RoutePath.ASSETS);
    }).catch(() => Toast.error('Não foi possível alterar o ativo, tente novamente mais tarde.'))
      .finally(() => setIsSaving(false));
  };

  return (
    <Form title="Editar corretora" loading={isLoading || isSaving} onSubmit={onSubmit}>
      <TextField name="name" label="Nome" margin="normal" defaultValue={broker?.name} required autoFocus />
      <TextField name="category" label="Categoria" margin="normal" defaultValue={broker?.category} />
      <TextField name="subcategory" label="Subcategoria" margin="normal" defaultValue={broker?.subcategory} />
      <TextField name="legalName" label="Razão social" margin="normal" defaultValue={broker?.legalName} />
      <TextField name="cnpj" label="CNPJ" margin="normal" defaultValue={broker?.cnpj} />
    </Form>
  );
}
