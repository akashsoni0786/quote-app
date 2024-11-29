import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuotes } from '../redux/actions/quoteActions';
import { Box, Pagination } from '@mui/material';

const PaginationComponent = () => {
  const dispatch = useDispatch();
  const { quotes, limit } = useSelector((state) => state.quotes);

  const handlePageChange = (event, val) => {
    if(val == 1) dispatch(fetchQuotes(0 , limit));
    else dispatch(fetchQuotes(val*limit , limit));
  };
  return (
    <Box sx={{ textAlign: 'center', mt: 2 }}>
      <Pagination
        count={70}
        page={(Number(quotes[0]?.id)-1)/12 == 0 ? 1:(Number(quotes[0]?.id)-1)/12}
        color="primary" 
        onChange={handlePageChange}
        />
      {/* {hasMore && (
        <Button variant="contained" onClick={()=>dispatch(fetchQuotes(offset + limit, limit))}>
          Load More
        </Button>
      )} */}
    </Box>
  );
};

export default PaginationComponent;
