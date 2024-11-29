import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, setTokenData } from '../redux/actions/authActions';
import { TextField, Button, Box, Typography, Container, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [otp, setOtp] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isAuthenticated,token} = useSelector((state) => state.auth);
  const [open, setOpen] = React.useState(false);
  const [openEmpty, setOpenEmpty] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!username || !otp || username == ""){
      setOpenEmpty(true);
      return;
    }
    if(otp != '1234') {
      handleClick()
      return;
    }
    dispatch(login(username, otp));
    navigate('/quotes');
  };
  useEffect(()=>{
    if(token != "" && isAuthenticated){
      sessionStorage.setItem('token',token)
      navigate('/quotes');
    }else {
      const prevData = sessionStorage.getItem('token');
      if(prevData && prevData != "") {
        navigate('/quotes');
        dispatch(setTokenData(prevData))
      }
    }
  },[isAuthenticated,token])
  

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const handleCloseEmpty = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenEmpty(false);
  };
  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            margin="normal"
            type="password"
            error={open}
          />
          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
            Submit
          </Button>
        </form>
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Wrong OTP: Please enter valid OTP
        </Alert>
        </Snackbar>
        <Snackbar
        open={openEmpty}
        autoHideDuration={5000}
        onClose={handleCloseEmpty}
      >
        <Alert
          onClose={handleCloseEmpty}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Please enter in empty field(s).
        </Alert>
        </Snackbar>
    </Container>
  );
};

export default LoginPage;
