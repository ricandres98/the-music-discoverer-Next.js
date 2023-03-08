import axios from "axios";

const useApiInstance = () => {
  const api = axios.create({
    baseURL: "https://spotify23.p.rapidapi.com/",
    headers: {
      "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_API_KEY,
    },
  });

  return api;
};

export default useApiInstance;
