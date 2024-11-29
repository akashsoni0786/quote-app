import {
    FETCH_QUOTES_SUCCESS,
    FETCH_QUOTES_FAILURE,
    UPLOAD_MEDIA_SUCCESS,
    UPLOAD_MEDIA_FAILURE,
    CREATE_QUOTE_SUCCESS,
    CREATE_QUOTE_FAILURE,
  } from '../actions/quoteActions';
  
  const initialState = {
    quotes: [],
    offset: 0,
    limit: 12,
    hasMore: true,
    error: null,
    recent:[]
  };
  
  const quoteReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_QUOTES_SUCCESS:
        return {
          ...state,
          quotes: action.payload.quotes,
          offset: state.offset + state.limit,
          hasMore: action.payload.hasMore,
        };
      case FETCH_QUOTES_FAILURE:
        return { ...state, error: 'Failed to fetch quotes' };
      case UPLOAD_MEDIA_SUCCESS:
        return { ...state, error: null };
      case UPLOAD_MEDIA_FAILURE:
        return { ...state, error: 'Failed to upload media' };
      case CREATE_QUOTE_SUCCESS:
        return { ...state,recent:[action.payload.data,...state.recent], quotes: [action.payload, ...state.quotes], error: null };
      case CREATE_QUOTE_FAILURE:
        return { ...state, error: 'Failed to create quote' };
  
      default:
        return state;
    }
  };
  
  export default quoteReducer;
  