/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { CiLogout } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
import AppContext from '../../../Context/AppContext';
import './Drawer.css';
import UserList from '../../../Pages/Users/userPage';
import { FaUsersGear } from 'react-icons/fa6';
import Badge from '@mui/material/Badge';
import NewPropertiesPage from '../../../Pages/NewProperties/newPropertiesPage';
import { getData } from '../../../Services/Api';
import { toast } from 'sonner';
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import { FaHouseChimney } from 'react-icons/fa6';

const drawerWidth = 230;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: '#092f46',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: '#092f46',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Sombra pequena na parte inferior
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);



export default function MiniDrawer({socket}) {
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);
  const { selectedComponent, setSelectedComponent } = React.useContext(AppContext);
  const { totalNewProperties,setTotalNewProperties } = React.useContext(AppContext);

  const cuString = localStorage.getItem('currentUser');
  const currentUser = JSON.parse(cuString); // Parse para obter o objeto
  const token = localStorage.getItem('token');

  const items = [
    { text: 'Usuários', icon: <FaUsersGear  /> },
    { text: 'Novos Imóveis',
      icon: 
      <Badge badgeContent= {totalNewProperties} color="primary">
        <FaHouseChimney  color="action" sx={{ fontSize: 18 }} />
      </Badge> 
    },
    { text: 'Chat', icon: <IoChatbubbleEllipsesOutline  /> },

    { text: 'Sair', icon: <CiLogout /> },
  ].filter(Boolean);

  React.useEffect(() => {
    if (!selectedComponent) {
      setSelectedComponent('Dashboard');
    }
  }, [selectedComponent, setSelectedComponent]);

  React.useEffect(() => {
    fetchProperties();
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const fetchProperties = async () => {

    try{
      const response = await getData('admin/properties/new',token);
      if(response.status === 200 || response.status === 201){
        console.log(response);
        setTotalNewProperties(response.userInfo.pagination.total);
      }else{
        toast.error(response.status);
      }

    }catch(error){
      toast.error(error.message);
    }
  };

  const handleLogOut = () => {
    localStorage.clear();
    navigate('/');
    toast.success('Sessão encerrada com sucesso');
  };

  const renderSelectedComponent = () => {
    switch (selectedComponent) {
    case 'Novos Imóveis':
      return<NewPropertiesPage/>;
    case 'Usuários':
      return <UserList socket={socket}/>;
    case 'Sair':
      handleLogOut();
      return null; // Não renderiza nada
    default:
      setSelectedComponent('Usuários');
      navigate('/chat');
      return null;
    }
  };


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}  sx={{ display: 'flex',borderBottom: '1px solid lightgray',boxShadow: 'none'  }} >
        <Toolbar sx={{ display: 'flex', boxShadow: 'none' }}>
          <IconButton
            color="black"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon sx={{ color: 'white' }} />
          </IconButton>
          <Typography variant="h6" noWrap component="div" color="white">
            Meu espaço
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <h5 style={{color: 'white', paddingLeft: '10px'}}>Space imóveis</h5>
          <IconButton onClick={handleDrawerClose} sx={{ color: 'white' }}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {items.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                onClick={() => setSelectedComponent(item.text)}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} primaryTypographyProps={{ fontSize: '14px' }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        {open && (
          <div style={{ display: 'flex', padding: '10px', gap: '5px', alignItems: 'center', justifyContent: 'start' }}>
            <Avatar alt="Remy Sharp" src={currentUser && currentUser.profile ? currentUser.profile.url : ''} sx={{ width: 40, height: 40, cursor: 'pointer' }} />
            <h6>{currentUser && currentUser.name}</h6>
          </div>
        )}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 1,pt: 10 }}>
        {selectedComponent && renderSelectedComponent()}
      </Box>
    </Box>
  );
}
