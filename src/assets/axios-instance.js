// axios-instance.js
import axios from 'axios';
import { useToken } from '../store/tokenStore';
import * as API from './API';

const instance = axios.create({
    timeout: 20000, // Timeout cho mỗi yêu cầu
});

instance.interceptors.request.use(
    (config) => {
        const token = useToken().token;
        console.log("1-- ");
        if (token.length == 0) {
            return config;
        }
        console.log("2-- ");
        config.headers["Authorization"] = `Bearer ${token}`;

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export { instance };
