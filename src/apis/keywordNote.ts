import { client } from './client';

export async function getDailyKeywordNote() {
  return await client.get('/keywordNote/daily');
}

export async function getKeywordNoteDetail(pageId: string) {
  return await client.get(`/keywordNote/${pageId}`);
}

export async function updateKeywordNoteProperties(pageId: string, properties: object) {
  const data = { properties };
  return await client.patch(`/keywordNote/${pageId}`, data);
}