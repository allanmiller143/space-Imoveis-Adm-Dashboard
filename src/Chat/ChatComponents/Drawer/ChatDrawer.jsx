/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import List from '@mui/material/List';
import Avatar from '@mui/material/Avatar';
import ConversationItem from '../ChatCard/ChatCard';
import { ListItemAvatar } from '@mui/material';
import NoConversationSelected from '../NoConversationSelected/NoConversationSelected';
import MessageSender from '../MessageSender/MessageSender';
import Chats from '../Chats/Chats';
import SearchWithIcon from '../Search/Search';
import ChatContext from '../../ChatContext/ChatContext';
import Loading from '../../../Components/GlobalComponents/Loading/Loading';
import { getData } from '../../../Services/Api';
import { CiLogout } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 400;

const MainContent = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  height: 'calc(100% - 64px)', // Adjust this if AppBar height changes
  overflowY: 'auto',
});

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    position: 'relative',
  }),
);
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: '#092f46',
  borderBottom: '1px solid lightgray',
  boxShadow: 'none',
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'start',
  flexDirection: 'column',
  padding: theme.spacing(2, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'space-between',
  backgroundColor: '#092f46',
  color: 'white',
  gap: 20,
  position: 'relative',
}));

export default function PersistentDrawerLeft({socket}) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const cuString = localStorage.getItem('currentUser');
  const currentUser = JSON.parse(cuString);
  const { chats, setChats,chatsFilterActivated,filterchats,selectedUser, setSelectedUser,setMessages } = React.useContext(ChatContext);
  const [loadingChats, setLoadingChats] = useState(true);
  const [serchUser, setSearchUser] = useState('');
  const token = localStorage.getItem('token');
  const Navigate = useNavigate();



  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleUserClick = (user) => {
    console.log(user.user1.email);
    setSelectedUser(user);
    setMessages([]);
  };  

  useEffect(() => {
    const simulateChatLoading = async () => {
      setLoadingChats(true);
      try{
        const response = await getData('chat',token);
        if (response.status === 200 || response.status === 201) {
          setChats(response.userInfo);
          console.log(response.userInfo);
        }else{
          console.log(`Deu ruim nesse carai ${response.message}`);
          setChats([]);
        }
      }catch(e){
        console.log(e);
        console.log('Erro ao carregar chats');
      }

      setLoadingChats(false); // Altera o estado de loading para false após o carregamento das mensagens
    };

    if (chats) {
      simulateChatLoading();
    }
  }, []);

  const handleLogout = () => {
    setChats([]);
    setSelectedUser(null);
    setMessages([]);
    Navigate('/dash');
  };


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'start' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
            {selectedUser ? (
              <React.Fragment>
                <ListItemAvatar>
                  <Avatar alt={selectedUser.user1.email === currentUser.email ? selectedUser.user1.email : selectedUser.user2.email} src={selectedUser.user1.email === currentUser.email ? selectedUser.user1.email : selectedUser.user2.email} />
                </ListItemAvatar>
                <Typography variant="body" noWrap component="div" sx={{ flexGrow: 1, textAlign: 'center', cursor: 'pointer' }} onClick={() => setSelectedUser(null)}>
                  {selectedUser.user1.email === currentUser.email ? selectedUser.user2.email : selectedUser.user1.email}
                </Typography>
              </React.Fragment>
            ) : (
              <Typography variant="body" noWrap component="div" sx={{ flexGrow: 1, textAlign: 'center', cursor: 'pointer' }} onClick={() => setSelectedUser(null)}>
                Gerencie suas conversas
              </Typography>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <div onClick={handleLogout} style={{ cursor: 'pointer',display: 'flex', alignItems: 'center', gap: '10px' }}>
            <CiLogout></CiLogout> 
            <p>Sair do chat</p>
          </div>
          <Box sx={{ display: 'flex', alignItems: 'start', justifyContent: 'start', gap: 1, width: '100%', maxWidth: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', width: '90%', color: 'white', padding: 1 }}>
              <Avatar alt="User Name" src = {currentUser.profile && currentUser.profile.url !== null && currentUser.profile.url !== '' ? currentUser.profile.url : ''} sx={{ marginRight: 2 }} />
              <Typography variant="h7" noWrap>
                {currentUser.name}
              </Typography>
            </Box>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon sx={{ color: 'white' }} /> : <ChevronRightIcon sx={{ color: 'white' }} />}
            </IconButton>
          </Box>
          <SearchWithIcon search={serchUser} setSearch={setSearchUser} />
        </DrawerHeader>
        <Divider />
        {loadingChats ? (
          <Loading data={{ open: loadingChats, absolute: true }} />
        ) : (
          <>
            {
              chatsFilterActivated  ? (
                <List>
                  {filterchats.map((conversation, index) => (
                    <ConversationItem
                      key={index}
                      data = {conversation}
                      onClick={() => handleUserClick(conversation)}
                    />
                  ))}
                </List>
              ) : (
                <List>
                  {chats.map((conversation, index) => (
                    <ConversationItem
                      key={index}
                      data = {conversation}
                      onClick= {() =>  handleUserClick(conversation)}
                    />
                  ))}
                </List>
              )}
          </>
        )}
         
      </Drawer>
      <Main open={open}>
        <MainContent>
          {selectedUser?(
            <Chats id={selectedUser.user1.email === currentUser.email ? selectedUser.user2.email : selectedUser.user1.email} socket = {socket} setOpen = {setOpen} />

          ) : (
            <NoConversationSelected />
          )}
        </MainContent>
        {selectedUser && <MessageSender socket = {socket} sx={{ position: 'fixed', bottom: 0, width: '100%', zIndex: 1 }} />}
      </Main>
    </Box>
  );
}
