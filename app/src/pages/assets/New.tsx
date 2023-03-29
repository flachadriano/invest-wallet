import React, { SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';
import Form from '../../components/Form';
import Toast from '../../components/Toast';
import { RoutePath } from '../../RoutePath';
import { postAsset } from '../../services/Asset';

export default function AssetNew() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);
    postAsset({
      name: data.name.toString(),
      category: data.category.toString(),
      subcategory: data.subcategory.toString(),
      legalName: data.legalName.toString(),
      cnpj: data.cnpj.toString()
    }).then(() => {
      Toast.success('Ativo adicionado com sucesso.');
      navigate(RoutePath.ASSETS);
    }).catch(() => Toast.error('Não foi possível adicionar o ativo, tente novamente mais tarde.'))
      .finally(() => setLoading(false));
  };

  return (
    <Form title="Adicionar ativo" loading={loading} onSubmit={onSubmit}>
      <TextField name="name" label="Nome" margin="normal" required autoFocus />
      <TextField name="category" label="Categoria" margin="normal" />
      <TextField name="subcategory" label="Subcategoria" margin="normal" />
      <TextField name="legalName" label="Razão social" margin="normal" />
      <TextField name="cnpj" label="CNPJ" margin="normal" />
    </Form>
  );
}
