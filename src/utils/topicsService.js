import tokenService from './tokenService';

const BASE_URL = '/api/topics';

export function getAllTopicsAPI() {
  return fetch(BASE_URL, {
    headers: {
      'Authorization': `Bearer ${tokenService.getTokenFromLocalStorage()}`
    }
  }).then(allTopics => allTopics.json());
}

export function createTopicAPI(topicToCreate) {
  return fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${tokenService.getTokenFromLocalStorage()}`
    },
    body: JSON.stringify(topicToCreate)
  }).then(newTopic => newTopic.json());
}