/* eslint-disable react/prop-types */
import { Box, Dialog, DialogContent, DialogTitle, Grid, IconButton, Typography } from '@mui/material';
import { CheckCircle, Cancel } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
import { PiBed, PiShower } from 'react-icons/pi';
import { IoCarOutline } from 'react-icons/io5';

function PropertyDetailDialog({ advertiser, open, handleClose }) {
  // Lista de URLs de imagens de exemplo

  const amenities = [
    { label: 'Piscina', value: advertiser.pool },
    { label: 'Churrasqueira', value: advertiser.grill },
    { label: 'Ar condicionado', value: advertiser.air_conditioning },
    { label: 'Jardim', value: advertiser.garden },
    { label: 'Área Gourmet', value: advertiser.gourmet_area },
    { label: 'Condomínio Fechado', value: advertiser.gated_community },
    { label: 'Sala de eventos', value: advertiser.eventArea },
    { label: 'Academia', value: advertiser.gym },
    { label: 'Energia Solar', value: advertiser.solarEnergy },
    { label: 'Sacada', value: advertiser.porch },
    { label: 'Portaria 24h', value: advertiser.concierge },
    { label: 'Quintal', value: advertiser.yard },
    { label: 'Laje', value: advertiser.slab },
    { label: 'Playground', value: advertiser.playground },
    { label: 'Varanda', value: advertiser.concierge },
  ];

  return (
    <Dialog fullWidth open={open} onClose={handleClose}>
      <DialogTitle sx = {{color: '#fff', backgroundColor: '#092f46', fontSize: '1.2rem',display: 'flex',justifyContent: 'space-between',gap: '10px',marginBottom: '20px'}}>  
          Detalhes no anúncio
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: '#fff',
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box>
          <Typography sx={{ mb: 1, fontWeight: 'bold', fontSize: '1.1rem' }}>
            {advertiser.address}, {advertiser.house_number}, {advertiser.city} - {advertiser.state}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <span style={{ fontWeight: 'bold' }}>Descrição: </span>{advertiser.description}
          </Typography>

          <Typography variant="body1" sx={{ mb: 1 }}>
            <span style={{ fontWeight: 'bold' }}>Tipo de imóvel: </span>{advertiser.property_type}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <span style={{ fontWeight: 'bold' }}> Tipo de anúncio: </span> {advertiser.announcement_type}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <span style={{ fontWeight: 'bold' }}> Preco de venda: </span> {advertiser.sell_price ? `R$ ${advertiser.sell_price.toLocaleString('pt-BR')}` : ''}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <span style={{ fontWeight: 'bold' }}> Preco de aluguel: </span>{advertiser.rent_price ? `R$ ${advertiser.rent_price.toLocaleString('pt-BR')}` : ''}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <span style={{ fontWeight: 'bold' }}> Tamanho: </span> {advertiser.size} m²
          </Typography>
          <Typography variant="body1" sx={{ mb: 0 }}>
            <span style={{ fontWeight: 'bold' }}> Aceita financiamento: </span> {advertiser.financiable ? 'Sim' : 'Não'}
          </Typography>

          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <PiShower />
              <p>{advertiser.bathrooms}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <IoCarOutline />
              <p>{advertiser.parking_spaces}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <PiBed />
              <p>{advertiser.bedrooms}</p>
            </div>
          </div>

          <Typography variant="h6" gutterBottom style={{ marginTop: '20px', color: '#092f46', fontWeight: 'bold', marginBottom: '10px' }}>
            Comodidades
          </Typography>

          <Grid container spacing={2}>
            {amenities.map((amenity, index) => (
              <Grid item xs={6} key={index}>
                <Box display="flex" alignItems="center" gap={1}>
                  {amenity.value ? <CheckCircle color="success" /> : <Cancel color="error" />}
                  <Typography>{`${amenity.label}`}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>

          <Typography variant="h6" gutterBottom style={{ marginTop: '20px', color: '#092f46', fontWeight: 'bold' }}>
            Galeria de imagens
          </Typography>
          {advertiser.pictures && advertiser.pictures.length > 0 && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <img
                  src={advertiser.pictures[0].url}
                  alt="Imagem 0"
                  style={{
                    width: '100%',
                    height: '300px',
                    objectFit: 'cover',
                  }}
                />
              </Grid>
              {advertiser.pictures.slice(1).map((image, index) => (
                <Grid item key={index} xs={6} sm={4} md={3}>
                  <img
                    src={image.url}
                    alt={`Imagem ${index + 1}`}
                    style={{
                      width: '100%',
                      height: '125px',
                      objectFit: 'cover',
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default PropertyDetailDialog;
