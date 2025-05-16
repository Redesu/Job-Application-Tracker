import styled from "styled-components";

const Button = styled.button`
  background: #2563eb;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  transition: background 0.2s;

  &:hover {
    background: #1d4ed8;
  }
`;

export default Button