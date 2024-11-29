const initialState = {
    token: sessionStorage.getItem('token') || null,
    isAuthenticated: false,
    username:""
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        return { ...state, token: action.payload.token.token, isAuthenticated: true,username:action.payload.username };
      case 'LOGIN_FAILURE':
        return { ...state, isAuthenticated: false };
      default:
        return state;
    }
  };
  
  export default authReducer;
  