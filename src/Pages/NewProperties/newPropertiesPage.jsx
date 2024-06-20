/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Grid, Card, CardContent, CardMedia, Pagination, Box, IconButton, Button } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import DropDownFilter from '../../Components/GlobalComponents/DropDownFilter/DropDownFilter';
import DashBoardSeenGraphic from '../../Components/Drawer/Users/DashBoardSeenGraphic';
import PropertyCard from '../../Components/GlobalComponents/Cards/propertyCard';
import { getData, postData } from '../../Services/Api';
import { toast } from 'sonner';
import AppContext from '../../Context/AppContext';

// Dados de exemplo para usuários


const NewPropertiesPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItens, setTotalItens] = useState(0);
  const { totalNewProperties, setTotalNewProperties } = React.useContext(AppContext);
  const [graphicProperties, setGraphicProperties] = useState([]);




  useEffect(() => {
    getGraphicProperties();
  }, []);


  useEffect(() => {
    fetchProperties();
  }, [currentPage]);

  const getGraphicProperties = async () => {
    try{
      const response = await getData('admin/properties/monthly',token);
      if (response.status === 200 || response.status === 201) {
        setGraphicProperties(response.userInfo);  
        console.log(response);
      }else{
        toast.error('Erro ao carregar conteúdo');
      }
    }catch (error) {
      toast.error('Ocorreu um erro insperado');
    }
  };

  const fetchProperties = async () => {
    setLoading(true);
    try{
      const response = await getData(`admin/properties/new?page=${currentPage}`,token);
      if(response.status === 200 || response.status === 201){
        console.log(response);
        setProperties(response.userInfo.properties);  
        setTotalNewProperties(response.userInfo.pagination.total);
      }else{
        toast.error(response.status);
      }

    }catch(error){
      toast.error(error.message);
    }
    finally{
      setLoading(false);
    }

  };

  const handleChangePage = (event, newPage) => { // PAGINAÇÃO
    setCurrentPage(newPage);
  };


  return (
    <Container>
      <Typography variant="h4" gutterBottom style={{ marginTop: '20px', color: '#092f46', fontWeight: 'bold' }}>
        Novos imóveis ({totalNewProperties})
      </Typography>
      <Typography variant="body2" gutterBotton sx = {{color: '#092f46',}}>
        Gerêncie e veja todos os novos imóveis da plaforma
      </Typography>
      <DashBoardSeenGraphic title="Total de imóveis cadastrados/mês" data= {graphicProperties}/>

      <Typography variant="h5" gutterBottom style={{ marginTop: '20px', color: '#092f46', fontWeight: 'bold' }}>
        Todos os novos imóveis
      </Typography>

      <Grid container spacing={2} style={{ marginTop: '20px' }}>
        {loading ? (
          Array.from(new Array(6)).map((_, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Skeleton variant="rectangular" height={160} />
            </Grid>
          ))
        ) : (
          properties.length === 0 ? (
            <Typography variant="h6" gutterBottom>
              Nenhum novo Imovel cadastrado até o momento
            </Typography>
          ) : (
            properties.map(user => (
              <Grid item key={user.id} xs={12} sm={6} md={4}>
                <PropertyCard property={user} func = {fetchProperties} />
              </Grid>
            ))
          )
        )}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Pagination count={Math.ceil(totalNewProperties / 10)} page={currentPage} onChange={handleChangePage} />
      </Box>
    </Container>
  );
};

export default NewPropertiesPage;
