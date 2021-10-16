import axios from 'axios';
import NodeCache from 'node-cache';
import { logger } from '../lib';

export type Cache = ReturnType<typeof createCache>;

export function createCache() {
  return new NodeCache({ stdTTL: 7 * 24 * 60 * 60 }); // 1 week
}

export const client = axios.create({
  timeout: 120 * 1000, // ms
});

export type Client = typeof client;

export function fetchData<T>(clientInstance: Client, cache: Cache) {
  return async (url: string): Promise<{ data: T | null, status: number }> => {
    try {
      const start = +new Date();
      const prev = cache.get(url);
      if (prev) {
        logger.info(`[${+new Date() - start} ms] - ${url}`);
        return {
          data: prev as T,
          status: 200,
        }
      };
      const { data, status } = await clientInstance.get<T>(url);
      if (!data) {
        return {
          data: null,
          status,
        }
      };
      cache.set(url, data);
      logger.info(`[${+new Date() - start} ms] - ${url}`);
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