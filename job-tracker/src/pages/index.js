import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { fetchPublicStats, fetchStats } from '@/lib/api';
import Button from '@/components/Button';
import StatsCard from '@/components/StatsCard';
import StatsGrid from '@/components/StatsGrid';
import DashboardContainer from '@/components/DashboardContainer';
import Link from 'next/link';
const Dashboard = () => {
  const { data: session, status } = useSession();
  const [stats, setStats] = useState(0);
  const [publicStats, setPublicStats] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getStats() {
      try {
        if (status === "authenticated") {
          const data = await fetchStats(`${process.env.NEXT_PUBLIC_API_URL}/api/stats`, { session });
          setStats(data);
        } else if (status === "unauthenticated") {
          const data = await fetchPublicStats(`${process.env.NEXT_PUBLIC_API_URL}/api/publicStats`);
          setPublicStats(data);
        }
      } catch (err) {
        setError(err);
      }
    }
    getStats();
  }, [status]);

  console.log(status, stats, publicStats);






  return (
  <DashboardContainer>

    <StatsGrid>
      {status == "unauthenticated" && publicStats && (
        <StatsGrid>
          
          <StatsCard title="Total users" count={publicStats.totalUsers} trend={publicStats?.weeklyUsersChange ? `↑ ${publicStats.weeklyUsersChange} this week` : 'No data'}/>
          <StatsCard title="Total Interviews" count={publicStats.totalApplications} trend={publicStats?.weeklyInterviewsChange ? `↑ ${publicStats.weeklyInterviewsChange} this week` : 'No data'}/>
        </StatsGrid>
      )}
      {status === "authenticated" && (
        <>
          <StatsCard title="Applications" count={stats.totalApplications || 0} trend={stats?.weeklyChange ? `↑ ${stats.weeklyChange} this week` : 'No data'} />
          <StatsCard title="Interviews" count={stats?.totalInterviews} trend={stats?.weeklyChange ? `↑ ${stats.weeklyChange} this week` : 'No data'} />
        </>
      )}
    </StatsGrid>
  </DashboardContainer>
  );
};


export default function Home() {
  return <Dashboard />;
}