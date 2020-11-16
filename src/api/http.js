import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.baseURL = process.env.VUE_APP_BASE_URL

axios.interceptors.request.use(config => {
  config.headers.Token = sessionStorage.getItem('token')
  return config

}, error => {
  return Promise.reject(error);
});


export { axios }