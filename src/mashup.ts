import { External } from './external';
import { CoverArtPayload } from './external/coverArt';
import { MusicBrainzPayload } from './external/musicBrainz';
import { WikiDataPayload } from './external/wikidata';
import { WikipediaPayload } from './external/wikipedia';
import { ServerError, Ctx } from './lib';

export const parser = {
  musicBrainz: {
    getWikiDataId: (input: MusicBrainzPayload): string => {
      try {
        const [pick] = input.relations.filter(i => i.type === 'wikidata')
        const parts = pick.url.resource.split('/');
        return parts[parts.length - 1];
      } catch {
        throw new ServerError('getWikiDataId');
      }
    },
    getReleaseGroupIds: (input: MusicBrainzPayload) => {
      try {
        return input['release-groups'].map(i => i.id);
      } catch {
        throw new ServerError('getReleaseGroupIds');
      }
    },
  },
  converart: {
    getImage: (mbid: string, payloads: (CoverArtPayload | null)[]) => {
      try {
        const result = payloads.find(i => i && i.mbid === mbid);
        if (result && result.data) return result.data.images[0].image
        return null;
      } catch {
        throw new ServerError('getImage');
      }
    },
  },
  wikidata: {
    getEnSiteLink: (input: WikiDataPayload, id: string) => {
      try {
        return input.entities[id].sitelinks.enwiki.title;
      } catch {
        throw new ServerError('getEnSiteLink');
      }
    }
  },
  wikipedia: {
    getHtml: (data: WikipediaPayload) => {
      try {
        const [firstPage] = Object.keys(data.query.pages);
        return data.query.pages[firstPage].extract;
      } catch {
        throw new ServerError('getHtml');
      }
    }
  }
}

interface AlbumPayload {
  id: string;
  title: string;
  image: string;
}

interface Payload {
  mbid: string;
  name: string;
  description: string;
  albums: AlbumPayload[];
}

export default async function mashup(ctx: Ctx, external: External, mbid: string, refetch: boolean): Promise<Payload> {
  if (!refetch) {
    const prev = ctx.cache.get<Payload>(mbid);
    if (prev) return prev;
  }
  const musicBrainz = await external.musicBrainz(mbid);
  const wikiDataId = parser.musicBrainz.getWikiDataId(musicBrainz);
  const wikiData = await external.wikiData(wikiDataId);
  if (!wikiData) throw new ServerError('wikiData client error');
  const ensitelink = parser.wikidata.getEnSiteLink(wikiData, wikiDataId);
  const wikipedia = await external.wikiPedia(ensitelink);
  if (!wikipedia) throw new ServerError('wikipedia client error');
  const releaseGroupIds = parser.musicBrainz.getReleaseGroupIds(musicBrainz);
  const coverarts = await Promise.all(releaseGroupIds.map(external.coverArt));
  const result = {
    mbid: musicBrainz.id,
    name: musicBrainz.name,
    description: parser.wikipedia.getHtml(wikipedia),
    albums: musicBrainz['release-groups'].map(d => ({
      id: d.id,
      title: d.title,
      image: parser.converart.getImage(d.id, coverarts) || '',
    })),
  };
  ctx.cache.set<Payload>(mbid, result);
  return result;
}