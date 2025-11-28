// Use proxy in development (configured in vite.config.js) or full URL in production
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export const api = {
  // Bible posts
  getBiblePosts: async () => {
    const response = await fetch(`${API_BASE_URL}/bible`);
    if (!response.ok) {
      throw new Error('Failed to fetch Bible posts');
    }
    return response.json();
  },

  getBiblePost: async (id) => {
    const response = await fetch(`${API_BASE_URL}/bible/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch Bible post');
    }
    return response.json();
  },

  createBiblePost: async (post) => {
    const response = await fetch(`${API_BASE_URL}/bible`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    });
    if (!response.ok) {
      throw new Error('Failed to create Bible post');
    }
    return response.json();
  },

  updateBiblePost: async (id, post) => {
    const response = await fetch(`${API_BASE_URL}/bible/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    });
    if (!response.ok) {
      throw new Error('Failed to update Bible post');
    }
    return response.json();
  },

  deleteBiblePost: async (id) => {
    const response = await fetch(`${API_BASE_URL}/bible/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete Bible post');
    }
    return response.json();
  },

  // Prayer posts
  getPrayerPosts: async () => {
    const response = await fetch(`${API_BASE_URL}/prayer`);
    if (!response.ok) {
      throw new Error('Failed to fetch Prayer posts');
    }
    return response.json();
  },

  getPrayerPost: async (id) => {
    const response = await fetch(`${API_BASE_URL}/prayer/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch Prayer post');
    }
    return response.json();
  },

  createPrayerPost: async (post) => {
    const response = await fetch(`${API_BASE_URL}/prayer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    });
    if (!response.ok) {
      throw new Error('Failed to create Prayer post');
    }
    return response.json();
  },

  updatePrayerPost: async (id, post) => {
    const response = await fetch(`${API_BASE_URL}/prayer/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    });
    if (!response.ok) {
      throw new Error('Failed to update Prayer post');
    }
    return response.json();
  },

  deletePrayerPost: async (id) => {
    const response = await fetch(`${API_BASE_URL}/prayer/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete Prayer post');
    }
    return response.json();
  },

  // PTSR posts
  getPtsrPosts: async () => {
    const response = await fetch(`${API_BASE_URL}/ptsr`);
    if (!response.ok) {
      throw new Error('Failed to fetch PTSR posts');
    }
    return response.json();
  },

  getPtsrPost: async (id) => {
    const response = await fetch(`${API_BASE_URL}/ptsr/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch PTSR post');
    }
    return response.json();
  },

  createPtsrPost: async (post) => {
    const response = await fetch(`${API_BASE_URL}/ptsr`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    });
    if (!response.ok) {
      throw new Error('Failed to create PTSR post');
    }
    return response.json();
  },

  updatePtsrPost: async (id, post) => {
    const response = await fetch(`${API_BASE_URL}/ptsr/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    });
    if (!response.ok) {
      throw new Error('Failed to update PTSR post');
    }
    return response.json();
  },

  deletePtsrPost: async (id) => {
    const response = await fetch(`${API_BASE_URL}/ptsr/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete PTSR post');
    }
    return response.json();
  },
};
