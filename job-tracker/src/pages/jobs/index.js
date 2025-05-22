import {
    JobCard,
    JobList
} from '../../components/Job';
import Button from '../../components/Button';
import PageContainer from '../../components/PageContainer';
import Link from 'next/link';
import Title from '../../components/Title';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function JobsPage(){
    const { data: session, status } = useSession({required: false});
    const router = useRouter;
    const [jobs, setJobs] = useState([]);
    
    useEffect(() => {
        // if(status === "unauthenticated"){
        //     router.push("/auth/login");
        // }
        setJobs([
            { id: 1, company: 'Tech Corp', position: 'Frontend Developer', status: 'Applied' },
            { id: 2, company: 'Design Co', position: 'UI Designer', status: 'Interview' }
        ]);
    }, [status]);

    if(status === 'loading'){
        return <div>Loading...</div>
    }
    return(
        <PageContainer>
        <Title>Your Job Applications</Title>
        <Link href="/jobs/add">
        <Button>Add New</Button>
        </Link>
      <JobList>
        {jobs.map(job => (
          <JobCard key={job.id}>
            <div>
              <h3>{job.company}</h3>
              <p>{job.position}</p>
            </div>
            <span>{job.status}</span>
          </JobCard>
        ))}
      </JobList>
    </PageContainer>
    );
}