import React from 'react';
import { Route, Routes } from 'react-router-dom';
// import { ThemeProvider } from '@mui/material/styles';
import LoginPage from './components/LoginPage';
import QuoteListPage from './components/QuoteListPage';
import QuoteCreationPage from './components/QuoteCreationPage';
// import theme from './styles/theme';
import Navbar from './components/Navbar';

const App = () => {
  
  return <>
    {/* <QuoteListPage /> */}
    <Navbar/>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/quotes" element={<QuoteListPage />} />
        <Route path="/create" element={<QuoteCreationPage />} />
      </Routes>
  </>
};

export default App;
