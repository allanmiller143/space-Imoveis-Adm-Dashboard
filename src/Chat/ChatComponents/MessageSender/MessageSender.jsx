/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useContext, useState } from 'react';
import { Button, Input, Space } from 'antd';
import SendIcon from '@mui/icons-material/Send';
import ChatContext from '../../ChatContext/ChatContext';
import styled from 'styled-components';

const StyledInput = styled(Input)`
  &:hover {
    border-color: initial;
    box-shadow: none;
  }

  &:focus {
    border-color: initial;
    box-shadow: none;
  }
`;

const MessageSender = ({socket}) => {
  const [message, setMessage] = useState('');
  const chatId = localStorage.getItem('chatId');
  const cuString = localStorage.getItem('currentUser');
  const currentUser = JSON.parse(cuString);

  const sendMessage = () => {
    if (message.trim() !== '') {
      const data = {
        'email' : currentUser.email,
        'chatId' : chatId,
        'message' : message
      };
      socket.emit('message', data);
 
    }
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && message.trim() !== '') {
      sendMessage();
      setMessage('');
    }
  };

  const handleSendClick = () => {
    if (message.trim() !== '') {
      sendMessage();
      setMessage('');
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', marginTop: 5, padding: 10, backgroundColor: '#f5f5f5' }}>
      <Space.Compact
        style={{
          width: '100%',
          height: 40,
        }}
      >
        <StyledInput
          placeholder="Escreva uma mensagem"
          value={message}
          onChange={handleMessageChange}
          onPressEnter={handleKeyDown}
        />
        <Button type="primary" onClick={handleSendClick} style={{ height: 40, backgroundColor: '#092f46' }}>
          <SendIcon />
        </Button>
      </Space.Compact>
    </div>
  );
};

export default MessageSender;
