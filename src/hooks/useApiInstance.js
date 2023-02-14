import axios from "axios";

const useApiInstance = () => {
  const api = axios.create({
    baseURL: "https://spotify23.p.rapidapi.com/",
    headers: {
      "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
      "X-RapidAPI-Key": "7527dbdd24msh7d5df332c0237f9p1e0ac0jsn534aaa24b8d7",
    },
  });

  return api;
};

export default useApiInstance;
