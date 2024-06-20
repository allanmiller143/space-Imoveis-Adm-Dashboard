/* eslint-disable no-unused-vars */
import React from 'react';
import { Button, Typography } from '@mui/material';
import { postData } from '../../Services/Api';
import { useNavigate } from 'react-router-dom';
import PasswordTextForm from '../../Components/GlobalComponents/TextFileds/PasswordTextForm/PasswordTextForm';
import TextFieldForm from '../../Components/GlobalComponents/TextFileds/TextFieldForm/TextFieldForm';
import { toast } from 'sonner';
import Loading from '../../Components/GlobalComponents/Loading/Loading';
import './Login.css';

function LoginPage() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  
  const navigate = useNavigate();

  const login = async (event) => {
    event.preventDefault();

    if (email === '' || password === '') {
      toast.warning('Preencha todos os campos');
    } else {
      setLoading(true);
      try {
        const data = { email: email, password: password };
        const response = await postData('login/admin', data);
        if (response.status === 200 || response.status === 201) {
          const token = response.data.token;
          const user = response.data.user;
          localStorage.setItem('token', token);
          localStorage.setItem('currentUser', JSON.stringify(user));
          setLoading(false);
          navigate('/dash');
        } else {
          setLoading(false);
          toast.error('Email ou senha inválidos');
        }
      } catch (error) {
        setLoading(false);
        toast.warning('Ocorreu um erro');
      }
    }
  };

  return (
    <div className="login">
      {loading && <Loading data={{ open: loading }} />}
      <div className="login-backGround-header"> </div>

      <div className="login-container">
        <div className="login-paper">
          <div className="login-header">
            <Typography variant="h5">
              Faça login na sua conta
            </Typography>
            <Typography className="login-subheader">
              Bem-vindo de volta, sentimos a sua falta
            </Typography>
          </div>
          <form className="login-form" noValidate onSubmit={login}>
            <TextFieldForm label="E-mail" onChange={(e) => setEmail(e.target.value)} value={email} />
            <PasswordTextForm label="Senha" onChange={(e) => setPassword(e.target.value)} value={password} />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 1,
                mb: 1,
                backgroundColor: '#092f46',
                '&:hover': {
                  backgroundColor: '#092f46',
                },
              }}
            >
              Entrar
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
