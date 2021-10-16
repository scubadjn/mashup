import { fetchData, Client } from './client';

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

export default function fetchWikiData(client: Client) {
  return async (id: string) => {
    try {
      const url = `https://www.wikidata.org/w/api.php?action=wbgetentities&ids=${id}&format=json&props=sitelinks`;
      const res = await fetchData<WikiDataPayload>(client)(url);
      return res.data;
    } catch {
      return null;
    }
  }
}
