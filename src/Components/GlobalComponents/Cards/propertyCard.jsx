/* eslint-disable react/prop-types */
import { Box, Button, Card, CardContent, CardMedia, Typography } from '@mui/material';
import React, { useState } from 'react';
import BasicPopover from '../../Drawer/NewProperties/NewPropertiesPopOver/Popover';
import AdvertiverDialog from '../../Drawer/NewProperties/AdvertiserDialog/AdvertiserDialog';
import PropertyDetailDialog from '../../Drawer/NewProperties/PropertyDetailDialog/PropertyDetailDialog';
import { PiShower, PiBed } from 'react-icons/pi';
import { IoCarOutline } from 'react-icons/io5';

function PropertyCard({ property, func }) {

  const [open, setOpen] = useState(false);
  const [openPropertyDetail, setOpenPropertyDetail] = useState(false);

  const handleViewAdvertiser = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleViewProperty = () => {
    setOpenPropertyDetail(true);
  };

  const handleCloseProperty = () => {
    setOpenPropertyDetail(false);
  };

  function formatPrice(price) {
    if (price === null || price === '' || price === undefined) {
      return 'Não disponível';
    }
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  return (
    <>
      <Card>
        <CardMedia
          component="img"
          image={property.pictures && property.pictures[0].url}
          alt={property.name}
          style={{ width: '100%', height: '160px', objectFit: 'cover' }}
        />
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography sx={{ fontWeight: 'bold', color: 'black', fontSize: '12px',paddingRight: '5px' }}>{`${property.address} - ${property.city}`}</Typography>
            <BasicPopover propertyData={property} func = {func}/>
          </Box>
          <Typography 
            variant="body2" 
            color="textSecondary" 
            component="div" 
            sx={{
              color: 'black',
              fontSize: '12px',
              textOverflow: 'ellipsis', 
              overflow: 'hidden', 
              display: '-webkit-box',
              WebkitLineClamp: 4,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {property.description}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="div" sx={{ mt: 1 }}>
            <span style={{ fontWeight: 'bold', color: 'black' }}>Área total:</span> {`${property.size}m²`}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="div">
            <span style={{ fontWeight: 'bold', color: 'black' }}>Aluguel:</span> {formatPrice(property.rent_price)}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="div">
            <span style={{ fontWeight: 'bold', color: 'black' }}>Venda:</span> R$ {formatPrice(property.sell_price)}
          </Typography>
          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <PiShower />
              <p>{property.bathrooms}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <IoCarOutline />
              <p>{property.parking_spaces}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <PiBed />
              <p>{property.bedrooms}</p>
            </div>
          </div>
          <Box display="flex" justifyContent="start" flexDirection={{ xs: 'column', sm: 'row' }} gap={2}>
            <Button variant="contained"  onClick={handleViewAdvertiser} sx={{ fontWeight: 'bold', fontSize: '10px',color: '#092f46', backgroundColor: '#f5f5f5' }}>
              Ver Anunciante
            </Button>
            <Button variant="contained" onClick={handleViewProperty} sx={{ fontWeight: 'bold', fontSize: '10px',color: '#f5f5f5', backgroundColor: '#092f46' }}>
              Ver Mais Detalhes
            </Button>
          </Box>
        </CardContent>
      </Card>

      <AdvertiverDialog open={open} handleClose={handleClose} advertiser={property} />
      <PropertyDetailDialog open={openPropertyDetail} handleClose={handleCloseProperty} advertiser={property} />
    </>
  );
}

export default PropertyCard;
