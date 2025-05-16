import {
    JobCard,
    JobList
} from '../../components/Job';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function JobsPage(){
    const { data: session, status } = useSession();
    const router = useRouter;
    const [jobs, setJobs] = useState([])
}