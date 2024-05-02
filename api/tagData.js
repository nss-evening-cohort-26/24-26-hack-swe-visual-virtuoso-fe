import { clientCredentials } from '../utils/client';
// API CALLS FOR ART

const endpoint = clientCredentials.databaseURL;

const getTags = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/tags`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const getSingleTag = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/tags/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.text())
    .then((data) => resolve(data))
    .catch(reject);
});

// TODO: DELETE TAG
const deleteTag = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/tags/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const addTagToArtwork = (id, payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/artwork/${id}/tags`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const getArtTags = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/tags?orderBy="artworkId"&equalTo="${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

export {
  getTags, getSingleTag, deleteTag, addTagToArtwork, getArtTags,
};
