import axios from 'axios';
import { ServerError, ClientError } from '../lib';

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

export default async function fetchMusicBrainz(mbid: string): Promise<MusicBrainzPayload> {
  try {
    const url = `http://musicbrainz.org/ws/2/artist/${mbid}?&fmt=json&inc=url-rels+release-groups`;
    const res = await axios.get(url, {
      timeout: 30000,
      headers: {
        'User-Agent': 'mashup/1.0 ( daanin@gmail.com )'
      },
    });
    if (res.status === 200 && res.data) return res.data;
    throw new ServerError('fetchMusicBrainz');
  } catch (e) {
    switch (e?.response?.status) {
      case 404:
        throw new ClientError(404, 'not found');
      case 400:
        throw new ClientError(400, 'Bad request');
      default:
        throw new ServerError('fetchMusicBrainz', e);
    }
  }
}