import axios from "axios";

export const omdbapiAxiosInstance = axios.create({
  method: "GET",
  baseURL: `http://www.omdbapi.com/`,
  timeout: 5000, // 5 segundos y luego se cancela la petición
  params: {
    apikey: process.env.REACT_APP_OMDB_API_KEY, // Agregar la API KEY
  },
  headers: {
    "Content-Type": "application/json",
  },
});

export default omdbapiAxiosInstance;
