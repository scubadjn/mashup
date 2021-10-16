import { Client, fetchData } from './client';

interface Image {
  image: string;
}

interface CoverArtResponse {
  images: Image[];
}

export interface CoverArtPayload {
  mbid: string;
  data: CoverArtResponse | null;
}

export default function fetchCoverArt(client: Client) {
  return async (mbid: string): Promise<CoverArtPayload | null> => {
    try {
      const url = `http://coverartarchive.org/release-group/${mbid}`;
      const res = await fetchData<CoverArtResponse>(client)(url);
      return {
        data: res.data,
        mbid,
      };
    } catch {
      return null;
    }
  }
}
