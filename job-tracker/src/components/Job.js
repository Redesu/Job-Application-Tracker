import styled from 'styled-components';

export const JobList = styled.div`
display: grid;
gap: 1rem;
`;

export const JobCard = styled.div`
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  gap: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  justify-content: space-between;
  align-items: center;
  `;

