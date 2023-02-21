import axios from 'axios';

const defaultConfig = {
  baseURL: process.env.REACT_APP_NLSTORY_SERVER,
  // https://inpa.tistory.com/entry/AXIOS-%F0%9F%93%9A-CORS-%EC%BF%A0%ED%82%A4-%EC%A0%84%EC%86%A1withCredentials-%EC%98%B5%EC%85%98#:~:text=%ED%91%9C%EC%A4%80%20CORS%EC%9A%94%EC%B2%AD%EC%9D%80%20%EA%B8%B0%EB%B3%B8%EC%A0%81%EC%9C%BC%EB%A1%9C%20%EC%BF%A0%ED%82%A4%EB%A5%BC%20%EC%84%A4%EC%A0%95%ED%95%98%EA%B1%B0%EB%82%98%20%EB%B3%B4%EB%82%BC%20%EC%88%98%20%EC%97%86%EB%8B%A4.,%EB%A7%88%EC%B0%AC%EA%B0%80%EC%A7%80%EB%A1%9C%20%EC%84%9C%EB%B2%84%EB%8F%84%20%EC%9D%91%EB%8B%B5%ED%97%A4%EB%8D%94%EC%97%90%20Access-Control-Allow-Credentials%EB%A5%BC%20true%20%EB%A1%9C%20%EC%84%A4%EC%A0%95%ED%95%B4%EC%95%BC%20%ED%95%9C%EB%8B%A4.
  withCredentials: true, // 쿠키 전송
};

const client = axios.create(defaultConfig);

export async function login(password: string) {
  return await client.post('/auth/login', { password });
}

export async function loginSuccess() {
  return await client.get('/auth/login/success');
}

export async function logout() {
  return await client.post('/auth/logout');
}