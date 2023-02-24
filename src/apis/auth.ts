import { client } from './client';

export async function login(password: string) {
  return await client.post('/auth/login', { password });
}

export async function loginSuccess() {
  return await client.get('/auth/login/success');
}

export async function logout() {
  return await client.post('/auth/logout');
}