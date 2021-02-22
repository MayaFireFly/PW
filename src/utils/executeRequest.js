import { api } from '../constants';


async function executeRequest({
  method = 'GET',
  contentType = 'application/json',
  url,
  body = null,
  token = null
}) {
  try {
    const headers = {};
    console.log('BODY');
    console.log(body);
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    if (contentType && method !== 'GET') {
      headers['Content-Type'] = contentType;
    }
  
    if (body && contentType === 'application/json') {
      body = JSON.stringify(body);
    }
    console.log(headers);
    console.log(method);
    console.log(body);
    const res = await fetch(`${api.host}${url}`, {
      method,
      headers,
      body
    });

    if (res.ok) {
      const data = await res.json();
      return {data, code: res.status};
    }

    return {error: res.statusText, code: res.status};

  } catch(error) {
    return {error: error.message, code: 500};
  }  
}

export { executeRequest };
