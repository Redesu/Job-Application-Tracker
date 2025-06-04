import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { fetchPublicStats, fetchStats } from '@/lib/api';
import Button from '@/components/Button';
import StatsCard from '@/components/StatsCard';
import StatsGrid from '@/components/StatsGrid';
import DashboardContainer from '@/components/DashboardContainer';
import Link from 'next/link';
const Dashboard = () => {
  const {data: session, status} = useSession();
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (status === "authenticated") {
      fetchStats();
    } else if (status === "unauthenticated") {
      fetchPublicStats();
    }
  }, [status]);

  try{
    const response = await fetchStats(`${process.env.NEXT_PUBLIC_API_URL}/api/stats`, {session});
    const data = await response.json();
    setStats(data);
  } catch (error) {
      console.error(error);
      alert(error.message);
    }


  
  <DashboardContainer>
  
    <StatsGrid>
      <StatsCard 
        title="Applications" 
        count={24} 
        trend="↑ 3 this week" 
      />
      <StatsCard 
        title="Interviews" 
        count={5} 
        trend="→ 0 pending" 
      />
    </StatsGrid>
  </DashboardContainer>
};


export default function Home() {
  return <Dashboard />;
}