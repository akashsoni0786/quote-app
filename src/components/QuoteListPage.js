import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuotes } from '../redux/actions/quoteActions';
import { Box, Typography, Card, CardMedia, CardContent, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PaginationComponent from './PaginationComponent';

const QuoteListPage = () => {
  const dispatch = useDispatch();
  const { quotes, hasMore,recent } = useSelector((state) => state.quotes);
  const data = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if(data.token) dispatch(fetchQuotes(0, 12),data.token);
  }, [dispatch,data]);
  
  useEffect(()=>{
    if((!data.token || data.token == "") && !data.isAuthenticated){
      navigate('/')
    }
  },[data])
  return (
    <Box sx={{ pl: 10, pr:10 }}>
      <Typography variant="h4" gutterBottom>
        Quotes
      </Typography>
      <Box
      sx={{
        display: 'flex',
        flexDirection: 'row', // or 'column'
        justifyContent: 'space-between', // alignment on the main axis
        alignItems: 'center', // alignment on the cross axis
        gap: 2, // spacing between children
        padding: 2, // optional padding
        backgroundColor: 'lightgray', // optional styling
        flexWrap:"wrap"
      }}
    >
      {[...recent,...quotes]?.map((quote) => (
        <Card key={quote.id} sx={{ maxWidth: 350,minWidth: 350 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={quote.mediaUrl ?? 'images.png'}
            alt={quote.text}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
            {`By ${quote.username}`}</Typography> <Typography variant="p">{`At ${new Date(quote.createdAt).toLocaleString('en-US', { timeZone: 'UTC', dateStyle: 'medium', timeStyle: 'short' })}`}</Typography>
            
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {quote.text}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      ))}
      </Box>
      {hasMore && <PaginationComponent />}
    </Box>
  );
};

export default QuoteListPage;
