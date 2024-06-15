/* eslint-disable react/prop-types */

import React from 'react';
import { Grid, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
const TextFieldFilter = ({ onChange,value }) => {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <TextField
        label="Pesquisar por nome"
        variant="outlined"
        fullWidth
        size="small"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          sx: { borderRadius: 3}
        }}
      />
    </Grid>
  );
};

export default TextFieldFilter;

