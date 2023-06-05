const { default: axios } = require("axios");
const { useEffect } = require("react");

const axiosSecure = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`
}) 

export const useAxiosSecure  = () => {



    return [axiosSecure]
}