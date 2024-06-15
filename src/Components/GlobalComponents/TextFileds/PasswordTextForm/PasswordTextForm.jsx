import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa';
import './PasswordTextForm.css'; // Importe o arquivo CSS aqui

function PasswordTextForm({ label, onChange, value }) {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="PasswordTextFieldForm__container">
      <TextField
        sx={{backgroundColor: 'white'}}
        className="PasswordTextFieldForm__textField"
        label={label}
        id="outlined-size-small"
        defaultValue=""
        size="small"
        value={value}
        type={showPassword ? 'text' : 'password'}
        onChange={onChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={handleTogglePassword}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
}

PasswordTextForm.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};

export default PasswordTextForm;
