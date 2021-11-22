import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import theme from './chakraTheme';
import "@fontsource/roboto";

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <React.StrictMode>
      <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
      <App />
    </React.StrictMode>
  </ChakraProvider>,
  document.getElementById('root')
);
