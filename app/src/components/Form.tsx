import { LoadingButton } from '@mui/lab';
import { Box, Typography } from '@mui/material';
import React from 'react';

interface IForm {
  title: string;
  onSubmit: (values: any) => void;
  loading: boolean;
  children?: React.ReactNode;
}

export default function Form({
  title, onSubmit, children, loading
}: IForm) {
  return (
    <Box component="form" onSubmit={onSubmit} sx={{
      display: 'flex', flexDirection: 'column'
    }}>
      <Typography component="h1" variant="h5">{title}</Typography>

      {children}

      <LoadingButton
        type="submit"
        variant="contained"
        loading={loading}
        loadingPosition="start"
        startIcon={<span />}
        sx={{ mt: 2 }}
        fullWidth>
          Salvar
      </LoadingButton>
    </Box>
  );
}
