import React from 'react';
import AppRoutes from './Routes/AppRoutes';
import Provider from './Context/Provider';
import {Toaster} from  'sonner';

function App() {
  return (
    <Provider>
      <AppRoutes/>
      <Toaster richColors/>

    </Provider>
  );
}

export default App;
