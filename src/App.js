import React from 'react';
import AppRoutes from './Routes/AppRoutes';
import Provider from './Context/Provider';
import {Toaster} from  'sonner';
import {io} from 'socket.io-client';
import ChatContextProvider from './Chat/ChatContext/ChatContextProvider';


const socket = io('https://spaceimoveis-api-8lin.onrender.com/');


function App() {
  return (
    <Provider>
      <ChatContextProvider>
        <AppRoutes socket = {socket}/>
      </ChatContextProvider>
      <Toaster richColors/>
    </Provider>
  );
}

export default App;
