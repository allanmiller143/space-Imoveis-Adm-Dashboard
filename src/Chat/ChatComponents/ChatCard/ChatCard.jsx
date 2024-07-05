/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { ListItem, ListItemAvatar, ListItemText, Avatar, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const MessageText = styled(Typography)(({ theme }) => ({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  fontSize: '0.75rem',
}));

const UserName = styled(Typography)(({ theme }) => ({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  fontSize: '0.9rem',
  fontWeight: 'w900',
  maxWidth: '200px', // Defina o limite de largura aqui
}));

const TimeText = styled(Typography)(({ theme }) => ({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  fontSize: '0.75rem',
  color: theme.palette.text.secondary,
}));

const ConversationItem = ({ data, onClick }) => {
  const cuString = localStorage.getItem('currentUser');
  const currentUser = JSON.parse(cuString);
  const handleClick = async () => {
    if (onClick) {
      await onClick();
    }
  };

  const user = data.user1.email === currentUser.email ? data.user2 : data.user1;


  return (
    <ListItem 
      alignItems="start" 
      sx={{ borderBottom: '1px solid lightgray', '&:hover': { backgroundColor: '#f5f5f5', cursor: 'pointer' } }} 
      onClick={handleClick}
    >
      <ListItemAvatar>
        <Avatar alt={user.type !== 'realstate' ? user.name : user.company_name} src={(user.profile !== '' && user.profile != null && user.profile !== undefined) ? user.profile.url : (user.type !== 'realstate' ? user.name : user.company_name)} sx={{ width: 50, height: 50 }} />
      </ListItemAvatar>
      <ListItemText
        primary={
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <UserName variant="body1" color="textPrimary">
              {user.type !== 'realstate' ? user.name : user.company_name}
            </UserName>
            <TimeText variant="body2">
              {''}
            </TimeText>
          </Box>
        }
        secondary={
          <MessageText variant="body2" color="textSecondary">
            {''}
          </MessageText>
        }
        sx={{ marginLeft: 1 }}
      />
    </ListItem>
  );
};

export default ConversationItem;
