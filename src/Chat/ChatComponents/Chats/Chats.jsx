/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext, useRef } from 'react';
import { Box } from '@mui/material';
import MessageCard from '../Message/Message';
import Loading from '../../../Components/GlobalComponents/Loading/Loading';
import ChatContext from '../../ChatContext/ChatContext';
import { openNewChat } from '../../ChatService/Api';
import { toast } from 'sonner';

const Chats = ({ id, socket }) => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages } = useContext(ChatContext);
  const messagesEndRef = useRef(null);
  const cuString = localStorage.getItem('currentUser');
  const currentUser = JSON.parse(cuString);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (socket) {
      socket.on('message', (data) => {
        console.log(data);
        setMessages((prevMessages) => [...prevMessages, data]);
        scrollToBottom(); // Após receber nova mensagem, rolar para o final
      });
    }

    return () => {
      if (socket) {
        socket.off('message');
      }
    };
  }, [socket, setMessages]);


  useEffect(() => {
    if(id !== undefined || id !== null){
      loadMessages();
    }
    
  }, [id]);


  const loadMessages = async () => {
    setLoading(true);
    try {
      const response = await openNewChat(socket, id);
      setMessages(response);
      console.log(response);
      scrollToBottom(); // Após carregar mensagens, rolar para o final
    } catch (err) {
      console.log('Error loading messages:', err);
    } finally {
      setLoading(false);
    }
  };




  const formatTime = (isoString) => {
    const date = new Date(isoString);
    let hours = date.getUTCHours().toString().padStart(2, '0');
    
    const intHours = parseInt(hours) - 3;
    hours = intHours.toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const whoSent = (sender) => sender === currentUser.email;

  const picture = (message) => {

    if (message.senderProfile && message.senderProfile.url !== null && message.senderProfile.url !== '') {
      return message.senderProfile.url;
    } else {
      return '';
    }
  };

  return (
    <Box flex={1} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'end' }}>
      <Loading data={{ open: loading, absolute: true }} />  
    
      {
        messages.map((message, index) => (
          <MessageCard
            key={index}
            sender={message.sender}
            text={message.text}
            createdAt={formatTime(message.createdAt)}
            sent={whoSent(message.sender)}
            url={picture(message)}
          />
        ))
      }
      
      <div ref={messagesEndRef} />
 
      
    </Box>
  );
};

export default Chats;
