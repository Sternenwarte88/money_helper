import Cookies from 'universal-cookie';
import * as actionCreators from './actionCreators';
import instance from '../../axiosDefault';

export const login = (loginInformation, props) => {
  const cookies = new Cookies();

  return (dispatch) => {
    dispatch(loading(true));
    instance
      .post('/login', {
        email: loginInformation.email,
        password: loginInformation.password
      })
      .then((res) => {
        if (res.status === 200 && res.data.msg === 'accepted') {
          const newInformation = {
            ...loginInformation,
            loggedIn: true,
            password: '',
            id: res.data.id
          };
          cookies.set('loginState', res.data.token);
          cookies.set('id', res.data.id);
          dispatch(loginData(newInformation));

          return res;
        } else {
          const errorData = {
            status: res.data.status,
            message: res.data.msg
          };
          dispatch(error(errorData));
        }
      })
      .then((res) => {
        dispatch(loading(false));
        return res;
      })
      .then((res) => {
        if (res.status === 200) {
          props.history.push('/menu');
          return loginInformation;
        }
      })
      .then((loginInformation) => {
        loginInformation.deferredPrompt.prompt();
      })
      .catch((err) => {
        const newInformation = {
          ...loginInformation,
          loggedIn: false
        };
        dispatch(loginData(newInformation));
        console.log(err);
      });
  };
};

export const signUpHandler = (signUpData, props) => {
  return (dispatch) => {
    dispatch(loading(true));
    instance
      .post(
        '/users',
        {
          email: signUpData.email,
          password: signUpData.password
        },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          mode: 'cors'
        }
      )
      .then((res) => {
        if (res.data.msg === 'Benutzer erstellt!') {
          dispatch(loading(false));
          props.history.push('/');
        } else {
          const errorData = {
            ...signUpData,
            status: res.data.status,
            message: res.data.msg
          };
          dispatch(loading(false));
          dispatch(error(errorData));
        }
      }).catch((err) => {
        console.log(err);
      });
  };
};

const loginData = (loginInformation) => {
  return {
    type: actionCreators.LOGIN,
    loginInformation: loginInformation
  };
};

const error = (errorData) => {
  return {
    type: actionCreators.ERROR,
    error: errorData
  };
};

const loading = (loading) => {
  return {
    type: actionCreators.LOADING,
    loading: loading
  };
};
