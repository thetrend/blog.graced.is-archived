import axios from 'axios';

export default (token: string) => {
  if (!token) {
    delete axios.defaults.headers.common['Authorization'];
  }
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}
