import axios from 'axios';
import { env } from '@/config/env';

export const httpClient = axios.create({
  baseURL: env.apiBaseUrl,
  headers: { 'Content-Type': 'application/json' },
});

httpClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    const message =
      axios.isAxiosError(error) && error.response?.data && typeof error.response.data === 'object' && 'message' in error.response.data
        ? String((error.response.data as { message: unknown }).message)
        : 'Unable to reach the server. Please try again.';
    return Promise.reject({ message, status: axios.isAxiosError(error) ? error.response?.status : undefined });
  },
);
