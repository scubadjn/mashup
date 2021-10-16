import { fetchData, Cache, Client } from './client';

interface Pages {
  pageid: number;
  ns: number;
  title: string;
  extract: string;
}

export interface WikipediaPayload {
  query: {
    pages: {
      [pageId: string]: Pages
    }
  };
}

export default function fetchWikiPedia(client: Client, cache: Cache) {
  return async (title: string) => {
    try {
      const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro=true&redirects=true&titles=${encodeURI(title)}`;
      const res = await fetchData<WikipediaPayload>(client, cache)(url);
      return res.data;
    } catch {
      return null;
    }
  }
}
