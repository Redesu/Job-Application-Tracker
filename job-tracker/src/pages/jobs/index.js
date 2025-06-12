import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

import Button from '@/components/Button';
import {
  JobCard,
  JobList
} from '@/components/Job'
import Link from 'next/link';
import PageContainer from '@/components/PageContainer';
import Title from '@/components/Title';
import AuthGuard from '@/components/AuthGuard';
import { authFetch, deleteJob } from '@/lib/api';

export default function JobsPage() {
  const { data: session, status } = useSession({ required: false });
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (status === "authenticated") {
      fetchJobs(page);
    }

  }, [status, page]);

  const fetchJobs = async (pageNum = 1) => {
    try {

      const response = await authFetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs?page=${pageNum}&limit=10`, {
        session
      })
      const data = await response.json();
      setJobs(data.jobs);
      setTotalPages(Math.ceil(data.total / 10));
      console.log(data.jobs);
    } catch (err) {
      console.log(err);
    }
  }

  const handleDelete = async (jobId) => {
    const confirmed = window.confirm("Are you sure you want to delete this job?");
    if (!confirmed) return;
    try {

      await deleteJob(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs/${jobId}`, { session });
      fetchJobs();
    } catch (err) {
      console.error("Error deleting job:", err);
      setError("Failed to delete job. Please try again.");
    }
  }

  const handlePrev = () => setPage((prev) => Math.max(1, prev - 1));
  const handleNext = () => setPage((prev) => Math.min(totalPages, prev + 1));


  if (error) {
    return (
      <PageContainer>
        <Title>Your Job Applications</Title>
        <p>{error}</p>
        <Button onClick={fetchJobs}>Try Again</Button>
      </PageContainer>
    )
  }

  return (
    /* TODO: Mobile Responsiveness */
    <PageContainer>
      <AuthGuard>
        <Title>Your Job Applications</Title>
        <Link href="/jobs/add">
          <Button>Add New</Button>
        </Link>
        {jobs.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">No jobs found</p>
            <Button onClick={fetchJobs}>Refresh</Button>
          </div>
        )}
        <JobList>
          {jobs.map(job => (
            <JobCard key={job.id || job._id}>
              <div>
                <h3>{job.company}</h3>
                <p>{job.position}</p>
              </div>
              <span
                style={{
                  fontWeight: 'bold',
                  marginRight: '8px',
                  textAlign: 'left',
                  display: 'inline-block',
                  width: '100px',
                }}>{job.status}
              </span>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Link href={`/jobs/edit/${job.id || job._id}`}>
                  <Button variant="edit"><i className='bi bi-pencil-square' style={{ marginRight: '4px' }}>Edit</i></Button>
                </Link>
                <Button variant="delete" onClick={() => handleDelete(job.id || job._id)}>
                  <i className='bi bi-trash' style={{ marginRight: '4px' }}>Delete</i>
                </Button>
              </div>
            </JobCard>
          ))}
        </JobList>
        {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '16px' }}>
          <Button onClick={handlePrev} disabled={page === 1}>Previous</Button>
          {Array.from({ length: totalPages }, (_, idx) => (
            <Button
              key={idx + 1}
              variant={page === idx + 1 ? "edit" : "default"}
              onClick={() => setPage(idx + 1)}
              style={{ minWidth: 36, fontWeight: page === idx + 1 ? 'bold' : 'normal' }}
            >
              {idx + 1}
            </Button>
          ))}
          <Button onClick={handleNext} disabled={page === totalPages}>Next</Button>
        </div>
        )}
      </AuthGuard>
    </PageContainer>
  );
}