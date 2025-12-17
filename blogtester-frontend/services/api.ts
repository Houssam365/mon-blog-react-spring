import { API_BASE_URL } from '../constants';

// Helper to get headers with JWT
const getHeaders = (token: string | null, hasBody: boolean = true) => {
  const headers: HeadersInit = {};
  if (hasBody) {
    headers['Content-Type'] = 'application/json';
  }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

// Generic error handler
const handleResponse = async (response: Response) => {
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || data.error || 'Something went wrong');
  }
  return data;
};

// Auth Services
export const authService = {
  login: async (credentials: any) => {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    return handleResponse(res);
  },

  register: async (credentials: any) => {
    const res = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    return handleResponse(res);
  }
};

// Article Services
export const articleService = {
  getAll: async (search?: string, author?: string) => {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (author) params.append('author', author);

    const url = `${API_BASE_URL}/articles?${params.toString()}`;
    const res = await fetch(url);
    return handleResponse(res);
  },

  getOne: async (id: string) => {
    const res = await fetch(`${API_BASE_URL}/articles/${id}`);
    return handleResponse(res);
  },

  create: async (data: any, token: string) => {
    const res = await fetch(`${API_BASE_URL}/articles`, {
      method: 'POST',
      headers: getHeaders(token),
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  update: async (id: string, data: any, token: string) => {
    const res = await fetch(`${API_BASE_URL}/articles/${id}`, {
      method: 'PUT',
      headers: getHeaders(token),
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  delete: async (id: string, token: string) => {
    const res = await fetch(`${API_BASE_URL}/articles/${id}`, {
      method: 'DELETE',
      headers: getHeaders(token, false),
    });
    return handleResponse(res);
  }
};

// Comment Services
export const commentService = {
  getByArticle: async (articleId: string) => {
    // Matches router.get('/article/:articleId', ...)
    const res = await fetch(`${API_BASE_URL}/comments/article/${articleId}`);
    return handleResponse(res);
  },

  getByAuthor: async (userId: string) => {
    const res = await fetch(`${API_BASE_URL}/comments/author/${userId}`);
    return handleResponse(res);
  },

  add: async (data: { articleId: string; content: string }, token: string) => {
    // Matches router.post('/', ...)
    const res = await fetch(`${API_BASE_URL}/comments`, {
      method: 'POST',
      headers: getHeaders(token),
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  delete: async (id: string, token: string) => {
    // Matches router.delete('/:id', ...)
    const res = await fetch(`${API_BASE_URL}/comments/${id}`, {
      method: 'DELETE',
      headers: getHeaders(token, false),
    });
    return handleResponse(res);
  }
};