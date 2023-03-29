import React from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Broker from '../../entities/Broker';
import { RoutePath } from '../../RoutePath';
import { deleteAsset, getAssetList } from '../../services/Asset';

export default function AssetList() {
  const {
    isLoading, data, error, refetch
  } = useQuery(['assets'], getAssetList);

  if (error) {
    return <span>Ocorreu um erro ao carregar os dados, tente novamente mais tarde.</span>;
  }

  const deleteAction = (id: number) => {
    deleteAsset(id).then(() => refetch());
  };

  const renderActions = (params: GridRenderCellParams<Broker>) => (
    <Box>
      <NavLink to={`${RoutePath.ASSETS}/${params.row.id}`}><Button><CreateIcon /></Button></NavLink>
      <Button onClick={() => deleteAction(params.row.id)}><DeleteIcon /></Button>
    </Box>
  );

  const columns: GridColDef<Broker>[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Nome' },
    { field: 'category', headerName: 'Categoria' },
    { field: 'subcategory', headerName: 'Subcategoria' },
    { field: 'legalName', headerName: 'Razão social' },
    { field: 'cnpj', headerName: 'CNPJ', width: 110 },
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
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>Ativos</Typography>
        <NavLink to={`${RoutePath.ASSETS}/novo`}><Button><AddIcon /> Adicionar ativo</Button></NavLink>
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
