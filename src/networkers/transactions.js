import { executeRequest } from '../utils/executeRequest';


export const getTransactionsList = async (token) =>
  executeRequest({ url: '/api/protected/transactions', token });

export const createTransaction = async (token, name, amount) =>
  executeRequest({ method: 'POST', url: '/api/protected/transactions', body: { name, amount }, token });