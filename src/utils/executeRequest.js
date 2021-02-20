import { api } from '../constants';


async function executeRequest({
  method = 'GET',
  contentType = 'application/json',
  url,
  body = null,
  token = null
}) {
  try {
    const headers = new Headers();

    if (token) {
      headers.append('Authorization', `Bearer ${token}`);
    }

    if (contentType && method !== 'GET') {
      headers.append('Content-Type', contentType);
    }
  
    if (body && contentType === 'application/json') {
      body = JSON.stringify(body);
    }
  
    const res = await fetch(`${api.host}/${url}`, {
      method,
      headers,
      body
    });

    if (res.ok) {
      const data = await res.json();
      return {status: 'success', data, code: res.status};
    }

    return {status: 'error', error: res.statusText, code: res.status};

  } catch(error) {
    return {status: 'error', error, code: 500};
  }  
}

export { executeRequest };
