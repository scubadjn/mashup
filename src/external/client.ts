import axios from 'axios';
import { logger } from '../lib';

export const client = axios.create({
  timeout: 120 * 1000, // ms
});

export type Client = typeof client;

export function fetchData<T>(clientInstance: Client) {
  return async (url: string): Promise<{ data: T | null, status: number }> => {
    try {
      const start = +new Date();
      const { data, status } = await clientInstance.get<T>(url);
      if (!data) {
        return {
          data: null,
          status,
        }
      };
      logger.log(`[${+new Date() - start} ms] - ${url}`);
      return {
        data: data as T,
        status: 200,
      }
    } catch (e) {
      return {
        data: null,
        status: e.status || 500,
      }
    }
  }
}