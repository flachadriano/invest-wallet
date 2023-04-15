import React, { SyntheticEvent, useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { TextField } from '@mui/material';
import Form from '../../components/Form';
import Toast from '../../components/Toast';
import { RoutePath } from '../../RoutePath';
import { getAssetList } from '../../services/Asset';
import Select from '../../components/Select';
import { getBrokerList } from '../../services/Broker';
import { getOperationList } from '../../services/Operation';
import { getTransaction, putTransaction } from '../../services/Transaction';
import { SessionContext } from '../../contexts/SessionContext';

export default function TransactionEdit() {
  const navigate = useNavigate();
  const sessionData = useContext(SessionContext);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const id = parseInt(params.id || '', 10);

  const { data: transaction, isLoading } = useQuery(
    ['transaction-get'],
    () => getTransaction(sessionData.user?.selectedWalletId || 0, id),
    { refetchOnWindowFocus: false }
  );

  if (isLoading) {
    return <span>Loading</span>;
  }

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);
    putTransaction(sessionData.user?.selectedWalletId || 0, id, {
      brokerId: data.broker_id.toString(),
      assetId: data.asset_id.toString(),
      operation: data.operation.toString(),
      transactionDate: data.transaction_date.toString(),
      unitPrice: data.unit_price.toString(),
      quantity: data.quantity.toString(),
      total: data.total.toString(),
      comment: data.comment.toString()
    }).then(() => {
      Toast.success('Transação alterada com sucesso.');
      navigate(RoutePath.HOME);
    }).catch(() => Toast.error('Não foi possível alterar a transação, tente novamente mais tarde.'))
      .finally(() => setLoading(false));
  };

  return (
    <Form title="Alterar transação" loading={loading} onSubmit={onSubmit}>
      <Select name='broker_id' label='Corretora' fetchData={getBrokerList} fieldKey='id' fieldValue='name' defaultValue={transaction?.broker.id.toString() || ''} />
      <Select name='asset_id' label='Ativo' fetchData={getAssetList} fieldKey='id' fieldValue='name' defaultValue={transaction?.asset.id.toString() || ''} />
      <Select name='operation' label='Operação' fetchData={getOperationList} fieldKey='id' fieldValue='name' defaultValue={transaction?.operation.toString()} />
      <TextField name="transaction_date" label="Data" margin="normal" defaultValue={transaction?.transactionDate} />
      <TextField name="unit_price" label="Preço unitário" margin="normal" defaultValue={transaction?.unitPrice} />
      <TextField name="quantity" label="Quantidade" margin="normal" defaultValue={transaction?.quantity} />
      <TextField name="total" label="Total" margin="normal" defaultValue={transaction?.total} />
      <TextField name="comment" label="Comentário" margin="normal" multiline rows={4} defaultValue={transaction?.comment} />
    </Form>
  );
}
