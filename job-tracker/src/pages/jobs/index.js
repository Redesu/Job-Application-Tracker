import { useSession } from 'next-auth/react';
import Link from 'next/link';

import Button from '@/components/Button';
import {
  JobCard,
  JobList
} from '@/components/Job';
import PageContainer from '@/components/PageContainer';
import Title from '@/components/Title';
import AuthGuard from '@/components/AuthGuard';
import JobActions from '@/components/JobActions';
import Pagination from '@/components/Pagination';
import { useJobs } from '@/hooks/useJobs';
import { getJobId } from '@/utils/jobs';


export default function JobsPage() {
  const { data: session, status } = useSession({ required: false });
  const { jobs, error, page, totalPages, fetchJobs, setPage, handleDelete } = useJobs(session, status);

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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <Title>Your Job Applications</Title>
          <Link href="/jobs/add">
            <Button variant="new">Add New</Button>
          </Link>
        </div>

        {jobs.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">No jobs found</p>
            <Button onClick={fetchJobs}>Refresh</Button>
          </div>
        ) : (
          <>
            <JobList>
              {jobs.map(job => (
                <JobCard key={getJobId(job)}>
                  <div>
                    <h3>{job.company}</h3>
                    <p>{job.position}</p>
                  </div>
                  <span style={{
                    fontWeight: 'bold',
                    marginRight: '8px',
                    textAlign: 'center',
                    display: 'inline-block',
                    width: '100px',
                  }}>{job.status}</span>
                  <JobActions job={job} onDelete={handleDelete} />
                </JobCard>
              ))}
            </JobList>

            {totalPages > 1 && (
              <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            )}
          </>
        )}
      </AuthGuard>
    </PageContainer>
  );
}