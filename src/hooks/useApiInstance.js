import axios from "axios";

const useApiInstance = () => {
  const api = axios.create({
    baseURL: "https://spotify23.p.rapidapi.com/",
    headers: {
      "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
      "X-RapidAPI-Key": "58b068cb04msh40ffce0d3003617p15ce21jsnd02b3cae7783",
    },
  });

  return api;
};

export default useApiInstance;
