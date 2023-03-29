import React from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { RoutePath } from '../../RoutePath';
import { deleteWallet, getWalletList } from '../../services/Wallet';
import Wallet from '../../entities/Wallet';

export default function WalletList() {
  const {
    isLoading, data, error, refetch
  } = useQuery(['wallets'], getWalletList);

  if (error) {
    return <span>Ocorreu um erro ao carregar os dados, tente novamente mais tarde.</span>;
  }

  const deleteAction = (id: number) => {
    deleteWallet(id).then(() => refetch());
  };

  const renderActions = (params: GridRenderCellParams<Wallet>) => (
    <Box>
      <NavLink to={`${RoutePath.WALLETS}/${params.row.id}`}><Button><CreateIcon /></Button></NavLink>
      <Button onClick={() => deleteAction(params.row.id)}><DeleteIcon /></Button>
    </Box>
  );

  const columns: GridColDef<Wallet>[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Nome' },
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
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>Carteiras</Typography>
        <NavLink to={`${RoutePath.WALLET_NEW}`}><Button><AddIcon /> Adicionar carteira</Button></NavLink>
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
