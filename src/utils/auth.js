export const setAuthToken = (token) => {
  // Intentionally left blank: tokens are stored in HTTP-only cookies on the server.
};

export const getAuthToken = () => {
  // No client-accessible token when using httpOnly cookies
  return null;
};

export const removeAuthToken = () => {
  // No-op; use server logout endpoint to clear cookie
};