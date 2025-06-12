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

  useEffect(() => {
    if (status === "authenticated") {
      fetchJobs();
    }

  }, [status]);

  const fetchJobs = async () => {
    try {

      const response = await authFetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs`, {
        session
      })
      const data = await response.json();
      setJobs(data);
      console.log(data);

    } catch (err) {
      console.log(err);
    }
  }

  const handleDelete = async(jobId) => {
    try{
      await deleteJob(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs/${jobId}`, { session });
      fetchJobs();
    } catch(err) {
      console.error("Error deleting job:", err);
      setError("Failed to delete job. Please try again.");
    }
  }

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
    /* TODO: Add pagination */
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
              <span>{job.status}</span>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Link href={`/jobs/edit/${job.id || job._id}`}>
                <Button variant="edit"><i className='bi bi-pencil-square' style={{ marginRight: '4px'}}>Edit</i></Button>
                </Link>
                <Button variant="delete" onClick={() => handleDelete(job.id || job._id)}>
                  <i className='bi bi-trash' style={{ marginRight: '4px'}}>Delete</i>
                </Button>
              </div>
            </JobCard>
          ))}
        </JobList>
      </AuthGuard>
    </PageContainer>
  );
}