import { apiClient } from '../../utils/api';

// Action Types
export const FETCH_QUOTES_SUCCESS = 'FETCH_QUOTES_SUCCESS';
export const FETCH_QUOTES_FAILURE = 'FETCH_QUOTES_FAILURE';
export const UPLOAD_MEDIA_SUCCESS = 'UPLOAD_MEDIA_SUCCESS';
export const UPLOAD_MEDIA_FAILURE = 'UPLOAD_MEDIA_FAILURE';
export const CREATE_QUOTE_SUCCESS = 'CREATE_QUOTE_SUCCESS';
export const CREATE_QUOTE_FAILURE = 'CREATE_QUOTE_FAILURE';

// Fetch Quotes
export const fetchQuotes = (offset, limit) => async (dispatch, getState) => {
  try {
    const token = getState().auth.token;
    const response = await apiClient.get(`/getQuotes?limit=${limit}&offset=${offset}&sort=created_at&order=desc`, {
      headers: {
        Authorization: token,
      },
    });
    if(response.data.error) {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("username");
      console.error(response.data?.error);
      dispatch({ type: FETCH_QUOTES_FAILURE });
    }else {
      const quotes = response.data?.data;
      const hasMore = quotes.length === limit;
      dispatch({ type: FETCH_QUOTES_SUCCESS, payload: { quotes, offset, hasMore } });
    }
    
  } catch (error) {
    console.error(error);
    dispatch({ type: FETCH_QUOTES_FAILURE });
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");
  }
};

// Upload Media
export const uploadMedia = (file) => async (dispatch) => {
  try {
    const formData = new FormData();
    formData.append('le', file);
    const response = await apiClient.post(
      'https://crafto.app/crafto/v1.0/media/assignment/upload',
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );
    dispatch({ type: UPLOAD_MEDIA_SUCCESS, payload: response.data[0]?.url });
    return response.data[0]?.url;
  } catch (error) {
    console.error(error);
    dispatch({ type: UPLOAD_MEDIA_FAILURE });
  }
};

// Create Quote
export const createQuote = (text, mediaUrl) => async (dispatch, getState) => {
  try {
    const token = getState().auth.token;
    const response = await apiClient.post(
      '/postQuote',
      { text, mediaUrl },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    const newQuote = response.data;
    dispatch({ type: CREATE_QUOTE_SUCCESS, payload: newQuote });
  } catch (error) {
    console.error(error);
    dispatch({ type: CREATE_QUOTE_FAILURE });
  }
};
