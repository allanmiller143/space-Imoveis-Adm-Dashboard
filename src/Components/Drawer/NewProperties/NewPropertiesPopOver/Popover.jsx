/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Popover from '@mui/material/Popover';
import { MenuItem, MenuList } from '@mui/material';
import { CiMenuKebab } from 'react-icons/ci';
import RecuseDiaolog from '../RecuseDiaolog/RecuseDiaolog';
import { postData } from '../../../../Services/Api';
import { toast } from 'sonner';

export default function BasicPopover( { propertyData,func } ) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openRecuseDialog, setOpenRecuseDialog] = useState(false);
  const token = localStorage.getItem('token');

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleViewRecuse = () => {
    setOpenRecuseDialog(true);
    handleClose(); // Fechar o Popover ao abrir o RecuseDialog
  };

  const handleCloseRecuse = () => {
    setOpenRecuseDialog(false);
  };

  const approve = async () => {
    try{
      const response = await postData(`admin/property/approve/${propertyData.id}`,{},token);
      if(response.status === 200){
        toast.success('Publicação aprovada com sucesso');
        func();

      }else{
        toast.error(response.message);
        console.log(response);
      }

    }catch(e){
      toast.error('Ocorreu um erro insperado, tente novamente mais tarde');

    }
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
          <MenuItem onClick={handleViewRecuse}>Negar Publicação</MenuItem>
          <MenuItem onClick={approve}>Aceitar Publicação</MenuItem>
        </MenuList>
      </Popover>
      <RecuseDiaolog open={openRecuseDialog} handleClose={handleCloseRecuse} propertyData={propertyData} />
    </div>
  );
}
