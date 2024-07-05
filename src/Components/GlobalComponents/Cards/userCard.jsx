/* eslint-disable react/prop-types */
import { Box, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import React from 'react';
import UserPopPver from '../../Drawer/Users/userPopPver';

function UserCard({ user, socket }) {
  return (
    <Card>
      <Grid container>
        <Grid item xs={4}>
          <CardMedia
            component="img"
            image={(user.type !== 'client' && user.picture.length > 0) ? user.picture[0].url : 'https://entballarat.com.au/wp-content/uploads/2018/11/blank-male.jpg' }
            alt={user.name}
            style={{ width: '100%', height: '150px', objectFit: 'cover', backgroundColor: '#092f46' }}
          />
        </Grid>
        <Grid item xs={8}>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography sx = {{fontSize: '1rem', fontWeight: 'bold'}} noWrap>{user.name}</Typography>
              <UserPopPver user={user} socket={socket} />
            </Box>
            <Typography sx = {{fontSize: '0.8rem',}} color="textSecondary" noWrap>{user.email} </Typography>
            <Typography sx = {{fontSize: '0.8rem',}} color="textSecondary" noWrap>Tipo: {
              user.type === 'owner' ? 'Proprietário' : user.type === 'realstate' ? 'Imóbiliaria' : user.type === 'realtor' ? 'Corretor' : 'usuário'
            }
            </Typography>
            {/* <Typography sx = {{fontSize: '0.8rem',}} color="textSecondary" noWrap>Data de registro: {user.registrationDate}</Typography> */}
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
}

export default UserCard;
