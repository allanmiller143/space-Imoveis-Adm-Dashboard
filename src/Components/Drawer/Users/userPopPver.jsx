/* eslint-disable react/prop-types */
import React, {  } from 'react';
import Popover from '@mui/material/Popover';
import { MenuItem, MenuList } from '@mui/material';
import { CiMenuKebab } from 'react-icons/ci';

export default function UserPopPver() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };



  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <div onClick={handleClick} size="small" style={{ cursor: 'pointer' }}>
        <CiMenuKebab />
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <MenuList>
          <MenuItem onClick={() => handleClose()}>Enviar mensagem</MenuItem>
          <MenuItem onClick={handleClose}>Ver detalhes</MenuItem>
        </MenuList>
      </Popover>
    </div>
  );
}
