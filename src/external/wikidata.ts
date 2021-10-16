import { fetchData, Cache, Client } from './client';

interface SiteLinks {
  site: string;
  title: string;
}

interface Entities {
  type: 'item';
  sitelinks: {
    [id: string]: SiteLinks
  }
}

export interface WikiDataPayload {
  entities: {
    [id: string]: Entities
  };
}

export default function fetchWikiData(client: Client, cache: Cache) {
  return async (id: string) => {
    try {
      const url = `https://www.wikidata.org/w/api.php?action=wbgetentities&ids=${id}&format=json&props=sitelinks`;
      const res = await fetchData<WikiDataPayload>(client, cache)(url);
      return res.data;
    } catch {
      return null;
    }
  }
}
