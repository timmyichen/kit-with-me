const authReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SIGN_IN_REQUEST':
    case 'LOG_IN_REQUEST':
      return {
        user: null,
        loading: true,
      };
    case 'SIGN_IN_SUCCESS':
    case 'LOG_IN_SUCCESS':
      return {
        user: action.user,
        loading: false,
      };
    default:
      return state;
  }
};

export default authReducer;
