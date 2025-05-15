import styled from 'styled-components';

const Card = styled.div`
background: white;
border-radius: 8px;
padding: 1.5rem;
box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
`;

const Title = styled.h3`
font-size: 1 rem;
margin: 0;
margin-bottom: 0.5rem;
color: #999;
`;

export default function StatsCard({ title, count, trend }) {
    return (
        <Card>
            <Title>{title}</Title>
            <div style={{fontSize: '2rem', marginBottom: '0.5rem', fontWeight: 'bold'}}><h2>{count}</h2></div>
            <div style={{color: trend.startsWith('↑') ? 'green' : 'red'}}><p>{trend}</p></div>
        </Card>
    );
}