import { executeRequest } from '../utils/executeRequest';


export const getTransactionsList = async (token) =>
  executeRequest({ url: '/api/protected/transactions', token });

export const createTransaction = async (data) =>
  executeRequest({ method: 'POST', url: '/api/protected/transactions', body: { 
    name: data.name, 
    amount: data.amount 
  }, token: data.token });