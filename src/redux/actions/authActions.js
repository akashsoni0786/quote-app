import { apiClient } from '../../utils/api';

export const login = (username, otp) => async (dispatch) => {
  try {
    const response = await apiClient.post('/login', { username, otp });
    const data = {
      token : response.data, username:username
    };
      sessionStorage.setItem('token',response.data);
      sessionStorage.setItem('username',username);
    dispatch({ type: 'LOGIN_SUCCESS', payload: data });
  } catch (error) {
    console.error(error);
    dispatch({ type: 'LOGIN_FAILURE' });
  }
};
export const setTokenData = (token) => async (dispatch) => {
  try {
    dispatch({ type: 'LOGIN_SUCCESS', payload: token });
  } catch (error) {
    console.error(error);
    dispatch({ type: 'LOGIN_FAILURE' });
  }
};