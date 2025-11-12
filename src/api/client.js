const ensureApiPath = (path = '/api') => {
  if (!path) {
    return '/api';
  }
  if (/^https?:\/\//i.test(path)) {
    return path;
  }
  if (path.startsWith('/api')) {
    return path;
  }
  return path.startsWith('/') ? `/api${path}` : `/api/${path}`;
};

class ApiError extends Error {
  constructor(message, status, details) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

const parseJsonSafely = async (response) => {
  try {
    return await response.json();
  } catch {
    return null;
  }
};

const request = async (path, { method = 'GET', body, headers, ...rest } = {}) => {
  const response = await fetch(ensureApiPath(path), {
    method,
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      ...(body ? { 'Content-Type': 'application/json' } : {}),
      ...headers,
    },
    body,
    ...rest,
  });

  const data = await parseJsonSafely(response);

  if (!response.ok) {
    const message =
      (data && (data.message || data.error)) ||
      `Request failed with status ${response.status}`;
    throw new ApiError(message, response.status, data);
  }

  return data;
};

export { ApiError, request };
