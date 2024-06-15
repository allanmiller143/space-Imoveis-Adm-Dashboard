import React from 'react';
import propTypes from 'prop-types';
import AppContext from './AppContext';
import {useState} from 'react';

function Provider({children}){
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [currentUserFavorites, setCurrentUserFavorites] = useState([]); 
  const [selectedComponent, setSelectedComponent] = React.useState('Usuários');
  const [sharedTotalItens, setSharedTotalItens] = useState(0); // para os pendentes
  const [totalNewProperties, setTotalNewProperties] = useState(0); // para os pendentes

  const value = {

    token, setToken,
    currentUserFavorites, setCurrentUserFavorites,
    selectedComponent, setSelectedComponent,
    sharedTotalItens, setSharedTotalItens,
    totalNewProperties, setTotalNewProperties
  };

  return (
    <AppContext.Provider value = {value}>
      {children}
    </AppContext.Provider>
  );
}

export default Provider;

Provider.propTypes = {
  children: propTypes.any,
}.isRequired;
