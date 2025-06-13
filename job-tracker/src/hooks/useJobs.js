import { useState, useEffect } from 'react';
import { JOBS_PER_PAGE, calculateTotalPages } from '@/utils/jobs';
import { authFetch } from '@/lib/api';
import { deleteJob } from '@/lib/api';
import { getJobId } from "@/utils/jobs";

export function useJobs(session, status) {
    const [jobs, setJobs] = useState([]);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchJobs = async (pageNum = 1) => {
        try {
            const response = await authFetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs?page=${pageNum}&limit=${JOBS_PER_PAGE}`,
                { session }
            );
            const data = await response.json();
            setJobs(data.jobs);
            setTotalPages(calculateTotalPages(data.total, JOBS_PER_PAGE));
        } catch (err) {
            console.log(err);
            setError("Failed to fetch jobs. Please try again later.");
        }
    };

    const handleDelete = async (jobId) => {
        const confirmed = window.confirm("Are you sure you want to delete this job?");
        if (!confirmed) return;
        try {
            setJobs(prevJobs => prevJobs.filter(job => getJobId(job) !== jobId));
            await deleteJob(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs/${jobId}`, { session });
            fetchJobs(page);
        } catch (err) {
            console.error("Error deleting job:", err);
            setError("Failed to delete job. Please try again.");
        }
    }

    useEffect(() => {
        if (status === "authenticated") {
            fetchJobs(page);
        }

    }, [status, page]);

    return { jobs, error, page, totalPages, fetchJobs, setPage, handleDelete };
}