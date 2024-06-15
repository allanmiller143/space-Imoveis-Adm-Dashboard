/* eslint-disable no-unused-vars */
import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import PropTypes from 'prop-types';
import './DropDownFilter.css';
import { Grid, InputLabel } from '@mui/material';

function DropDownFilter({ data, handleSelectChange, initialValue}) {
  const { label, itens } = data;

  // Utilize o estado local para controlar o valor selecionado
  const [selectedValue, setSelectedValue] = React.useState(initialValue || '');

  // Atualize o valor selecionado quando houver alterações externas
  React.useEffect(() => {
    setSelectedValue(initialValue || '');
  }, [initialValue]);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    handleSelectChange(event);
  };

  return (
   
    <Grid item xs={10} sm={6} md={2}>
      <FormControl fullWidth variant="outlined" size="small">
        <InputLabel>{label} </InputLabel>
        <Select
          label={label}
          value={selectedValue}
          onChange={handleChange}
          sx={{ borderRadius: 3 }}
        >
          {itens.map((item) => (
            <MenuItem key={item.value} value={item.value} sx={{ fontSize: '0.9rem !important' }}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
    
  );
}

DropDownFilter.propTypes = {
  data: PropTypes.shape({
    label: PropTypes.string.isRequired,
    itens: PropTypes.array.isRequired,
  }).isRequired,
  handleSelectChange: PropTypes.func.isRequired,
  initialValue: PropTypes.string, // Propriedade para o valor inicial
};

export default DropDownFilter;
