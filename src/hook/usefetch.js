import { useContext } from 'react';
import { useHistory } from 'react-router';
import Context from '../components/context/context';
import { API } from '../config';
import { errorAlert } from '../utils/alertNotify';

const useFetch = (endpoint) => {
  const { push } = useHistory();
  const { dispatch } = useContext(Context);
  const customFetch = async (
    url,
    method = 'GET',
    body = false,
    json = true,
    signal = false,
  ) => {
    const defaultHeader = json
      ? {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
      : {};
    let options = {
      method,
      headers:
        'token' in localStorage
          ? {
            ...defaultHeader,
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          }
          : defaultHeader,
    };
    if (body) options.body = json ? JSON.stringify(body) : body;
    if (signal) options = { ...options, signal };
    try {
      const response = await fetch(url, options);
      const jsonResonse = await response.json();
      if (response.status === 401) {
        errorAlert('Acceso Denegado');
        localStorage.removeItem('id');
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        localStorage.removeItem('cart');
        localStorage.removeItem('role');
        // localStorage.removeItem('localData');
        dispatch({ type: 'SET_IS_LOCAL_SELECTED', payload: false });
        push('/login');
      }
      return [jsonResonse, response.status];
    } catch (err) {
      throw new Error(err);
    }
  };
  const getById = (id) => {
    const url = `${API}${endpoint}${id ? `/${id}` : ''}`;
    return customFetch(url);
  };
  const get = (query) => {
    const url = `${API}${endpoint}${query}`;
    return customFetch(url);
  };
  const post = (body = false, json = true, CustomAPI = false) => {
    if (!body) throw new Error('to make a post you must provide a     body');
    return customFetch(
      CustomAPI ? `${CustomAPI}${endpoint}` : `${API}${endpoint}`,
      'POST',
      body,
      json,
    );
  };
  const put = (id = false, body = false, json = true, signal) => {
    if (!id || !body) { throw new Error('to make a put you must provide the id and the   body'); }
    const url = `${endpoint}/${id}`;
    return customFetch(`${API}${url}`, 'PUT', body, json, signal);
  };
  const del = (id = false, body = false) => {
    if (!id) { throw new Error('to make a delete you must provide the id and the body'); }
    const url = `${endpoint}/${id}`;
    return customFetch(`${API}${url}`, 'DELETE', body);
  };
  return {
    get,
    getById,
    post,
    put,
    del,
  };
};
export default useFetch;
