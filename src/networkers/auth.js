import { executeRequest } from '../utils/executeRequest';


export const login = async (data) =>
  executeRequest({ method: 'POST', url: '/sessions/create', body: { ...data } });