import axios from "axios";

// Pode ser algum servidor executando localmente: 
// http://localhost:3000

const api = axios.create({
  baseURL: "https://60dccba8c2b6280017febca8.mockapi.io/accounts",
});

export default api;