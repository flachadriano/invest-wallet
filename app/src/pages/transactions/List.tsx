import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import CreateIcon from '@mui/icons-material/Create';
import { getTransactionList } from '../../services/Transaction';
import { SessionContext } from '../../contexts/SessionContext';
import Transaction from '../../entities/Transaction';
import { getOperationList } from '../../services/Operation';
import { RoutePath } from '../../RoutePath';

export default function TransactionList() {
  const sessionData = useContext(SessionContext);

  const {
    isLoading, data, error
  } = useQuery(
    ['transactions'],
    () => getTransactionList(sessionData.user?.selectedWalletId || 0),
    { refetchOnWindowFocus: false }
  );

  const { data: operations } = useQuery(['operations'], getOperationList, { refetchOnWindowFocus: false });

  if (error) {
    return <span>Ocorreu um erro ao carregar os dados, tente novamente mais tarde.</span>;
  }

  const renderActions = (params: GridRenderCellParams<Transaction>) => (
    <Box>
      <NavLink to={`${RoutePath.TRANSACTIONS}/${params.row.id}`}><Button><CreateIcon /></Button></NavLink>
    </Box>
  );

  const columns: GridColDef<Transaction>[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'broker.name', headerName: 'Corretora', renderCell: (params) => params.row.broker.name },
    { field: 'asset.name', headerName: 'Ativo', renderCell: (params) => params.row.asset.name },
    { field: 'operation', headerName: 'Operação', renderCell: (params) => operations?.find((o) => o.id === params.row.operation)?.name },
    { field: 'transactionDate', headerName: 'Data', renderCell: (params) => new Date(params.row.transactionDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) },
    { field: 'quantity', headerName: 'Quantidade' },
    { field: 'unitPrice', headerName: 'Valor unitário' },
    { field: 'total', headerName: 'Total' },
    {
      field: '', headerName: '', width: 150, renderCell: renderActions
    },
  ];

  return (
    <Box sx={{
      height: '100%',
      display: 'flex',
      flex: 1,
      flexDirection: 'column'
    }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>Transações</Typography>
      </Box>

      <DataGrid
        columns={columns}
        rows={data || []}
        loading={isLoading}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}
