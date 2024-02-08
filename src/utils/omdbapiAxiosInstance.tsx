import axios from "axios";

/**
 * Axios instance for making GET requests to the OMDB API.
 */
export const omdbapiAxiosInstance = axios.create({
  method: "GET",
  baseURL: `http://www.omdbapi.com/`,
  timeout: 5000, // 5 seconds and then the request is cancelled
  params: {
    apikey: process.env.REACT_APP_OMDB_API_KEY, // Add the API KEY
  },
  headers: {
    "Content-Type": "application/json",
  },
  timeoutErrorMessage: "Timeout",
});

export default omdbapiAxiosInstance;
