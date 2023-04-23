import React, { SyntheticEvent, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';
import Form from '../../components/Form';
import Toast from '../../components/Toast';
import { RoutePath } from '../../RoutePath';
import { getAssetList } from '../../services/Asset';
import Select from '../../components/Select';
import { getBrokerList } from '../../services/Broker';
import { getOperationList } from '../../services/Operation';
import { postTransaction } from '../../services/Transaction';
import { SessionContext } from '../../contexts/SessionContext';

export default function TransactionNew() {
  const navigate = useNavigate();
  const sessionData = useContext(SessionContext);
  const [loading, setLoading] = useState(false);

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);
    postTransaction(sessionData.user?.selectedWalletId || 0, {
      walletId: sessionData.user?.selectedWalletId || 0,
      brokerId: data.broker_id.toString(),
      assetId: data.asset_id.toString(),
      operation: data.operation.toString(),
      transactionDate: data.transaction_date.toString(),
      unitPrice: data.unit_price.toString(),
      quantity: data.quantity.toString(),
      total: data.total.toString(),
      comment: data.comment.toString()
    }).then(() => {
      Toast.success('Transação adicionada com sucesso.');
      navigate(RoutePath.TRANSACTIONS);
    }).catch(() => Toast.error('Não foi possível adicionar a transação, tente novamente mais tarde.'))
      .finally(() => setLoading(false));
  };

  return (
    <Form title="Adicionar transação" loading={loading} onSubmit={onSubmit}>
      <Select name='broker_id' label='Corretora' fetchData={getBrokerList} fieldKey='id' fieldValue='name' />
      <Select name='asset_id' label='Ativo' fetchData={getAssetList} fieldKey='id' fieldValue='name' />
      <Select name='operation' label='Operação' fetchData={getOperationList} fieldKey='id' fieldValue='name' />
      <TextField name="transaction_date" label="Data" margin="normal" />
      <TextField name="unit_price" label="Preço unitário" margin="normal" />
      <TextField name="quantity" label="Quantidade" margin="normal" />
      <TextField name="total" label="Total" margin="normal" />
      <TextField name="comment" label="Comentário" margin="normal" multiline rows={4} />
    </Form>
  );
}
