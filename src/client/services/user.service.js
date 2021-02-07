import config from '../../config';
import { authHeader,api } from '../helpers';


export const userService = {
    login,
    register,
    update,
    logout
};

async function login(email, password) {
    const formData = new FormData();
    formData.append('email',email);
    formData.append('password',password);
    return await  api.post(`${config.apiUrl}/api/user/login`,formData);
}

function register(payload) {
  const formData = new FormData();
  for(const key in payload){
    formData.append(key,payload[key]);
  }
  return api.post(`${config.apiUrl}/api/user/register`,formData);
}

function update(payload) {
  const formData = new FormData();
  for(const key in payload){
    formData.append(key,payload[key]);
  }
  
  const headers = {
    Authorization: JSON.parse(localStorage.getItem('user')).token
  };
  console.log({headers});
  return api.post(`${config.apiUrl}/apis/user/update`,formData,{ headers });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}