import React from 'react';
import MiniDrawer from '../../Components/Drawer/Drawer/Drawer';
import Provider from '../../Context/Provider';

function Home(){
  return(
    <Provider>
      <MiniDrawer/>
    </Provider>
  );
}

export default Home;

