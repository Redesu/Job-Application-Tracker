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
  const [isBackendDown, setIsBackendDown] = useState(false);

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
        setIsBackendDown(false);
      } catch (err) {

        if (err.details === 'Network error' || err.message === 'Unable to connect to the server. Please try again later.') {
          setIsBackendDown(true);
        }

      }
    }
    getStats();
  }, [status]);

  if (isBackendDown) {
    return (
      <DashboardContainer>
        <div className="p-4 bg-red-100 border-l-4 border-red-500 text-red-700 width-500">
          <p className="font-bold">Service Temporarily Unavailable</p>
          <p>We're having trouble connecting to our servers. Please try again later.</p>
        </div>
      </DashboardContainer>
    );
  }

  return (
    <DashboardContainer>

      <StatsGrid>

        {status === "loading" && <p>Loading...</p>}
        {status == "unauthenticated" && publicStats && (
          <>
            <StatsCard title="Total users" count={publicStats.totalUsers} trend={publicStats?.weeklyUsersChange ? `↑ ${publicStats.weeklyUsersChange} this week` : 'No data'} />
            <StatsCard title="Total Interviews" count={publicStats.totalApplications} trend={publicStats?.weeklyInterviewsChange ? `↑ ${publicStats.weeklyInterviewsChange} this week` : 'No data'} />
          </>
        )}
        {status === "authenticated" && (
          <AuthGuard>
            <StatsCard title="Applications" count={stats.totalApplications || 0} trend={stats?.weeklyApplications ? `↑ ${stats.weeklyApplications} this week` : 'No data'} />
            <StatsCard title="Interviews" count={stats?.totalInterviews} trend={stats?.weeklyInterviews ? `↑ ${stats.weeklyInterviews} this week` : 'No data'} />
          </AuthGuard>
        )}
      </StatsGrid>
    </DashboardContainer>
  );
};


export default function Home() {
  return <Dashboard />;
}