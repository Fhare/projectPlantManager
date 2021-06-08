import axios from 'axios';

const api = axios.create({
  baseURL: "http://192.168.1.3:3333" // Onde a API irá escutar as requisições
})

export default api;