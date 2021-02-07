const axios = require('axios');
const config = require('../../config');
import { userService } from '../services/user.service';

export const api = axios.create({
  baseUrl: config.apiUrl,
  headers: {
    Authorization: JSON.parse(localStorage.getItem('user'))?.token
  }
});

api.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  console.log('in interceptor',response);
  if (!response.ok) {
    if (response.status === 403) {
      // auto logout if 401 response returned from api
      // userService.logout();
      location.reload(true);
    }
  
  }
  return response.data;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});

