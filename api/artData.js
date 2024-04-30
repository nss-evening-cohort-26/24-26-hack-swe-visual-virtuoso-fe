import { clientCredentials } from '../utils/client';
// API CALLS FOR ART

const endpoint = clientCredentials.databaseURL;

const getArt = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/artwork`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

// TODO: DELETE ART
const deleteArt = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/artwork/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

// TODO: GET SINGLE ART
const getSingleArt = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/artwork/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// TODO: CREATE ART
const createArt = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/artwork`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// TODO: UPDATE ART
const updateArt = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/artwork/${payload.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.text())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getArt,
  createArt,
  deleteArt,
  getSingleArt,
  updateArt,
};
