/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import MiniDrawer from '../../Components/Drawer/Drawer/Drawer';
import Provider from '../../Context/Provider';

function Home( {socket}){
  return(
    <Provider>
      <MiniDrawer socket = {socket} />
    </Provider>
  );
}

export default Home;

