import styled from 'styled-components';
import StatsCard from '../components/StatsCard';;	
const Dashboard = () => (
  
  <Container>
  
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
  </Container>
);

// Styled Components
const Container = styled.div`
  padding: 2rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
`;

export default function Home() {
  return <Dashboard />;
}