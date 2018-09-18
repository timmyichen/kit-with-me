import axios from 'axios';

export function login({ email, password }) {
  return async dispatch => {
    dispatch({
      type: 'LOGIN_REQUEST',
    });

    const user = await axios.post('/api/user/login', { email, password });

    dispatch({
      type: 'LOGIN_SUCCESS',
      user,
    });
  };
}

export function signup({ firstName, lastName, email, password }) {
  console.log('wew');
  return async dispatch => {
    dispatch({
      type: 'SIGNUP_REQUEST',
    });

    let user;

    try {
      user = await axios.post('/api/user/signup', {
        firstName,
        lastName,
        email,
        password,
      });
    } catch (e) {
      throw new Error(e.message);
    }

    dispatch({
      type: 'SIGNUP_REQUEST',
      user,
    });
  };
}
