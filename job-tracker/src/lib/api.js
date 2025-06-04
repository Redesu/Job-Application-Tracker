import { signOut, signIn } from "next-auth/react";
export async function authFetch(url, { session, ...options } = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${session?.backendToken}`
    }
  });

  if (response.status === 401) {
    const errorData = await response.json();
    if (errorData.error === 'TOKEN_EXPIRED') {
      await signOut({ callbackUrl: '/auth/login?sessionExpired=true' });
      return Promise.reject(new Error('Session expired. Please log in again.'));
    }
  }

  if (!response.ok) {
    const error = await response.json();
    return Promise.reject(error);
  }

  return response

}
export async function fetchStats(url, { session } = {}) {
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${session?.backendToken}`
    }
  });

  if (response.status === 401) {
    const errorData = await response.json();
    if (errorData.error === 'TOKEN_EXPIRED') {
      await signOut({ callbackUrl: '/auth/login?sessionExpired=true' });
      return Promise.reject(new Error('Session expired. Please log in again.'));
    }
  }

  if (!response.ok) {
    const error = await response.json();
    return Promise.reject(error);
  }

  return response

}