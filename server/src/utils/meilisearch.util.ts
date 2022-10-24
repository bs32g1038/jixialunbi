import { MeiliSearch } from 'meilisearch';

export const meiliSearchClient = new MeiliSearch({
  host: process.env.MEILI_SEARCH_CLIENT_HOST,
  apiKey: process.env.MEILI_SEARCH_CLIENT_API_KEY,
});

export const postsMeiliSearchIndex = meiliSearchClient.index('posts');
