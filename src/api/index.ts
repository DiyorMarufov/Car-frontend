import axios from "axios";

export const api = axios.create({
    baseURL:"https://democar.up.railway.app/"
})