import styled from 'styled-components';
import { useEffect, useState } from 'react';

const Card = styled.div`
background: white;
border-radius: 8px;
padding: 1.5rem;
box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);

@media (max-width: 600px) {
    padding: 1rem;
    margin-bottom: 1rem;
}
`;



const Title = styled.h3`
font-size: 1rem;
margin: 0;
margin-bottom: 0.5rem;
color: #999;

@media (max-width: 600px) {
    font-size: 0.875rem;
}
`;

export default function StatsCard({ title, count, trend }) {
    const [displayedCount, setDisplayedCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const end = Number(count) || 0;
        if (start === end) return;

        const duration = 1000;
        const increment = end / (duration / 16);
        let current = start;

        const step = () => {
            current += increment;
            if (current < end) {
                setDisplayedCount(Math.floor(current));
                requestAnimationFrame(step);
            } else {
                setDisplayedCount(end);
            }
        };

        step();

        return () => setDisplayedCount(0);
    }, [count]);

    return (
        <Card>
            <Title>{title}</Title>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                <h2>{displayedCount}</h2>
            </div>
            <div style={{ color: trend && trend.startsWith('↑') ? 'green' : 'red' }}>
                <p>{trend}</p>
            </div>
        </Card>
    );
}