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
import { authFetch } from '@/lib/api';

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
            </JobCard>
          ))}
        </JobList>
      </AuthGuard>
    </PageContainer>
  );
}