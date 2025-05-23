const API_URL = process.env.NEXT_PUBLIC_API_URL;
export async function fetchJobs(token){
    const res = await fetch(`${API_URL}/jobs`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return res.json();
}