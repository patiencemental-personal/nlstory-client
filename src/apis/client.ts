import axios from 'axios';

const defaultConfig = {
  baseURL: process.env.REACT_APP_NLSTORY_SERVER,
  withCredentials: true, // 쿠키 전송
};

export const client = axios.create(defaultConfig);
