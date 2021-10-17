import { client } from './client';
import fetchMusicBrainz from './musicBrainz'
import fetchWikiData from './wikidata'
import fetchWikiPedia from './wikipedia'
import fetchCoverArt from './coverArt'

const external = {
  musicBrainz: (mbid: string) => fetchMusicBrainz(mbid),
  wikiData: (id: string) => fetchWikiData(client)(id),
  wikiPedia: (title: string) => fetchWikiPedia(client)(title),
  coverArt: (mbid: string) => fetchCoverArt(client)(mbid),
}

export type External = typeof external;
export default external;
