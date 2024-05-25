import axios from 'axios';

export const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_APP_SERVER_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'cache-control': 'no-cache',
  },
});

export const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: '' }) =>
  async ({ url = '', method, data, params, headers }, { signal }) => {
    try {
      const result = await axiosInstance({
        url: baseUrl + url,
        method,
        data,
        params,
        signal,
      });
      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err || err.message,
        },
      };
    }
  };
