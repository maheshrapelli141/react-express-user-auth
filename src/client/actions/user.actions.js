import { userConstants } from '../constants';
import { userService } from '../services';
import { alertActions } from './';
import { history } from '../helpers';

export const userActions = {
    login,
    register,
    update,
    logout
};

function login(email, password) {
    return dispatch => {
        dispatch(request({ email }));

        userService.login(email, password)
            .then(
                data => { 
                    localStorage.setItem('user',JSON.stringify(data));
                    dispatch(success(data.data));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function register(payload) {
  return dispatch => {
      dispatch(request({ email: payload.email }));

      userService.register(payload)
          .then(
              user => { 
                  dispatch(success(user));
                  history.push('/login');
              },
              error => {
                  dispatch(failure(error));
                  dispatch(alertActions.error(error));
              }
          );
  };

  function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
  function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
  function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function update(payload) {
  return dispatch => {
    dispatch(request({ firstname: payload.firstname }));
      userService.update(payload)
          .then(
              data => { 
                  dispatch(success(data));
                  history.push('/');
              },
              error => {
                  dispatch(failure(error));
                  dispatch(alertActions.error(error));
              }
          );
  };

  function request(user) { return { type: userConstants.UPDATE_REQUEST, user } }
  function success(user) { return { type: userConstants.UPDATE_SUCCESS, user } }
  function failure(error) { return { type: userConstants.UPDATE_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

