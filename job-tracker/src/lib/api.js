import { signOut, signIn } from "next-auth/react";

async function handleFetch(url, options = {}) {
  const response = await fetch(url, options);

  // if (response.status === 401) {
  //     await signOut({ callbackUrl: '/auth/login?sessionExpired=true' });
  //     return Promise.reject(new Error('Session expired. Please log in again.'));
  // }

  if (!response.ok) {
    const error = await response.json();
    return Promise.reject(error);
  }

  return response;
}

export async function authFetch(url, { session, ...options } = {}) {
  return handleFetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${session?.backendToken}`
    }
  });
}

export async function fetchStats(url, { session } = {
  method: 'GET',
}) {
  const response = await handleFetch(url, {
    headers: {
      'Authorization': `Bearer ${session?.backendToken}`
    }
  });

  return response.json();
}

export async function fetchPublicStats(url) {
  const response = await fetch(url, {
    contentType: 'application/json',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (!response.ok) {
    const error = await response.json();
    return Promise.reject(error);
  }
  return response.json();
}

export async function deleteJob(url, { session }) {
  const response = await handleFetch(url, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${session?.backendToken}`
    }
  });
  if (!response.ok) {
    const error = await response.json();
    return Promise.reject(error);
  }
  return response.json();
}