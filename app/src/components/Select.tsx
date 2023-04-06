import React from 'react';
import {
  Box, FormControl, InputLabel, MenuItem, SelectChangeEvent
} from '@mui/material';
import MuiSelect from '@mui/material/Select';
import { useQuery } from '@tanstack/react-query';

interface ISelect {
  name: string;
  label: string;
  fetchData: () => Promise<any[]>;
  fieldKey: string;
  fieldValue: string;
}

export default function Select({
  name, label, fieldKey, fieldValue, fetchData
}: ISelect) {
  const [value, setValue] = React.useState('');

  const { data } = useQuery([name], fetchData);

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth margin='normal'>
        <InputLabel id={`label-${name}`}>{label}</InputLabel>
        <MuiSelect
          labelId={`label-${name}`}
          id={name}
          name={name}
          value={value}
          label={label}
          onChange={handleChange}
        >
          {data?.map((item) => (
            <MenuItem
              key={item[fieldKey]}
              value={item[fieldKey]}
            >
              {item[fieldValue]}
            </MenuItem>
          ))}
        </MuiSelect>
      </FormControl>
    </Box>
  );
}
