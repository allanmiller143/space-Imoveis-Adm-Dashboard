import React from 'react';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';
import './TextFieldForm.css'; // Importe o arquivo CSS aqui
import '@mui/material/TextField';
function TextFieldForm({ label, onChange,value,white }) {
  return (
    <div className="TextFieldForm__container"> 
      <TextField
        className={`TextFieldForm__textField ${white ? 'whiteTextForm' : ''} `} // Aplique a classe CSS ao TextField
        label={label}
        se
        id="outlined-size-small"
        defaultValue=""
        size="small"
        onChange={onChange}
        value={value}
        
      />
    </div>
  );
}

TextFieldForm.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  white: PropTypes.bool
};

export default TextFieldForm;
