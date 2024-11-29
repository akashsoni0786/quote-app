import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadMedia, createQuote } from '../redux/actions/quoteActions';
import { TextField, Button, Box, Typography, Container, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const QuoteCreationPage = () => {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.auth);
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const mediaUrl = await dispatch(uploadMedia(file));
      setImage(mediaUrl);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text && image) {
      dispatch(createQuote(text, image));
      navigate('/quotes');
    } else handleClick()
  };
  useEffect(()=>{
    if((!data.token || data.token == "") && !data.isAuthenticated){
      navigate('/')
    }
  },[data])
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Create Quote
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Quote Text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            margin="normal"
          />
          <Button variant="contained" component="label" sx={{ mt: 2 }}>
            Upload Image
            <input type="file" hidden onChange={handleImageUpload} />
          </Button>
          {image && <Typography sx={{ mt: 2 }}>Image Uploaded!</Typography>}
          <Button type="submit"  fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
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
          Please enter data in text field as well as upload a valid image.
        </Alert>
        </Snackbar>
    </Container>
  );
};

export default QuoteCreationPage;
