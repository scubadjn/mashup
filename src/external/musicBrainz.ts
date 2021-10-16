import { fetchData, Cache, Client } from './client';

interface ReleaseGroups {
  id: string;
  title: string;
  'primary-type': 'Album' | string;
}

interface Relations {
  type: 'wikidata';
  url: {
    resource: string;
  }
}

export interface MusicBrainzPayload {
  id: string;
  name: string;
  'release-groups': ReleaseGroups[];
  relations: Relations[];
}

export default function fetchMusicBrainz(client: Client, cache: Cache) {
  return async (mbid: string) => {
    try {
      const url = `http://musicbrainz.org/ws/2/artist/${mbid}?&fmt=json&inc=url-rels+release-groups`;
      const res = await fetchData<MusicBrainzPayload>(client, cache)(url);
      return res.data;
    } catch {
      return null;
    }
  }
}
