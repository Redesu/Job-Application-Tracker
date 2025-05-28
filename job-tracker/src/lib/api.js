export async function createJob(jobData) {
  const session = await getSession();
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/jobs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session.jwt}` // JWT from NextAuth
    },
    body: JSON.stringify(jobData)
  });
  return await response.json();
}