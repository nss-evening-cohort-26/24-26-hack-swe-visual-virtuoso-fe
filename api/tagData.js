import { clientCredentials } from '../utils/client';
// API CALLS FOR ART

const endpoint = clientCredentials.databaseURL;

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

export { deleteTag, addTagToArtwork };
