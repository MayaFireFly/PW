import { executeRequest } from '../utils/executeRequest';



export const createUser = async (data) =>
  executeRequest({ method: 'POST', url: '/users', body: { ...data } });

export const getUserInfo = async (token) =>
  executeRequest({ url: '/api/protected/user-info', token });

export const getFilteredUserList = async (data) =>
  executeRequest({ method: 'POST', url: '/api/protected/users/list', body: {filter: data.filter}, token: data.token });