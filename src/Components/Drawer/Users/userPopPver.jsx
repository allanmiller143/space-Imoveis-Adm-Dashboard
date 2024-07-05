/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Popover from '@mui/material/Popover';
import { MenuItem, MenuList } from '@mui/material';
import { CiMenuKebab } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
import ChatContext from '../../../Chat/ChatContext/ChatContext';
import { openNewChat } from '../../../Chat/ChatService/Api';
import { getData } from '../../../Services/Api';
import Loading from '../../GlobalComponents/Loading/Loading';

export default function UserPopPver( { user, socket } ) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { setChats, selectedUser, setSelectedUser, setMessages } = React.useContext(ChatContext);
  const token = localStorage.getItem('token');

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const seePhone = async () => {
  
    setLoading(true);
    setSelectedUser(null);
    setMessages([]);
    try {
      await openNewChat(socket, user.email);
    } catch (err) {
      setLoading(false);
      console.log('Error loading messages:', err);
    }
  
    try {
      const response = await getData('chat', token);
      if (response.status === 200 || response.status === 201) {
        setChats(response.userInfo);
        const selectedChat = response.userInfo.find(chat => chat.user1.email === user.email || chat.user2.email === user.email);
        if (selectedChat) {
          setSelectedUser(selectedChat);
          console.log(selectedUser);
        } else {
          console.log('Usuário não encontrado nos chats carregados.');
        }
        navigate('/chat');
      } else {
        setChats([]);
      }
    } catch (e) {
      console.log(e);
    }finally{
      setLoading(false);
    }    

  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Loading data={{ open: loading}} />

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
          <MenuItem onClick={() => seePhone()}>Enviar mensagem</MenuItem>
          <MenuItem onClick={handleClose}>Ver detalhes</MenuItem>
        </MenuList>
      </Popover>
    </div>
  );
}
