import tokenService from './tokenService';

const BASE_URL = '/api/topics';

export function getAllTopicsAPI() {
  return fetch(BASE_URL, {
    headers: {
      'Authorization': `Bearer ${tokenService.getTokenFromLocalStorage()}`
    }
  })
  .then(allTopics => allTopics.json());
}