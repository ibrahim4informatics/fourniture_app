import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import "./styles/global.css";
import { ChakraProvider, defineConfig, defaultConfig, createSystem } from '@chakra-ui/react';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import GlobalContextProvider from './contexts/CLientContext.tsx';

const queryClient = new QueryClient();

const theme = createSystem(defaultConfig, defineConfig({
  theme: {
    tokens: {
      colors: {},
      fonts: {
        body: {
          value: "Poppins, san-serif"
        },
        heading: { value: "Poppins, san-serif" }
      }
    }
  }
}))

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalContextProvider>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider value={theme}>
          <App />
        </ChakraProvider >
      </QueryClientProvider>
    </GlobalContextProvider>
  </StrictMode>,
)
