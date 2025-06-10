import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { fetchPublicStats, fetchStats } from '@/lib/api';
import StatsCard from '@/components/StatsCard';
import StatsGrid from '@/components/StatsGrid';
import DashboardContainer from '@/components/DashboardContainer';
import AuthGuard from '@/components/AuthGuard';

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

if(error){
  return null;
}

  return (
  <DashboardContainer>

    <StatsGrid>
      {status === "loading" && <p>Loading...</p>}
      {status == "unauthenticated" && publicStats && (
        <StatsGrid>
          <StatsCard title="Total users" count={publicStats.totalUsers} trend={publicStats?.weeklyUsersChange ? `↑ ${publicStats.weeklyUsersChange} this week` : 'No data'}/>
          <StatsCard title="Total Interviews" count={publicStats.totalApplications} trend={publicStats?.weeklyInterviewsChange ? `↑ ${publicStats.weeklyInterviewsChange} this week` : 'No data'}/>
        </StatsGrid>
      )}
      {status === "authenticated" && (
        <>
        <AuthGuard>
          <StatsCard title="Applications" count={stats.totalApplications || 0} trend={stats?.weeklyApplications ? `↑ ${stats.weeklyApplications} this week` : 'No data'} />
          <StatsCard title="Interviews" count={stats?.totalInterviews} trend={stats?.weeklyInterviews ? `↑ ${stats.weeklyInterviews} this week` : 'No data'} />
        </AuthGuard>
        </>
      )}
    </StatsGrid>
  </DashboardContainer>
  );
};


export default function Home() {
  return <Dashboard />;
}