import { client, createCache } from './client';
import fetchMusicBrainz from "./musicBrainz"
import fetchWikiData from "./wikidata"
import fetchWikiPedia from "./wikipedia"
import fetchCoverArt from "./coverArt"

export type External = ReturnType<typeof createExternal>
export default function createExternal() {
  const cache = createCache();
  return {
    musicBrainz: (mbid: string) => fetchMusicBrainz(client, cache)(mbid),
    wikiData: (id: string) => fetchWikiData(client, cache)(id),
    wikiPedia: (title: string) => fetchWikiPedia(client, cache)(title),
    coverArt: (mbid: string) => fetchCoverArt(client, cache)(mbid),
  };
};