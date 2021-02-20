import { executeRequest } from '../utils/executeRequest';



export const createUser = async (username, password, email) =>
  executeRequest({ method: 'POST', url: '/users', body: {username, password, email} });

export const getUserInfo = async (token) =>
  executeRequest({ url: '/api/protected/user-info', token });

export const getFilteredUserList = async (token, filter) =>
  executeRequest({ method: 'POST', url: '/api/protected/users/list', body: {filter}, token });