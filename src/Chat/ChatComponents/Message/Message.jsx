/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Avatar, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';

const StyledMessageCard = styled('div')(({ sent }) => ({
  display: 'flex',
  alignItems: 'flex-start', // Alinha os elementos ao topo
  justifyContent: sent ? 'flex-end' : 'flex-start', // Inverte a ordem da foto
  flexDirection: sent ? 'row-reverse' : 'row',
  marginTop: 10,
  gap: 5,
}));

const AvatarContainer = styled('div')(({ sent }) => ({
  marginTop: 'auto', // Alinha o Avatar na base da caixa
  marginBottom: 'auto', // Alinha o Avatar na base da caixa
}));

const MessageCard = ({ sender, text, createdAt, sent ,url}) => {
  return (
    <StyledMessageCard sent={sent}>
      <AvatarContainer sent={sent}>
        <Avatar alt={url} src={url} style={{ marginLeft: sent ? 'auto' : 10, marginRight: sent ? 10 : 'auto' }} />
      </AvatarContainer>
      <Box sx={{ maxWidth: '50%', backgroundColor: sent ? '#f5f5f5' : '#f0f8ff', padding: '4px 12px', borderRadius: 2, marginLeft: sent ? 'auto' : 0, marginRight: sent ? 0 : 'auto' }}>
        <Typography variant="body1" sx={{ fontSize: '0.9rem' }}>{text}</Typography>
        <Typography variant="caption" color="textSecondary" sx={{ fontSize: '0.6rem' }}>{createdAt}</Typography>
      </Box>
    </StyledMessageCard>
  );
};

export default MessageCard;
