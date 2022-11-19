import axios from "axios";
import { API_URL } from "./constants";

const instance = axios.create({
  baseURL: API_URL,
  params: {
    api_key: "02196eb1f83e0655f2924298a316f967",
  },
});

export default instance;
