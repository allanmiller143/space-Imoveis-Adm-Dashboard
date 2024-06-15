/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { Box, Dialog, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';

function AdvertiserDialog({ advertiser, open, handleClose }) {
  // Verifica se advertiser.seller está definido antes de acessar suas propriedades
  const seller = advertiser?.seller;
  const type = seller?.type === 'realstate' 
    ? 'Imobiliária' 
    : seller?.type === 'realtor' 
      ? 'Corretor' 
      : 'Proprietário';

  return (
    <Dialog fullWidth open={open} onClose={handleClose}>
      <DialogTitle sx={{
        color: '#fff',
        backgroundColor: '#092f46',
        fontSize: '1.2rem',
        display: 'flex',
        justifyContent: 'space-between',
        gap: '10px',
        marginBottom: '20px'
      }}>
        Detalhes do anunciante
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{ position: 'absolute', right: 8, top: 8, color: '#fff' }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ position: 'relative' }}>
          {seller?.type !== 'realstate' ? (
            <Typography variant="body1" sx={{ mb: 1 }}>
              <span style={{ fontWeight: 'bold' }}>Nome: </span>{seller?.name}
            </Typography>
          ) : (
            <Typography variant="body1" sx={{ mb: 1 }}>
              <span style={{ fontWeight: 'bold' }}>Razão social: </span>{seller?.company_name}
            </Typography>
          )}

          <Typography variant="body1" sx={{ mb: 1, position: 'absolute', right: 0, top: 0 }}>
            <span style={{ fontWeight: 'bold' }}>{type}</span>
          </Typography>

          <Typography variant="body1" sx={{ mb: 1 }}>
            <span style={{ fontWeight: 'bold' }}>Email: </span>{seller?.email}
          </Typography>

          <Typography variant="body1" sx={{ mb: 1 }}>
            <span style={{ fontWeight: 'bold' }}>Endereço: </span>{seller?.address}, {seller?.city} - {seller?.state}
          </Typography>

          <Typography variant="body1" sx={{ mb: 1 }}>
            <span style={{ fontWeight: 'bold' }}>Telefone: </span>{seller?.phone}
          </Typography>
          
          <Typography variant="body1" sx={{ mb: 1 }}>
            <span style={{ fontWeight: 'bold' }}>anúncios: </span> {seller?.properties.length}
          </Typography>

        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default AdvertiserDialog;
