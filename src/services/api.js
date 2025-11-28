const API_BASE_URL = '/api';

// Bible Posts API
export const bibleAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/bible`);
    if (!response.ok) throw new Error('Failed to fetch Bible posts');
    return response.json();
  },
  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/bible/${id}`);
    if (!response.ok) throw new Error('Failed to fetch Bible post');
    return response.json();
  },
  create: async (post) => {
    const response = await fetch(`${API_BASE_URL}/bible`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    });
    if (!response.ok) throw new Error('Failed to create Bible post');
    return response.json();
  },
  update: async (id, post) => {
    const response = await fetch(`${API_BASE_URL}/bible/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    });
    if (!response.ok) throw new Error('Failed to update Bible post');
    return response.json();
  },
  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/bible/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete Bible post');
    return response.json();
  },
};

// Prayer Posts API
export const prayerAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/prayer`);
    if (!response.ok) throw new Error('Failed to fetch Prayer posts');
    return response.json();
  },
  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/prayer/${id}`);
    if (!response.ok) throw new Error('Failed to fetch Prayer post');
    return response.json();
  },
  create: async (post) => {
    const response = await fetch(`${API_BASE_URL}/prayer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    });
    if (!response.ok) throw new Error('Failed to create Prayer post');
    return response.json();
  },
  update: async (id, post) => {
    const response = await fetch(`${API_BASE_URL}/prayer/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    });
    if (!response.ok) throw new Error('Failed to update Prayer post');
    return response.json();
  },
  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/prayer/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete Prayer post');
    return response.json();
  },
};

// PTSR Posts API
export const ptsrAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/ptsr`);
    if (!response.ok) throw new Error('Failed to fetch PTSR posts');
    return response.json();
  },
  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/ptsr/${id}`);
    if (!response.ok) throw new Error('Failed to fetch PTSR post');
    return response.json();
  },
  create: async (post) => {
    const response = await fetch(`${API_BASE_URL}/ptsr`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    });
    if (!response.ok) throw new Error('Failed to create PTSR post');
    return response.json();
  },
  update: async (id, post) => {
    const response = await fetch(`${API_BASE_URL}/ptsr/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    });
    if (!response.ok) throw new Error('Failed to update PTSR post');
    return response.json();
  },
  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/ptsr/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete PTSR post');
    return response.json();
  },
};

