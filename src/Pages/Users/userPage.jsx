/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Grid, Card, CardContent, CardMedia, Pagination, Box, IconButton, Button } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import TextFieldFilter from '../../Components/GlobalComponents/TextFileds/seachTextField';
import DropDownFilter from '../../Components/GlobalComponents/DropDownFilter/DropDownFilter';
import UserCard from '../../Components/GlobalComponents/Cards/userCard';
import DashBoardSeenGraphic from '../../Components/Drawer/Users/DashBoardSeenGraphic';
import { getData, putData } from '../../Services/Api';
import { toast } from 'sonner';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState('');
  const [name, setName] = useState('');
  const token = localStorage.getItem('token');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItens, setTotalItens] = useState(0);
  const [reloadFilters, setReloadFilters] = useState(false);
  const [graphicUsers, setGraphicUsers] = useState([]);

  const localItens = [
    { value: '1', label: 'Proprietário' },
    { value: '2', label: 'Corretor' },
    { value: '3', label: 'Imobiliária' },
    { value: '4', label: 'Usuário' },
  ];  



  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    const selectedLabel = localItens.find(item => item.value === selectedValue)?.label;
    setType(selectedLabel);
  };

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  
  useEffect(() => {
    getGraphicClicks();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    const formJson = {
      'name': name,
    };

    switch (type) {
    case 'Proprietário':
      formJson['type'] = 'owner';
      break;
    case 'Corretor':
      formJson['type'] = 'realtor';
      break;
    case 'Imobiliária':
      formJson['type'] = 'realstate';
      break;
    case 'Usuário':
      formJson['type'] = 'client';
      break;
    default:
      formJson['type'] = '';
      break;
    }

    try {
      const response = await putData(`admin/users/filter?page=${currentPage}&limit=${12}`, formJson, token);
      if (response.status === 200 || response.status === 201) {
        setUsers(response.data.users);
        setTotalItens(response.data.pagination.total);
      } else {
        toast.error(response.status);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getGraphicClicks = async () => {
    try{
      const response = await getData('admin/users/monthly',token);
      if (response.status === 200 || response.status === 201) {
        setGraphicUsers(response.userInfo);  
        console.log(response);
      }else{
        toast.error('Erro ao carregar conteúdo');
      }
    }catch (error) {
      toast.error('Ocorreu um erro insperado');
    }
  };

  const cleanFilters = async () => {

    setName('');
    setType('');
    setCurrentPage(1);
    await fetchUsers();   
    setReloadFilters(prevState => !prevState); // Inverte o estado para recarregar os filtros

    toast.success('Filtros limpos');
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom style={{ marginTop: '20px', color: '#092f46', fontWeight: 'bold' }}>
        Usuários ({totalItens})
      </Typography>
      <Typography variant="body2" gutterBottom sx={{ color: '#092f46' }}>
        Gerêncie e veja todos os usuários da plaforma
      </Typography>
      <DashBoardSeenGraphic title="Total de usuários cadastrados/mês" data={graphicUsers} sx={{ color: '#092f46' }} />

      <Typography variant="h4" gutterBottom sx={{ mb: 4, mt: 4, color: '#092f46', fontWeight: 'bold' }}>
        Todos os usuários
      </Typography>
      <Grid container spacing={2}  key={reloadFilters}>
        <TextFieldFilter value={name} onChange={setName} />      
        <DropDownFilter handleSelectChange={(e) => handleSelectChange(e, localItens, setType)} data={{ label: 'Tipo', itens: localItens }}    className="WhoAreYouPage__dropdown" />
      </Grid>
      <Button variant="contained" color="primary" style={{ marginTop: '20px', marginRight: '10px' }} onClick={cleanFilters}>Limpar filtros</Button>
      <Button variant="contained" style={{ marginTop: '20px', backgroundColor: '#092f46' }} onClick={fetchUsers}>Filtrar</Button>

      <Grid container spacing={2} style={{ marginTop: '20px' }}>
        {loading ? (
          Array.from(new Array(6)).map((_, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Skeleton variant="rectangular" height={160} />
            </Grid>
          ))
        ) : (
          users.length === 0 ? (
            <Typography variant="h6" gutterBottom>
              Nenhum usuário encontrado
            </Typography>
          ) : (
            users.map(user => (
              <Grid item key={user.id} xs={12} sm={6} md={4}>
                <UserCard user={user} />
              </Grid>
            ))
          )
        )}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Pagination count={Math.ceil(totalItens / 12)} page={currentPage} onChange={handleChangePage} />
      </Box>
    </Container>
  );
};

export default UserList;
