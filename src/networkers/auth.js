import { executeRequest } from '../utils/executeRequest';


export const login = async (email, password) =>
  executeRequest({ method: 'POST', url: '/sessions/create', body: {email, password} });